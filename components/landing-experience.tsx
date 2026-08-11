"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";

const Beams = dynamic(() => import("@/components/beams"), { ssr: false });

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
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>;
}

function ExternalIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 13 15 5M9 5h6v6M15 12v4H4V5h4" /></svg>;
}

function DeltaMark() {
  return <span className="delta-mark" aria-hidden="true">Δ</span>;
}

function SignalGlyph() {
  return (
    <svg className="signal-glyph" viewBox="0 0 120 120" aria-hidden="true">
      <path className="glyph-orbit" d="M11 60h28l9-28 18 56 9-28h34" />
      <circle cx="60" cy="60" r="48" />
      <circle className="glyph-core" cx="60" cy="60" r="6" />
    </svg>
  );
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
              <a href="#method">Method</a>
              <a href="#evidence">Evidence</a>
              <a href="#why">Origin</a>
            </div>
            <a className="nav-github" href="https://github.com/mihhhir08/earnings-delta">GitHub <ExternalIcon /></a>
            <Link className="nav-action" href={active.href}>Enter workspace <ArrowIcon /></Link>
          </nav>
        </header>

        <div className="hero-coordinate" aria-hidden="true"><span>43.6532° N</span><i /><span>79.3832° W</span></div>

        <div className="hero-composition">
          <div className="hero-copy">
            <h1>Every quarter leaves a signal. <span>Trace it.</span></h1>
            <p>Earnings Delta separates reported performance into the movements, drivers, and evidence that deserve your attention.</p>
            <div className="hero-actions">
              <Link className="primary-action" href={active.href}>Analyze {active.ticker} <ArrowIcon /></Link>
              <a className="secondary-action" href="#method">See the method</a>
            </div>
            <div className="hero-status"><span className="status-dot" />Representative dataset <i /> Three companies <i /> Five reporting periods</div>
          </div>

          <div className="analysis-prism" role="region" aria-label="Interactive product preview">
            <div className="prism-header">
              <span>Signal acquisition</span>
              <div className="preview-company-tabs" role="group" aria-label="Preview company">
                {previews.map((preview) => (
                  <button key={preview.ticker} className={active.ticker === preview.ticker ? "active" : ""} onClick={() => setTicker(preview.ticker)} aria-pressed={active.ticker === preview.ticker}>
                    {preview.ticker}
                  </button>
                ))}
              </div>
              <span className="prism-state"><i />Locked</span>
            </div>

            <div className="prism-body" key={active.ticker}>
              <div className="prism-period">
                <span>Current</span><strong>{active.period}</strong>
                <i />
                <span>Reference</span><strong>{active.comparison.replace("vs. ", "")}</strong>
              </div>
              <div className="prism-core"><SignalGlyph /><span>Δ</span></div>
              <div className="prism-result">
                <div><span>Primary observation</span><b>{active.insight.confidence}</b></div>
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
            <Link className="prism-footer" href={active.href}><span>Open complete research record</span><ArrowIcon /></Link>
          </div>
        </div>

        <a className="scroll-cue" href="#method"><span>Follow the signal</span><i /></a>
      </section>

      <section className="signal-method" id="method">
        <div className="method-intro">
          <h2>One quarter in. Four research states out.</h2>
          <p>The system establishes the reported movement before it forms an interpretation. Every step remains inspectable.</p>
        </div>
        <div className="signal-path" aria-label="Research method">
          <div><span>01</span><strong>Measure</strong><p>Normalize the periods and calculate the movement.</p></div>
          <i />
          <div><span>02</span><strong>Decompose</strong><p>Find the operating segment or financial relationship behind it.</p></div>
          <i />
          <div><span>03</span><strong>Rank</strong><p>Order observations by materiality and evidence strength.</p></div>
          <i />
          <div><span>04</span><strong>Ground</strong><p>Attach the calculation, source context, and confidence boundary.</p></div>
        </div>
      </section>

      <section className="decomposition-section">
        <div className="decomposition-heading">
          <h2>A quarter, decomposed.</h2>
          <p>Switch the company above and this entire signal changes with it. The interface is driven by the same calculation engine as the workspace.</p>
        </div>
        <div className="decomposition-instrument">
          <div className="instrument-scale" aria-hidden="true">{Array.from({ length: 11 }, (_, index) => <span key={index}>{index * 10}</span>)}</div>
          <div className="instrument-company"><strong>{active.ticker}</strong><span>{active.name}</span><small>{active.period}</small></div>
          <div className="instrument-observation">
            <span>Highest materiality</span><h3>{active.insight.title}</h3><p>{active.insight.summary}</p>
          </div>
          <div className="instrument-readout"><span>Score</span><strong>{active.insight.score}</strong><small>/ 100</small></div>
          <Link href={active.href}>Inspect the calculation <ArrowIcon /></Link>
        </div>
      </section>

      <section className="evidence-section" id="evidence">
        <div className="evidence-beam" aria-hidden="true"><i /><span /><i /><span /><i /></div>
        <div className="evidence-copy">
          <h2>Reasoning you can walk backward.</h2>
          <p>A conclusion is only useful when the path behind it stays visible. Earnings Delta binds every observation to the underlying calculation, representative source context, and an explicit confidence state.</p>
        </div>
        <div className="evidence-spectrum">
          <article><span>Claim</span><h3>{active.insight.title}</h3><p>{active.insight.summary}</p></article>
          <article><span>Calculation</span><p>{active.insight.calculation}</p></article>
          <article><span>Source</span><p>{active.insight.source}</p></article>
          <article><span>Confidence</span><strong>{active.insight.confidence}</strong><small>Evidence remains distinguishable from interpretation.</small></article>
        </div>
      </section>

      <section className="question-section">
        <div className="question-interface">
          <div className="question-title"><DeltaMark /><span>Research continuation</span><i>Evidence linked</i></div>
          <div className="question-line"><span>You</span><p>What drove the most material change this quarter?</p></div>
          <div className="answer-line-demo"><span>Delta</span><p>{active.insight.summary}</p><small>Grounded in {active.period} and its comparison record</small></div>
        </div>
        <div className="question-copy">
          <h2>Keep asking without losing context.</h2>
          <p>Continue from the company, period, calculations, and evidence already on screen. The research trail stays intact.</p>
          <Link href={active.href}>Ask about {active.ticker} <ArrowIcon /></Link>
        </div>
      </section>

      <section className="origin-section" id="why">
        <div className="origin-mark"><SignalGlyph /></div>
        <div>
          <h2>Built because financial data should lead somewhere.</h2>
          <p>I started Earnings Delta after an email exchange about a Full Stack Developer role at Fiscal.ai and a recorded video interview rather than a live conversation. The process left me with a question I wanted to answer by building: how can structured financial data, earnings reports, transcripts, and AI become one trustworthy research workflow?</p>
          <p>This is the result: a working exploration of how investors can move from a reported number to a verified point of view without breaking the chain of evidence.</p>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-signal" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <h2>Find the signal in the quarter.</h2>
        <div>
          <Link className="primary-action" href={active.href}>Enter the research workspace <ArrowIcon /></Link>
          <a className="footer-github" href="https://github.com/mihhhir08/earnings-delta">View source on GitHub <ExternalIcon /></a>
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
