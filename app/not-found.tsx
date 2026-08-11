import Link from "next/link";

export default function NotFound() {
  return (
    <main className="state-page">
      <span className="state-code">Unsupported ticker</span>
      <h1>No research record exists for that company.</h1>
      <p>The public demo currently supports NVDA, AAPL, and MSFT.</p>
      <Link className="primary-action" href="/research/NVDA">Open NVDA research</Link>
    </main>
  );
}
