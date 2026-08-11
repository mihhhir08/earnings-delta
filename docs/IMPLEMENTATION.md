# Implementation Plan

## Phase 1 — Product and architecture

- **Objective:** Fix the product contract, scope, data policy, and deployment model before code.
- **Files:** `PRODUCT.md`, `docs/*.md`, `README.md`
- **Outcome:** A concise, reviewable plan with explicit evidence and AI rules.
- **Verification:** Confirm every requested PRD/architecture/README section is present and no out-of-scope infrastructure is proposed.

## Phase 2 — Foundation and domain data

- **Objective:** Create the strict Next.js project and typed multi-period demo dataset.
- **Files:** project config, `lib/types.ts`, `lib/data/companies.ts`, `lib/providers/*`
- **Outcome:** NVDA, AAPL, and MSFT load through one provider contract without secrets.
- **Verification:** Typecheck, lint, and validate the provider response at the server boundary.

## Phase 3 — Financial analysis

- **Objective:** Implement deterministic comparisons, materiality scoring, insights, evidence linking, and grounded fallback Q&A.
- **Files:** `lib/finance/*`, `lib/ai/*`, `lib/schemas/*`, `tests/finance.test.ts`
- **Outcome:** Reusable, tested analysis independent of React.
- **Verification:** Run focused tests for QoQ/YoY/absolute/margin changes, negatives, zero denominators, missing values, scoring, and segment contribution.

## Phase 4 — Product interface

- **Objective:** Build the minimal landing page and the evidence-first research workspace.
- **Files:** `app/*`, `components/*`
- **Outcome:** Company selection, period comparison, snapshot, ranked changes, evidence drawer, and Ask the Delta work on desktop and small screens.
- **Verification:** Exercise keyboard navigation and all requested empty/error/no-key states; inspect desktop and mobile renders.

## Phase 5 — Production hardening

- **Objective:** Verify a clean Vercel-ready artifact.
- **Files:** `.env.example`, final styles/config/docs
- **Outcome:** Secret-free default demo with complete repository handoff.
- **Verification:** Run tests, TypeScript, lint, production build, and final visual QA.
