# Earnings Delta

**The quarter changed. Find out where.**

[Open the live demo](https://earnings-delta.vercel.app/)

## Problem

Financial filings and earnings calls contain the explanation behind company performance, but connecting the numbers to material changes and their causes takes time. Most financial dashboards display values. Earnings Delta focuses on identifying what materially changed and exposing the evidence behind each conclusion.

## Solution

Earnings Delta compares reporting periods, calculates financial changes deterministically, ranks material observations, and connects conclusions to structured evidence and representative management commentary. Follow-up questions stay grounded in the company and comparison already in view.

## Core Features

- Research demos for NVDA, AAPL, and MSFT
- Interactive product walkthrough using the same calculated research output as the workspace
- Quarter-over-quarter and year-over-year comparisons
- Financial snapshot with context-aware movement labels
- Five-period financial trajectory for revenue, gross margin, and free cash flow
- Deterministic material change detection and ranking
- `Verified`, `Supported`, and `AI Interpretation` confidence states
- Evidence drawer linking calculations and commentary to each insight
- Grounded follow-up research with a deterministic fallback

## Architecture

Earnings Delta is one Next.js App Router application deployed through Vercel. Strict TypeScript, server-side finance modules, and Zod validation keep calculations and API boundaries explicit. A `FinancialDataProvider` abstraction isolates the current mock provider and provides a clean path to a verified Fiscal.ai provider. See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Tech Stack

Next.js, React, TypeScript, Tailwind CSS, Three.js with React Three Fiber, Zod, Vitest, and Vercel.

## Material Change Detection

Calculations happen before any AI interpretation. The engine normalizes reporting periods, computes absolute, percentage, percentage-point, cash-flow-divergence, and segment-contribution changes, then ranks observations with an explainable 0 to 100 materiality score:

- Magnitude: up to 60 points
- Company relevance: up to 25 points
- Corroborating evidence: 15 points

## Evidence Grounding

Numerical claims originate from structured financial data, and evidence references are attached while insights are created. Confidence states distinguish directly calculated facts (`Verified`), claims supported by stored commentary (`Supported`), and reasonable but unproven inferences (`AI Interpretation`). Insufficient evidence produces an explicit limitation.

The public demo uses representative filing commentary, representative transcript commentary, and demo evidence snippets to demonstrate the evidence workflow. They are not presented as verbatim excerpts from company source documents.

## Data Source Strategy

The public demo uses representative financial data so the complete workflow runs without paid APIs or secrets. The provider architecture is designed so a verified Fiscal.ai integration can replace the mock provider without changing the analysis or interface layers.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are required for the default demo. `.env.example` documents the optional key reserved for a future LLM provider.

## Deployment

The production application is deployed at [earnings-delta.vercel.app](https://earnings-delta.vercel.app/). A fork can be deployed by importing the repository into Vercel with the default Next.js settings. No database or persistent filesystem is required.

## Testing

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Known Limitations

- Representative demo data rather than live financial data
- No live Fiscal.ai adapter
- Deterministic research fallback when an LLM provider is unavailable

## Future Improvements

- Add a verified Fiscal.ai provider
- Add a schema-validated, grounded LLM provider
- Expand company coverage and issuer-specific KPIs

## Why I Built This

I built Earnings Delta after interviewing for a Full Stack Developer role at Fiscal.ai. The conversation made me think more deeply about how structured financial data, earnings reports, transcripts, and AI could work together in an evidence-first research workflow. I wanted to explore that idea by building it rather than only discussing it.

The goal was to understand how financial data could become a workflow that helps investors identify what materially changed between reporting periods, understand why it matters, and verify the evidence behind the conclusion.
