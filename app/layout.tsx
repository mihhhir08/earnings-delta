import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://earnings-delta.vercel.app"),
  title: {
    default: "Earnings Delta | Evidence-first financial research",
    template: "%s | Earnings Delta",
  },
  description: "Compare reporting periods, detect material financial changes, and verify every conclusion against its evidence.",
  openGraph: {
    title: "Earnings Delta | Evidence-first financial research",
    description: "Compare reporting periods, detect material financial changes, and verify every conclusion against its evidence.",
    url: "/",
    siteName: "Earnings Delta",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earnings Delta | Evidence-first financial research",
    description: "Compare reporting periods, detect material financial changes, and verify every conclusion against its evidence.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={displayFont.variable}>{children}</body>
    </html>
  );
}
