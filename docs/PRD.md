# Earnings Delta — Product Requirements

## Thesis and user

Earnings Delta helps public-markets investors understand what materially changed between company reporting periods, why it changed, and which evidence supports each conclusion. The primary user is an investor or analyst doing a first pass on a newly reported quarter.

## Problem

Statements show what happened, but extracting the important deltas, connecting related figures, and validating management explanations is slow. Generic dashboards optimize for monitoring; they do not create an evidence-backed change narrative.

## Primary use case and flow

1. Open a company at its latest reported quarter.
2. Compare it with the previous quarter or prior-year quarter.
3. Scan the financial snapshot and ranked material changes.
4. Open an insight to inspect calculations and source excerpts.
5. Ask a grounded follow-up question about the active company and period.

## MVP requirements

- Routes for a concise landing page and company research workspace.
- Representative multi-period demo data for NVDA, AAPL, and MSFT.
- Deterministic QoQ/YoY/absolute/margin, acceleration, cash-flow, and segment analysis.
- Three to six ranked insights with importance, confidence, metrics, and evidence.
- Evidence drawer separating structured facts, commentary, and interpretation.
- Grounded Ask the Delta responses that remain useful without an LLM key.
- Loading, unsupported ticker, missing data/evidence, provider failure, no-key, and unexpected-error states.

## Functional requirements

- Default to the latest period and allow previous-quarter or prior-year comparison.
- Format currency, ratios, margins, negative values, and missing values correctly.
- Do not infer movement quality from sign alone; label the financial context.
- Use `Verified`, `Supported`, and `AI interpretation` as distinct confidence states.
- Every numerical answer must resolve to structured data; every quote must resolve to stored source text.

## Non-functional requirements

- Next.js App Router, strict TypeScript, minimal dependencies, and one Vercel deployment.
- Core demo works without environment variables, persistent storage, or paid infrastructure.
- Responsive, keyboard accessible, fast, and production-build clean.
- Deterministic financial logic covered by focused Vitest tests.

## Data and AI strategy

The MVP uses typed, clearly labeled representative demo data behind a `FinancialDataProvider`. Deterministic analysis produces the numerical claims and baseline summaries. An optional LLM provider may rephrase or answer broader questions only from compact, supplied context; output is schema-validated and unsupported claims are rejected or labeled as interpretation.

## Evidence rules

- Structured values may be `Verified`.
- A claim tied to a stored filing or transcript excerpt may be `Supported`.
- A causal inference without direct source support is `AI interpretation`.
- Missing support produces an explicit insufficiency response, never a fabricated explanation.

## Success criteria

- A first-time reviewer understands the product and reaches the demo in seconds.
- The research page communicates the quarter's most material changes within 20 seconds.
- Every insight can be traced to calculations and/or stored source excerpts.
- The app deploys and remains fully functional with no secrets configured.

## Out of scope

Authentication, portfolios, watchlists, alerts, trading, broker connections, news, social features, payments, subscriptions, analytics infrastructure, admin tools, complex databases, and native mobile apps.
