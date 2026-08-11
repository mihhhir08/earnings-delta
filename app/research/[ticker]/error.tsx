"use client";

export default function ResearchError({ reset }: { reset: () => void }) {
  return (
    <main className="state-page">
      <span className="state-code">Research unavailable</span>
      <h1>The research record could not load.</h1>
      <p>Please try again. No partial results were shown.</p>
      <button className="primary-action" onClick={reset}>Try again</button>
    </main>
  );
}
