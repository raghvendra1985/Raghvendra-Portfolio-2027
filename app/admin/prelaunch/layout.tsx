import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pre-Launch Control Room",
  robots: { index: false, follow: false },
};

export default function PrelaunchLayout({ children }: { children: ReactNode }) {
  return children;
}
