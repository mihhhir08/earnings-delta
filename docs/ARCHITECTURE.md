# Architecture

## Application shape

Earnings Delta is one Next.js App Router application. Server components load company analysis through a provider, client components handle comparison controls, evidence inspection, and grounded questions, and Route Handlers expose a small validated API. There is no separate backend or database.

```text
Browser
  ├─ /                         Landing page
  └─ /research/[ticker]        Research workspace
       └─ /api/research/[ticker]  Validated company analysis + grounded Q&A
                ↓
        FinancialDataProvider
                ↓
        MockFinancialDataProvider
                ↓
     deterministic analysis pipeline
```

## Frontend and server structure

- `app/` owns routes, layouts, loading/error states, and API handlers.
- `components/` owns the research workspace and interactive evidence/Q&A UI.
- `lib/finance/` owns calculations, formatting inputs, materiality, and insight generation.
- `lib/data/` contains typed representative demo companies and periods.
- `lib/providers/` defines the provider contract and mock implementation.
- `lib/schemas/` validates API inputs and optional structured AI output.

## Data flow

1. A route validates the ticker and comparison mode.
2. The provider returns the company, ordered periods, statements, KPIs, segments, filings, transcripts, and prices.
3. The analysis pipeline selects current, prior-quarter, and prior-year periods; normalizes missing values; calculates changes; scores materiality; and ranks observations.
4. Evidence IDs are attached during deterministic insight creation, not retrofitted in the UI.
5. The client receives a serializable analysis object and filters views without recomputing business logic.

## Material change pipeline

Materiality is deliberately explainable: normalized magnitude (0–60), company relevance (0–25), and corroborating evidence (0–15), capped at 100. Segment contribution and divergence observations use the same scale. Importance bands are High (75+), Medium (45–74), and Monitor (below 45).

## AI pipeline

The no-key path maps common questions to deterministic analysis and returns cited evidence. The provider boundary allows an optional LLM implementation later: assemble only active-company context, request structured JSON, validate with Zod, reject unknown evidence IDs, and label unsupported causal language as interpretation. Arbitrary model text is never rendered directly.

## Provider abstraction

`FinancialDataProvider` describes the actual domain operations needed by the product. `MockFinancialDataProvider` is the only implementation in the public demo. A Fiscal.ai implementation is intentionally omitted until official, accessible documentation and credentials are available; this avoids inventing endpoints or response shapes.

## Deployment model and decisions

- One repository and one Vercel project keep deployment reviewable.
- Static mock data makes the public demo deterministic and secret-free.
- Route Handlers provide a real server boundary without a second service.
- Native CSS and focused React state replace a UI framework; Zod and Vitest remain because boundary validation and financial correctness materially benefit from them.
- No chart dependency: the core comparison is clearer as aligned values, delta rails, and evidence-linked observations.
