import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const displayFont = localFont({
  src: [
    { path: "../public/fonts/barlow-400.woff2", weight: "400" },
    { path: "../public/fonts/barlow-600.woff2", weight: "600" },
    { path: "../public/fonts/barlow-700.woff2", weight: "700" },
    { path: "../public/fonts/barlow-800.woff2", weight: "800" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Earnings Delta | Evidence-first financial research",
  description: "Compare reporting periods, detect material financial changes, and verify every conclusion against its evidence.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={displayFont.variable}>{children}</body>
    </html>
  );
}
