import { useState } from "react";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface Metric {
  name: string;
  baseline: string;
  rl: string;
  delta: string;
  isPositive: boolean;
  explanation: string;
}

const simpleMetrics: Metric[] = [
  {
    name: "Average Vehicle Wait Time",
    baseline: "3.70 s",
    rl: "2.84 s",
    delta: "−23.2%",
    isPositive: true,
    explanation: "Dynamic phase switching clears accumulated directional queues before unnecessary delay accrues.",
  },
  {
    name: "Average Approach Queue Length",
    baseline: "14.92 veh",
    rl: "10.11 veh",
    delta: "−32.2%",
    isPositive: true,
    explanation: "Reduces peak spatial queue depth, preventing physical intersection spillback.",
  },
  {
    name: "Mean Vehicular Velocity",
    baseline: "4.38 m/s",
    rl: "5.14 m/s",
    delta: "+17.4%",
    isPositive: true,
    explanation: "Vehicles spend less time idling in stop-and-go deceleration shockwaves.",
  },
  {
    name: "System Throughput",
    baseline: "38.34 veh/min",
    rl: "34.40 veh/min",
    delta: "−10.3%",
    isPositive: false,
    explanation: "RL agent holds green phases longer to drain dense queues completely rather than cycling rapidly.",
  },
];

const urbanMetrics: Metric[] = [
  {
    name: "Mean Vehicular Velocity",
    baseline: "6.27 m/s",
    rl: "6.62 m/s",
    delta: "+5.6%",
    isPositive: true,
    explanation: "Improved arterial progression through the central intersection corridor.",
  },
  {
    name: "Average Network Queue Length",
    baseline: "10.93 veh",
    rl: "10.42 veh",
    delta: "−4.7%",
    isPositive: true,
    explanation: "Modest queue reduction across the broader 9-junction network.",
  },
  {
    name: "Network-Wide Average Wait Time",
    baseline: "198.40 s",
    rl: "208.39 s",
    delta: "+5.0% (Variance)",
    isPositive: false,
    explanation: "Coordination boundary: Clearing central RL intersection B1 faster shifted vehicles sooner to downstream fixed-time perimeter signals.",
  },
  {
    name: "Arterial Throughput",
    baseline: "25.00 veh/min",
    rl: "23.83 veh/min",
    delta: "−4.7%",
    isPositive: false,
    explanation: "Reflects downstream boundary bottlenecks at uncoordinated perimeter intersections.",
  },
];

export default function PerformanceComparison() {
  const [scenario, setScenario] = useState<"SIMPLE" | "URBAN">("SIMPLE");
  const metrics = scenario === "SIMPLE" ? simpleMetrics : urbanMetrics;

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // RESEARCH_RESULTS::EMPIRICAL_BENCHMARKS
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            Empirical Simulation Performance & Tradeoffs
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScenario("SIMPLE")}
            className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors ${
              scenario === "SIMPLE"
                ? "border-[var(--color-terminal)] bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] font-bold"
                : "border-[var(--color-border)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
            }`}
          >
            SCENARIO 1: SIMPLE INTERSECTION
          </button>
          <button
            type="button"
            onClick={() => setScenario("URBAN")}
            className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors ${
              scenario === "URBAN"
                ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-bold"
                : "border-[var(--color-border)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
            }`}
          >
            SCENARIO 2: URBAN ARTERIAL 3×3
          </button>
        </div>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        {scenario === "SIMPLE"
          ? "In the isolated 4-way intersection benchmark, the DDQN controller significantly outperformed the fixed-time cyclical baseline across all delay and queue metrics by dynamically adapting to directional surges."
          : "The 3×3 urban arterial grid demonstrated a key research insight: optimizing only the central junction (B1) with RL cleared vehicles faster, but pushed those vehicles into downstream fixed-timer queues sooner, highlighting the necessity of multi-agent network coordination."}
      </p>

      {/* Metrics Table Grid */}
      <div className="grid sm:grid-cols-2 gap-3.5">
        {metrics.map((m) => (
          <div
            key={m.name}
            className="p-4 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] space-y-2.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-[var(--color-ink)]">
                  {m.name}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                    m.isPositive
                      ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                      : "text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]"
                  }`}
                >
                  {m.isPositive ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
                  <span>{m.delta}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
                <div>
                  <span className="text-[10px] text-[var(--color-slate-light)] block">FIXED TIMER:</span>
                  <span className="text-[var(--color-slate)] font-bold">{m.baseline}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--color-terminal)] block">DDQN AGENT:</span>
                  <span className="text-[var(--color-ink)] font-bold">{m.rl}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] font-mono text-[var(--color-slate)] leading-relaxed pt-1 border-t border-[var(--color-border-subtle)]">
              &bull; {m.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Coordination Boundary Callout */}
      {scenario === "URBAN" && (
        <div className="p-4 rounded bg-[#0B0D0F] border border-[var(--color-accent)]/40 font-mono text-xs text-[var(--color-slate)] space-y-1.5">
          <div className="flex items-center gap-2 text-[var(--color-accent)] font-bold">
            <AlertTriangle size={13} />
            <span>RESEARCH TAKEAWAY: THE COORDINATION BOUNDARY</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Single-agent reinforcement learning at a solitary junction within a fixed-time arterial shifts bottlenecks rather than dissolving them. True grid-wide optimization requires multi-agent reinforcement learning (MARL) where perimeter intersections dynamically coordinate green waves.
          </p>
        </div>
      )}
    </div>
  );
}
