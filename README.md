# Earnings Delta

**See what changed, understand why, and verify the evidence.**

> Product screenshot placeholder — add the deployed research workspace screenshot here.

## Problem

Company filings and earnings calls contain the answer to what changed, but connecting the important figures to the explanation is slow. Most market dashboards show values; they do not rank material changes or expose the evidence behind a conclusion.

## Solution

Earnings Delta compares reporting periods, calculates financial deltas deterministically, ranks material observations, and lets an investor trace every conclusion to structured numbers or stored management commentary.

## Core features

- Multi-period research for NVDA, AAPL, and MSFT using representative demo data
- Previous-quarter and prior-year comparisons
- Financial snapshot with context-aware movement labels
- Ranked “What changed” ledger with explicit confidence classes
- Evidence drawer for calculations, filings, transcripts, and interpretation
- Grounded “Ask the Delta” research input with a useful no-key fallback

## Architecture

The project is a single Next.js App Router application. Route Handlers and server-side finance modules perform validation and analysis. A small `FinancialDataProvider` contract isolates the typed demo dataset and leaves a clean seam for a future verified Fiscal.ai integration. See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Tech stack

Next.js, React, strict TypeScript, Tailwind CSS, Zod, and Vitest. It deploys as one Vercel project with no database or paid service.

## How material change detection works

The engine normalizes each period, computes absolute, percentage, percentage-point, growth-acceleration, cash-flow-divergence, and segment-contribution deltas, then scores observations from 0–100 using magnitude (60 points), relevance (25), and corroborating evidence (15). This keeps the ranking deterministic and explainable; AI is not asked to discover the numbers.

## How evidence grounding works

Numerical claims come only from typed financial data. Quotes come only from stored demo filing or transcript excerpts. Evidence IDs are attached while insights are created and are revalidated before display. Claims are labeled `Verified`, `Supported`, or `AI interpretation`; insufficient evidence produces an explicit limitation.

## Data source strategy

The public build uses clearly labeled representative data so the complete workflow works without secrets or paid APIs. A provider interface covers company metadata, periods, statements, KPIs, segments, filings, transcripts, and prices. A real Fiscal.ai adapter is intentionally deferred until official access and response documentation are available.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The demo works with no environment variables.

## Environment variables

Copy `.env.example` to `.env.local` only if adding an optional LLM provider. No variable is required for the default application.

## Deploy to Vercel

Import the GitHub repository into Vercel, keep the detected Next.js settings, and deploy. No build override, database, or persistent filesystem is required.

## Testing

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Known limitations

- Financial values and excerpts are representative demo content, not live or audited data.
- The public build does not include a live Fiscal.ai adapter.
- No-key Q&A answers the supported research intents deterministically rather than acting as an open-ended chatbot.

## Future improvements

- Add a documented Fiscal.ai provider when official access is available.
- Add a schema-validated LLM provider for more flexible grounded questions.
- Expand issuer-specific KPI and segment models while preserving deterministic calculations.

### Why I Built This

I wanted to explore how financial data, earnings reports, transcripts, and AI could be combined into a workflow that helps investors understand not only the numbers themselves, but what materially changed between reporting periods and why.
