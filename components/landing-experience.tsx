"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";

const Beams = dynamic(() => import("@/components/beams"), { ssr: false });

type Direction = "favorable" | "unfavorable" | "neutral";

const HERO_LINES = [
  ["See", "what", "changed."],
  ["Verify", "why."],
] as const;

export interface LandingPreview {
  ticker: string;
  period: string;
  comparison: string;
  metrics: { label: string; value: string; change: string; direction: Direction }[];
  insight: {
    title: string;
    summary: string;
    confidence: string;
    score: number;
  };
  href: string;
}

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>;
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
      <section className="spectral-hero" id="product">
        <div className="hero-beams" aria-hidden="true">
          <Beams beamWidth={3} beamHeight={30} beamNumber={20} lightColor="#ffffff" speed={2} noiseIntensity={1.75} scale={0.2} rotation={30} />
        </div>

        <header className="landing-header">
          <nav className="landing-nav" aria-label="Primary navigation">
            <Link className="wordmark" href="/"><DeltaMark /><span>Earnings Delta</span></Link>
            <div className="landing-nav-links">
              <a href="#proof">What it proves</a>
              <a href="#why">Why I built it</a>
            </div>
            <Link className="nav-action" href={active.href}>Enter workspace <ArrowIcon /></Link>
          </nav>
        </header>

        <div className="hero-composition">
          <div className="hero-copy">
            <h1 aria-label="See what changed. Verify why.">
              {HERO_LINES.map((line, lineIndex) => (
                <span className="hero-line" aria-hidden="true" key={line.join("-")}>
                  {line.map((word, wordIndex) => (
                    <span
                      className="hero-word"
                      key={word}
                      style={{ animationDelay: `${(lineIndex * 3 + wordIndex) * 90}ms` }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p>Earnings Delta turns quarterly results into ranked explanations you can trace back to the source.</p>
            <div className="hero-actions">
              <Link className="primary-action" href={active.href}>Open live workspace <ArrowIcon /></Link>
              <a className="secondary-action" href="https://github.com/mihhhir08/earnings-delta">View source <ExternalIcon /></a>
            </div>
          </div>

          <div className="analysis-prism" role="region" aria-label="Interactive product preview">
            <div className="prism-header">
              <span>Interactive preview</span>
              <div className="preview-company-tabs" role="group" aria-label="Preview company">
                {previews.map((preview) => (
                  <button key={preview.ticker} className={active.ticker === preview.ticker ? "active" : ""} onClick={() => setTicker(preview.ticker)} aria-pressed={active.ticker === preview.ticker}>
                    {preview.ticker}
                  </button>
                ))}
              </div>
            </div>

            <div className="prism-body" key={active.ticker}>
              <div className="prism-result">
                <div><span>{active.period} · {active.comparison}</span><b>Source support: {active.insight.confidence}</b></div>
                <h2>{active.insight.title}</h2>
                <p>{active.insight.summary}</p>
                <div className="confidence-track"><span style={{ width: `${active.insight.score}%` }} /><small>Materiality {active.insight.score}</small></div>
              </div>
            </div>

            <div className="prism-metrics">
              {active.metrics.map((metric) => (
                <div key={metric.label}>
                  <span>{metric.label}</span><strong>{metric.value}</strong><small className={metric.direction}>{metric.change}</small>
                </div>
              ))}
            </div>
            <Link className="prism-footer" href={active.href}><span>Open {active.ticker} research record</span><ArrowIcon /></Link>
          </div>
        </div>

      </section>

      <section className="proof-section" id="proof">
        <h2>From filing to finding.</h2>
        <div className="proof-flow">
          <article><strong>Compare</strong><p>Normalize reporting periods and calculate the movement.</p></article>
          <article><strong>Explain</strong><p>Rank the operating changes that matter.</p></article>
          <article><strong>Verify</strong><p>Trace each conclusion to calculation and source context.</p></article>
        </div>
      </section>

      <section className="project-story" id="why">
        <div>
          <h2>Built from a question worth exploring.</h2>
          <p>After interviewing for a Full Stack Developer role at Fiscal.ai, I kept thinking about one problem: how can structured financial data, earnings reports, transcripts, and AI work together without losing trust or traceability?</p>
          <p>Earnings Delta is my attempt to answer that by building the workflow itself. It helps investors move from a reported number to understanding what changed, why it matters, and what evidence supports the conclusion.</p>
        </div>
        <div className="project-outcome">
          <strong>Working full-stack MVP.</strong>
          <span>Interactive analysis · grounded answers · inspectable code</span>
          <Link className="primary-action" href={active.href}>Open live workspace <ArrowIcon /></Link>
        </div>
      </section>

      <footer className="landing-footer">
        <span>Earnings Delta</span>
        <span>Evidence-first financial research</span>
        <a href="https://portfolio-khaki-sigma-74.vercel.app">Built by Mihirsinh Chavda <ExternalIcon /></a>
      </footer>
    </main>
  );
}
