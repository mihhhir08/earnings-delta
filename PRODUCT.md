# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary user is an investor or analyst reviewing a newly reported quarter. They need to understand what materially changed, test an early thesis, and reach their own judgment without losing the connection between a conclusion and its source data.

## Product Purpose

Earnings Delta reduces the mechanical work between a reported quarter and an informed human judgment. It compares periods, surfaces financially meaningful changes, and lets the user inspect or challenge every conclusion.

Success means a user can identify the important movements, understand what supports or contradicts a thesis, and verify the underlying calculation without treating the product as investment advice.

## Positioning

Earnings Delta is an evidence-first research workspace, not a stock picker or generic filing summarizer. Its distinctive mechanism separates materiality from confidence and exposes the research path: structured calculations establish what changed, representative commentary supplies bounded context, and a thesis stress test searches for both supporting and contradictory evidence before returning a verdict.

## Operating Context

Users select a supported company, choose a quarter-over-quarter or year-over-year comparison, inspect ranked findings and trends, open calculation evidence, ask bounded questions, and run a thesis stress test against the active comparison.

## Capabilities and Constraints

- Supports NVDA, AAPL, and MSFT with five representative reporting periods per company.
- Calculates period changes, ranks material observations, and preserves calculation evidence.
- Uses `Verified`, `Supported`, and `Interpretation` as distinct confidence labels.
- Uses a visible multi-step research workflow to plan checks, inspect evidence, challenge a thesis, and synthesize a bounded verdict.
- Does not provide trading instructions, price targets, portfolio management, or investment advice.
- Does not present representative commentary as verbatim company disclosure.
- Does not currently use live filings, live market data, persistent accounts, or an external model API.

## Brand Commitments

Preserve the name Earnings Delta, the concise evidence-led voice, the delta symbol, and the existing dark analytical workspace. Avoid hype, anthropomorphism, decorative stock imagery, and claims of predictive ability.

## Evidence on Hand

- Product requirements: `docs/PRD.md`
- Architecture and data boundaries: `docs/ARCHITECTURE.md`
- Typed representative company records: `lib/data/companies.ts`
- Deterministic financial calculations: `lib/finance/analysis.ts`
- Existing evidence and comparison interfaces: `components/research-workspace.tsx` and `components/evidence-panel.tsx`

No customer testimonials, performance benchmarks, live-data claims, or investment outcomes are available and none should be fabricated.

## Product Principles

1. Show the calculation before asking for trust.
2. Search for disconfirming evidence, not only supporting evidence.
3. Keep facts, contextual support, and interpretation visibly separate.
4. Reduce research friction without replacing human judgment.
5. Prefer a bounded honest answer to an impressive unsupported one.

## Thesis Stress-Test Build Direction

- **Thesis:** Make the plan → calculate → contradict → synthesize loop visible; refuse the generic chatbot card.
- **Own-world:** Inherit the spectral ledger, violet action, hairline evidence structure, and tabular measurements.
- **Story:** State a thesis, observe real server stages, compare opposing evidence, and reach a bounded verdict.
- **First viewport:** Place one continuous research instrument immediately after the lead finding.
- **Form:** Operate-mode local extension; the signature interaction is the streamed five-stage research path.
- **Finish:** Unreviewed and undocumented is unfinished; the build ends with finish review, verification, and `DESIGN.md`.

## Accessibility & Inclusion

Core workflows must remain keyboard accessible, readable on mobile and desktop, respectful of reduced-motion preferences, and understandable without relying on color alone.
