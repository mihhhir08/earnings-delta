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
  title: "Earnings Delta — Evidence-first financial research",
  description: "Compare reporting periods, detect material financial changes, and verify every conclusion against its evidence.",
};

const directionContract = `<!--
THESIS: Material financial changes are handled as an evidence chain, refusing the generic stock-dashboard grid.
OWN-WORLD: Cool paper, graphite ink, cobalt actions, signal-yellow evidence markers, ruled ledgers, squared controls, and dense tabular values.
STORY: Select a company, identify the ranked delta, inspect its calculation and source, then ask a grounded follow-up.
FIRST VIEWPORT: A compact command header leads into the issuer record, a six-column metric ledger, and a two-pane change/evidence workspace with the question bar visible.
FORM: Chain-of-custody research ledger, third grounded direction, seed 473408b1.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={displayFont.variable}>
        <div className="direction-contract" aria-hidden="true" dangerouslySetInnerHTML={{ __html: directionContract }} />
        {children}
      </body>
    </html>
  );
}
