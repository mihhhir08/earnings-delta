"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Direction = "favorable" | "unfavorable" | "neutral";

export interface LandingPreview {
  ticker: string;
  name: string;
  period: string;
  comparison: string;
  metrics: { label: string; value: string; change: string; direction: Direction }[];
  insight: {
    title: string;
    summary: string;
    confidence: string;
    score: number;
    calculation: string;
    source: string;
  };
  href: string;
}

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

function ExternalIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 13 15 5M9 5h6v6M15 12v4H4V5h4" /></svg>;
}

function DeltaMark() {
  return <span className="delta-mark" aria-hidden="true">Δ</span>;
}

export function LandingExperience({ previews }: { previews: LandingPreview[] }) {
  const [ticker, setTicker] = useState(previews[0]?.ticker ?? "NVDA");
  const active = useMemo(() => previews.find((preview) => preview.ticker === ticker) ?? previews[0], [previews, ticker]);

  if (!active) return null;

  return (
    <main className="landing-shell">
      <header className="landing-header">
        <nav className="landing-nav" aria-label="Primary navigation">
          <Link className="wordmark" href="/"><DeltaMark /> Earnings Delta</Link>
          <div className="landing-nav-links">
            <a href="#product">Product</a>
            <a href="#method">Method</a>
            <a href="#why">Why I Built This</a>
            <a href="https://github.com/mihhhir08/earnings-delta">GitHub</a>
          </div>
          <Link className="nav-action" href={active.href}>Open research <ArrowIcon /></Link>
        </nav>
      </header>

      <section className="landing-hero" id="product">
        <div className="hero-copy">
          <h1>The quarter changed. <span>Find out where.</span></h1>
          <p>Earnings Delta turns period-over-period financials into a ranked, auditable research brief. See the movement, understand the driver, and inspect the evidence behind the conclusion.</p>
          <div className="hero-actions">
            <Link className="primary-action" href={active.href}>Explore {active.ticker} research <ArrowIcon /></Link>
            <a className="secondary-action" href="https://github.com/mihhhir08/earnings-delta">View GitHub <ExternalIcon /></a>
          </div>
          <div className="dataset-note" title="A representative dataset demonstrates the complete research workflow without presenting demo commentary as source filings.">
            <span className="status-dot" /> Representative dataset
          </div>
        </div>

        <div className="product-stage" aria-label="Interactive product preview">
          <div className="preview-company-tabs" role="group" aria-label="Preview company">
            {previews.map((preview) => (
              <button key={preview.ticker} className={active.ticker === preview.ticker ? "active" : ""} onClick={() => setTicker(preview.ticker)} aria-pressed={active.ticker === preview.ticker}>
                <strong>{preview.ticker}</strong><span>{preview.name.replace(" Corporation", "").replace(" Inc.", "")}</span>
              </button>
            ))}
          </div>
          <article className="hero-proof" key={active.ticker}>
            <div className="preview-topline">
              <span className="preview-ticker">{active.ticker}</span>
              <span>{active.period}</span>
              <span className="preview-mode">{active.comparison}</span>
            </div>
            <div className="preview-metrics">
              {active.metrics.map((metric) => (
                <div key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small className={metric.direction}>{metric.change}</small>
                </div>
              ))}
            </div>
            <div className="preview-case">
              <div className="case-rank">01</div>
              <div>
                <div className="preview-label"><span>Top observation</span><span>{active.insight.confidence}</span><span>Materiality {active.insight.score}</span></div>
                <h2>{active.insight.title}</h2>
                <p>{active.insight.summary}</p>
                <div className="evidence-chain" aria-label="Evidence path">
                  <span>Claim</span><i /><span>Calculation</span><i /><span>Source</span><i /><span>Confidence</span>
                </div>
              </div>
            </div>
            <Link className="preview-footer" href={active.href}><span>Open the complete company record</span><ArrowIcon /></Link>
          </article>
        </div>
      </section>

      <section className="story-intro">
        <p>Four moves, one continuous research trail.</p>
        <h2>Move from a reported number to a defensible point of view without losing the path back to evidence.</h2>
        <ol className="story-sequence" aria-label="Research workflow">
          <li><strong>What changed</strong><span>Measure the period movement</span></li>
          <li><strong>Why it changed</strong><span>Surface the operating driver</span></li>
          <li><strong>Verify it</strong><span>Inspect the calculation and source</span></li>
          <li><strong>Ask further</strong><span>Continue from grounded context</span></li>
        </ol>
      </section>

      <section className="story-section story-change">
        <div className="story-copy">
          <span className="story-step">What changed</span>
          <h2>Start with material movement, not a wall of metrics.</h2>
          <p>The financial condition is visible at a glance, then the largest observations are ordered by magnitude, relevance, and evidence strength.</p>
        </div>
        <div className="story-artifact change-artifact">
          <header><strong>{active.ticker}</strong><span>{active.period}</span><span>{active.comparison}</span></header>
          {active.metrics.map((metric, index) => (
            <div className={index === 0 ? "artifact-row primary" : "artifact-row"} key={metric.label}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{metric.label}</strong><b>{metric.value}</b><small className={metric.direction}>{metric.change}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="story-section story-evidence">
        <div className="story-copy">
          <span className="story-step">Why and verify</span>
          <h2>A conclusion earns its place by showing its work.</h2>
          <p>Every material observation can carry a direct calculation, representative source context, and a confidence boundary. The evidence is attached to the claim, not buried in a separate view.</p>
        </div>
        <div className="story-artifact evidence-artifact">
          <div className="artifact-claim"><span>Claim</span><h3>{active.insight.title}</h3><p>{active.insight.summary}</p></div>
          <div className="artifact-evidence-grid">
            <div><span>Calculation</span><p>{active.insight.calculation}</p></div>
            <div><span>Source</span><p>{active.insight.source}</p></div>
            <div><span>Confidence</span><strong>{active.insight.confidence}</strong></div>
          </div>
        </div>
      </section>

      <section className="story-section story-ask">
        <div className="story-copy">
          <span className="story-step">Ask further</span>
          <h2>Continue the analysis from the company record already in view.</h2>
          <p>Ask a natural follow-up and receive a concise answer grounded in the current period, comparison, calculations, and linked evidence.</p>
        </div>
        <div className="story-artifact ask-artifact">
          <div className="ask-demo-question"><span>You</span><p>What was the main driver of the revenue change?</p></div>
          <div className="ask-demo-answer"><span>Delta</span><p>{active.insight.summary}</p><small>Grounded in the current company record</small></div>
        </div>
      </section>

      <section className="method-section" id="method">
        <div>
          <h2>Research discipline, expressed in the product.</h2>
          <p>The interface follows the same order as the analysis: establish facts, rank significance, attach evidence, then interpret.</p>
        </div>
        <div className="principles">
          <article><span>01</span><h3>Calculate before interpreting</h3><p>Period comparisons and materiality are established in code before any explanation is written.</p></article>
          <article><span>02</span><h3>Keep evidence attached</h3><p>The claim, math, source context, and confidence state travel together.</p></article>
          <article><span>03</span><h3>Make complexity earn its place</h3><p>Each control supports a real research decision. Anything else stays out of the way.</p></article>
        </div>
      </section>

      <section className="why-section" id="why">
        <div className="why-marker"><DeltaMark /></div>
        <div>
          <h2>Why I built Earnings Delta</h2>
          <p>I built this after interviewing for a Full Stack Developer role at Fiscal.ai. The conversation made me think more deeply about how structured financial data, earnings reports, transcripts, and AI could work together in one evidence-first research workflow.</p>
          <p>I wanted to explore that idea by building it: a product that helps investors identify the most important change in a quarter, understand what drove it, and verify the reasoning without leaving the analysis.</p>
        </div>
      </section>

      <section className="closing-section">
        <h2>Read the quarter as a chain of evidence.</h2>
        <div>
          <Link className="primary-action signal-action" href={active.href}>Explore the research workspace <ArrowIcon /></Link>
          <a className="footer-github" href="https://github.com/mihhhir08/earnings-delta">View source on GitHub <ExternalIcon /></a>
        </div>
      </section>

      <footer className="landing-footer"><span>Earnings Delta</span><span>Evidence-first financial research</span><span>Built in Toronto</span></footer>
    </main>
  );
}
