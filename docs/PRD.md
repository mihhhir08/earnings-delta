# Earnings Delta — Product Requirements

## Product thesis

Earnings Delta helps investors understand what materially changed between company reporting periods and inspect the evidence behind each conclusion. The primary user is an investor or analyst conducting an initial review of a reported quarter.

## Current user flow

1. Select NVDA, AAPL, or MSFT.
2. Compare the latest record with the prior quarter or prior-year quarter.
3. Review the six-metric snapshot and five-period trend.
4. Scan changes ranked by financial magnitude and company relevance.
5. Open a finding to inspect its calculation, representative commentary, and confidence.
6. Ask a supported question about the active company and comparison.

## Current requirements

- Provide a concise landing page and a responsive company research workspace.
- Include five representative reporting periods for each supported company.
- Calculate quarter-over-quarter, year-over-year, absolute, percentage, percentage-point, segment-contribution, operating-income/revenue growth-gap, and free-cash-flow divergence changes.
- Rank up to five findings using materiality derived only from financial magnitude and company relevance.
- Present confidence separately as `Verified`, `Supported`, or `Interpretation`.
- Keep every numerical finding connected to structured calculations.
- Clearly label stored commentary as representative rather than verbatim company disclosure.
- Answer supported questions deterministically from the active company and comparison.
- Return an explicit insufficiency response when the selected record cannot answer reliably.
- Provide loading, unsupported-company, unavailable-comparison, request-validation, and retry states.

## Financial language rules

- Describe segment contribution as leading the revenue movement unless the evidence establishes causation.
- Compare operating income growth directly with revenue growth.
- Describe differences between free-cash-flow and revenue growth as divergence.
- Do not use evidence availability as an input to materiality.

## Evidence and confidence rules

- `Verified`: a claim calculated from structured financial values.
- `Supported`: a calculated claim with representative commentary that names the same subject.
- `Interpretation`: a calculated relationship whose cause is not established by the available record.
- Representative commentary may provide context but is not presented as a quotation or verbatim disclosure.

## Quality requirements

- Strict TypeScript and validated request/response boundaries.
- Responsive behavior across mobile, tablet, and desktop widths.
- Keyboard-accessible controls and evidence panel behavior.
- Deterministic finance logic covered by focused tests.
- Clean test, typecheck, lint, and production-build results.

## Current scope limits

Authentication, portfolios, alerts, trading, broker connections, live financial feeds, open-ended questions, and persistent user data are outside the current implementation.

## Future extensions

- A verified Fiscal.ai provider may replace the representative in-memory provider.
- A grounded LLM may broaden question coverage using constrained context, evidence references, and schema-validated responses.
- Company coverage and issuer-specific operating metrics may expand.
