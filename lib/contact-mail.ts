import nodemailer from "nodemailer";
import {
  emailFrom,
  isAuthenticatedFromAddress,
  smtpConfigured,
  smtpHost,
  smtpPass,
  smtpPort,
  smtpUser,
} from "@/lib/commerce/config";

type Mail = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

/** Workspace SMTP AUTH for Contact only. Commerce mail stays on Resend. */
export async function sendContactMail(mail: Mail) {
  if (!smtpConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.info("[email skipped]", mail.subject, mail.to);
    }
    return { id: null as string | null, skipped: true };
  }

  const from = emailFrom();
  if (!isAuthenticatedFromAddress(from)) {
    console.error("[mail] from mailbox is not the approved sender");
    throw new Error("send-failed");
  }

  const port = smtpPort();
  let transporter: ReturnType<typeof nodemailer.createTransport> | undefined;
  try {
    transporter = nodemailer.createTransport({
      host: smtpHost(),
      port,
      secure: port === 465,
      auth: {
        user: smtpUser(),
        pass: smtpPass(),
      },
    });
    const info = await transporter.sendMail({
      from,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      html: mail.html,
    });
    const id = info.messageId?.trim() || "";
    if (!id) {
      console.error("[mail] provider rejected", "smtp-no-id");
      throw new Error("send-failed");
    }
    return { id, skipped: false as const };
  } catch (error) {
    if (error instanceof Error && error.message === "send-failed") throw error;
    const smtp =
      error && typeof error === "object"
        ? (error as { code?: unknown; responseCode?: unknown; command?: unknown })
        : {};
    const code = typeof smtp.code === "string" && smtp.code ? smtp.code : "smtp";
    const responseCode =
      typeof smtp.responseCode === "number" ? smtp.responseCode : undefined;
    const command = typeof smtp.command === "string" ? smtp.command : undefined;
    console.error("[mail] provider rejected", { code, responseCode, command });
    throw new Error("send-failed");
  } finally {
    transporter?.close();
  }
}
