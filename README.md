# Earnings Delta

**See what changed. Verify why.**

[Open Earnings Delta](https://earnings-delta.vercel.app/)

Earnings Delta is an evidence-first financial research workspace. It compares reporting periods, identifies financially meaningful changes, and keeps each conclusion connected to its calculation and representative commentary.

## Current functionality

- Research workspaces for NVDA, AAPL, and MSFT
- Quarter-over-quarter and year-over-year comparisons
- Six-metric financial snapshot with context-aware movement labels
- Five-period revenue, gross-margin, and free-cash-flow trends
- Material changes ranked by financial magnitude and company relevance
- Separate confidence labels: `Verified`, `Supported`, and `Interpretation`
- Evidence panel with calculations, representative commentary, and interpretation boundaries
- Thesis stress tests that plan checks, run comparisons, seek contradictory evidence, and return a bounded verdict
- Deterministic answers for supported questions about the active company and comparison

## Data and research model

The application uses a typed representative dataset containing five reporting periods for each company. Financial statements and segment values drive every calculation. The stored filing and transcript commentary is representative and is not presented as verbatim company disclosure.

Materiality and confidence answer different questions:

- **Materiality** reflects the magnitude of a financial movement and its relevance to the company. Internally, magnitude contributes up to 75 points and relevance up to 25 points; evidence availability does not affect this score.
- **Confidence** describes the support behind a finding. `Verified` is calculated from structured values, `Supported` adds matching representative commentary, and `Interpretation` identifies a calculated pattern whose cause is not established.

The thesis stress test maps a claim to relevant financial checks, evaluates both supporting and contradictory signals, and exposes the complete research path. The question interface uses deterministic intent matching for revenue, gross margin, operating income, net income, diluted EPS, segment revenue movement, operating income relative to revenue growth, and free-cash-flow divergence. Unsupported claims and questions return clear scope limitations.

## Architecture

Earnings Delta is a single Next.js App Router application. Server components obtain company records through a `FinancialDataProvider`; deterministic finance modules compute comparisons and findings; client components manage comparison controls, evidence inspection, thesis stress tests, and questions. Zod-validated route handlers serve research runs and question responses. There is no database or separate backend service.

See [Architecture](docs/ARCHITECTURE.md) and [Product requirements](docs/PRD.md).

## Technology

Next.js, React, TypeScript, Three.js with React Three Fiber, Zod, Vitest, CSS, and Vercel.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The current application does not require environment variables.

## Verification

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Current limitations

- Financial values and commentary come from a representative dataset rather than a live data feed.
- Coverage is limited to NVDA, AAPL, and MSFT, with five periods per company.
- The question interface supports a defined set of financial-change topics rather than open-ended research.

## Future extensions

- Integrate verified Fiscal.ai data for broader, current company coverage.
- Add a grounded LLM for broader questions, constrained to cited financial context and validated output.
- Expand company coverage, history, and issuer-specific operating metrics.

## Third-party software

The landing-page Beams background is adapted from React Bits. See [Third-Party Notices](THIRD_PARTY_NOTICES.md) for attribution and license terms.
