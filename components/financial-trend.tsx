"use client";

import { useId, useState } from "react";
import { formatFinancialValue } from "@/lib/finance/analysis";
import type { MetricKey, TrendPoint } from "@/lib/types";

type TrendMetric = "revenue" | "grossMargin" | "freeCashFlow";

const metrics: { key: TrendMetric; label: string }[] = [
  { key: "revenue", label: "Revenue" },
  { key: "grossMargin", label: "Gross margin" },
  { key: "freeCashFlow", label: "Free cash flow" },
];

function valueLabel(metric: TrendMetric, value: number) {
  return formatFinancialValue(metric as MetricKey, value);
}

export function FinancialTrend({ points }: { points: TrendPoint[] }) {
  const [metric, setMetric] = useState<TrendMetric>("revenue");
  const titleId = useId();
  const valuesId = useId();
  const values = points.map((point) => point[metric]).filter((value): value is number => value !== null);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const range = maximum - minimum || 1;
  const coordinates = points.map((point, index) => {
    const value = point[metric] ?? minimum;
    const x = 42 + index * (556 / Math.max(1, points.length - 1));
    const y = 132 - ((value - minimum) / range) * 92;
    return { x, y, value, period: point.period };
  });
  const path = coordinates.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
  const selectedMetric = metrics.find((item) => item.key === metric)?.label ?? "Metric";

  return (
    <section className="trend-panel" aria-labelledby={titleId}>
      <div className="trend-heading">
        <div>
          <h2 id={titleId}>Financial trajectory</h2>
          <p>Five reporting periods, shown in reported units.</p>
        </div>
        <div className="trend-tabs" role="group" aria-label="Chart metric">
          {metrics.map((item) => (
            <button key={item.key} className={metric === item.key ? "active" : ""} onClick={() => setMetric(item.key)} aria-pressed={metric === item.key}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="trend-chart">
        <svg viewBox="0 0 640 180" role="img" aria-label={`${selectedMetric} from ${points[0]?.period} to ${points.at(-1)?.period}`} aria-describedby={valuesId}>
          {[40, 86, 132].map((y) => <line className="trend-gridline" x1="42" x2="598" y1={y} y2={y} key={y} />)}
          <text className="trend-axis-value" x="34" y="43" textAnchor="end">{valueLabel(metric, maximum)}</text>
          <text className="trend-axis-value" x="34" y="89" textAnchor="end">{valueLabel(metric, minimum + range / 2)}</text>
          <text className="trend-axis-value" x="34" y="135" textAnchor="end">{valueLabel(metric, minimum)}</text>
          <path className="trend-path" d={path} pathLength="1" />
          {coordinates.map((point, index) => (
            <g key={point.period}>
              <circle className={index === coordinates.length - 1 ? "trend-point current" : "trend-point"} cx={point.x} cy={point.y} r={index === coordinates.length - 1 ? 5 : 3.5} />
              <text className="trend-period" x={point.x} y="162" textAnchor="middle">{point.period.replace("FY ", "")}</text>
            </g>
          ))}
          {coordinates.at(-1) && (
            <text className="trend-current-value" x={coordinates.at(-1)!.x - 8} y={Math.max(20, coordinates.at(-1)!.y - 13)} textAnchor="end">
              {valueLabel(metric, coordinates.at(-1)!.value)}
            </text>
          )}
        </svg>
        <div className="trend-readouts" id={valuesId}>
          {coordinates.map((point) => <span key={point.period}><small>{point.period}</small><strong>{valueLabel(metric, point.value)}</strong></span>)}
        </div>
      </div>
    </section>
  );
}
