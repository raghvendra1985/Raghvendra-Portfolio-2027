import { emailFrom, publicSiteUrl, resendApiKey } from "@/lib/commerce/config";
import { firstNameFrom } from "@/lib/commerce/normalize";
import { formatInr } from "@/products";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

type Mail = {
  to: string;
  subject: string;
  html: string;
};

async function sendMail(mail: Mail) {
  const key = resendApiKey();
  if (!key) {
    if (process.env.NODE_ENV === "development") {
      console.info("[email skipped]", mail.subject, mail.to);
    }
    return { id: null as string | null, skipped: true };
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: emailFrom(),
      to: [mail.to],
      subject: mail.subject,
      html: mail.html,
    }),
  });
  const payload = (await response.json()) as { id?: string; message?: string };
  if (!response.ok) {
    throw new Error(payload.message ?? "Resend failed");
  }
  return { id: payload.id ?? null, skipped: false };
}

function layout(title: string, body: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#EBEDE3;color:#0B1849;font-family:Georgia,serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EBEDE3;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#EBEDE3;max-width:560px;">
            <tr><td style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.16em;color:#0B1849;padding-bottom:16px;">RAGHVENDRA SINGH</td></tr>
            <tr><td style="height:4px;background:#E4B028;"></td></tr>
            <tr><td style="padding-top:28px;font-size:28px;line-height:1.2;">${title}</td></tr>
            <tr><td style="padding-top:20px;font-size:16px;line-height:1.6;color:#3a4a6a;">${body}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function button(href: string, label: string) {
  return `<p style="margin:28px 0 0;"><a href="${href}" style="display:inline-block;background:#0B1849;color:#EBEDE3;text-decoration:none;padding:14px 20px;font-family:ui-monospace,monospace;font-size:12px;letter-spacing:0.08em;">${label}</a></p>`;
}

export function purchaseConfirmedMarkup(input: {
  name: string | null;
  productName: string;
  amount: number;
  orderId: string;
  accessHref: string;
  download: boolean;
}) {
  const first = escapeHtml(firstNameFrom(input.name));
  const library = `${publicSiteUrl()}/account/library`;
  const action = input.download ? "Download Product" : "Open Product";
  const productName = escapeHtml(input.productName);
  const body = `
    <p>Hi ${first},</p>
    <p>Thanks for purchasing ${productName}. Your access is ready.</p>
    ${button(input.accessHref, action)}
    <p>You can always find your purchases here:</p>
    ${button(library, "My Library")}
    <p style="font-family:ui-monospace,monospace;font-size:12px;margin-top:28px;">
      Order: ${escapeHtml(input.orderId)}<br/>
      Product: ${productName}<br/>
      Amount: ${formatInr(input.amount)}
    </p>
    <p>Raghvendra Singh</p>
  `;
  return layout(`${productName} is ready`, body);
}

export function refundMarkup(input: { name: string | null; productName: string; orderId: string }) {
  const first = firstNameFrom(input.name);
  const body = `
    <p>Hi ${first},</p>
    <p>Your payment for ${input.productName} has been refunded. Access to the product has been withdrawn.</p>
    <p>Order: ${input.orderId}</p>
    <p>Raghvendra Singh</p>
  `;
  return layout("Refund processed", body);
}

export async function sendPurchaseEmail(input: {
  to: string;
  name: string | null;
  productName: string;
  amount: number;
  orderId: string;
  accessHref: string;
  download: boolean;
}) {
  return sendMail({
    to: input.to,
    subject: `Your ${input.productName} is ready`,
    html: purchaseConfirmedMarkup(input),
  });
}

export async function sendRefundEmail(input: {
  to: string;
  name: string | null;
  productName: string;
  orderId: string;
}) {
  return sendMail({
    to: input.to,
    subject: `Refund for ${input.productName}`,
    html: refundMarkup(input),
  });
}

export async function sendAccessEmail(input: {
  to: string;
  name: string | null;
  productName: string;
  accessHref: string;
  download: boolean;
}) {
  const library = `${publicSiteUrl()}/account/library`;
  const first = firstNameFrom(input.name);
  const action = input.download ? "Download Product" : "Open Product";
  return sendMail({
    to: input.to,
    subject: `Your ${input.productName} access`,
    html: layout(
      `${input.productName} access`,
      `<p>Hi ${first},</p><p>Here is your access again.</p>${button(input.accessHref, action)}${button(library, "My Library")}<p>Raghvendra Singh</p>`,
    ),
  });
}
