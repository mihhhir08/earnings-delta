# Architecture

## Application shape

Earnings Delta is a single Next.js App Router application with no database or separate backend service.

```text
Browser
  ├─ /                         Landing page
  └─ /research/[ticker]        Research workspace
       ├─ /api/research        Validated thesis stress-test route
       └─ /api/ask             Validated deterministic question route
                ↓
        FinancialDataProvider
                ↓
 RepresentativeFinancialDataProvider
                ↓
       Deterministic analysis
```

## Code boundaries

- `app/` owns routes, metadata, loading/error states, and the question route handler.
- `components/` owns the landing experience, workspace controls, trends, findings, evidence panel, and question interface.
- `lib/data/` contains typed representative company records.
- `lib/providers/` defines the data-provider contract and in-memory representative implementation.
- `lib/finance/` owns changes, formatting, materiality, confidence assignment, and finding generation.
- `lib/research/` maps supported questions to the active deterministic analysis.
- `lib/research/stress-test.ts` scopes a thesis, schedules checks, seeks counter-evidence, and synthesizes a bounded verdict.
- `lib/schemas.ts` validates research and question requests and responses with Zod.

## Data flow

1. The route validates the ticker and loads the corresponding company record through `FinancialDataProvider`.
2. The provider returns ordered periods with financial metrics, segment values, and representative filing/transcript commentary.
3. The analysis selects the latest, prior-quarter, and prior-year periods and calculates financial changes.
4. Finding generation computes materiality, assigns confidence, and attaches calculation or commentary evidence.
5. The client switches between quarter-over-quarter and year-over-year analysis already calculated on the server.
6. `/api/research` validates a thesis and runs the deterministic scope, plan, calculation, contradiction, and synthesis loop.
7. `/api/ask` validates a question, resolves it against supported metrics or findings, and returns a validated response.

## Thesis stress test

`lib/research/stress-test.ts` recognizes supported financial themes, selects comparison checks from the active record, classifies each result as supporting, challenging, or contextual, and returns a verdict with the complete research path. It does not expose hidden model reasoning or call an external model. Every displayed signal is derived from the same typed financial analysis used by the workspace.

## Materiality and confidence

Materiality is based only on financial magnitude and company relevance. Magnitude contributes up to 75 points and relevance up to 25 points, capped at 100. The internal score maps to `High`, `Medium`, or `Monitor` importance bands; the raw number is not displayed in the primary interface.

Confidence is independent of materiality:

- `Verified` uses structured calculations.
- `Supported` adds representative commentary that names the relevant subject.
- `Interpretation` marks a calculated relationship whose cause is not established.

Evidence availability can change confidence, but it cannot increase materiality.

## Question resolution

`lib/research/answer.ts` uses deterministic term matching to select a supported metric or finding from the active comparison. Responses include calculation evidence, representative commentary when applicable, and a scope-limitation response for unsupported questions.

## Trends

The research workspace renders an authored SVG trend view for revenue, gross margin, and free cash flow across all five representative periods. No charting dependency is used.

## Deployment

The application deploys as one Vercel project. The representative dataset is bundled with the application, and no environment variables or persistent storage are required.

## Future extensions

- A verified Fiscal.ai implementation can satisfy the existing `FinancialDataProvider` contract.
- A grounded LLM can be added as a separate research implementation for broader questions, with constrained context, evidence references, and schema-validated output.
