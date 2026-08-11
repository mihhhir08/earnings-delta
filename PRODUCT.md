# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router, React, TypeScript in strict mode, Tailwind CSS, Zod, and Vitest, deployed as one Vercel project. This stack is explicitly specified by the product brief.

## Users

The primary user is a public-markets investor or research analyst reviewing a newly reported quarter. They need to identify material changes quickly, understand likely drivers, and verify every conclusion against source evidence.

## Product Purpose

Earnings Delta turns period-over-period financial change into a short, ranked, evidence-linked research workflow. Success means a reviewer can understand what changed, why it matters, and where the conclusion came from within roughly 20 seconds of opening a company page.

## Positioning

This is not a stock dashboard. Its distinct mechanism is a deterministic change engine that ranks financial deltas first, then connects each conclusion to structured calculations and source excerpts before optional AI interpretation.

## Operating Context

Users compare the latest quarter against the previous quarter and prior-year quarter, scan aligned financial metrics, inspect a ranked change ledger, open evidence in context, and ask grounded follow-up questions.

## Capabilities and Constraints

- Public demo with representative data for NVDA, AAPL, and MSFT and multiple periods per company.
- Fully useful without paid APIs, authentication, a database, or an LLM key.
- Financial calculations, materiality ranking, evidence retrieval, and grounded fallback answers run server-side.
- Fiscal.ai is represented by a provider contract only; no unverified endpoint or response shape may be invented.
- Optional richer LLM behavior must use validated structured output and preserve evidence classifications.
- Out of scope: portfolios, watchlists, alerts, news, trading, social, payments, accounts, and admin tools.

## Brand Commitments

The product is named Earnings Delta. Its voice is concise, sober, precise, and evidence-first. The research interface should feel like a modern professional financial research terminal: dense but readable, fast, and free of crypto-dashboard or decorative SaaS conventions.

## Evidence on Hand

The brief authorizes representative mock financial statements, segment/KPI values, filing excerpts, and transcript excerpts. All such content must be identified as demo data and must never be presented as live or audited market data. No commercial claims, customer proof, live Fiscal.ai credentials, or verified external dataset were supplied.

## Product Principles

1. Calculate before interpreting.
2. Every material claim should expose its evidence.
3. Confidence labels describe what the evidence can actually establish.
4. Prefer a small, complete research workflow over broad dashboard features.
5. The no-key demo is a first-class product state.

## Accessibility & Inclusion

The web interface must be keyboard usable, responsive, high contrast, motion-aware, and should not communicate meaning through color alone.

> Assumption note: user identity and operating context are inferred directly from the supplied product thesis and workflow because no additional interview response was available.
