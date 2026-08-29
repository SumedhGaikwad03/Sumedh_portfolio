import { useState } from "react";
import { Cpu, Timer, Shield, Layers } from "lucide-react";

export default function DualSimulationDiagram() {
  const [activeSim, setActiveSim] = useState<"BASELINE" | "RL">("RL");

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // ARCHITECTURE::DUAL_SIMULATION_ENGINE
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            Step-Synchronized Dual Micro-Simulation Architecture
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSim("BASELINE")}
            className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors ${
              activeSim === "BASELINE"
                ? "border-[var(--color-slate-light)] bg-[var(--color-surface-elevated)] text-[var(--color-ink)] font-bold"
                : "border-[var(--color-border)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
            }`}
          >
            PORT 8813: BASELINE
          </button>
          <button
            type="button"
            onClick={() => setActiveSim("RL")}
            className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors ${
              activeSim === "RL"
                ? "border-[var(--color-terminal)] bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] font-bold"
                : "border-[var(--color-border)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
            }`}
          >
            PORT 8814: DDQN AGENT
          </button>
        </div>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        Evaluating intelligent signal controllers sequentially across separate simulation runs introduces statistical noise because stochastic vehicle insertion seeds drift over time. <code className="text-[var(--color-terminal)] font-mono">DualSimManager</code> launches two independent SUMO instances in lockstep (0.1s per tick) across separate TraCI ports, guaranteeing that both controllers confront mathematically identical vehicle arrivals.
      </p>

      {/* Dual Simulation Visual Map */}
      <div className="rounded bg-[#0B0D0F] p-5 border border-[var(--color-border-subtle)] font-mono text-xs text-[var(--color-slate)] space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2 text-[11px]">
          <span className="text-[var(--color-terminal)] font-bold flex items-center gap-1.5">
            <Layers size={13} />
            <span>UNBIASED STEP-SYNCHRONIZATION PIPELINE (0.1s TICK)</span>
          </span>
          <span className="text-[var(--color-slate-light)] text-[10px]">ECLIPSE SUMO v1.24+</span>
        </div>

        {/* Demand Ingestion Header */}
        <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-center text-[var(--color-ink)]">
          <span className="text-[10px] text-[var(--color-slate-light)] block mb-0.5">SYNCHRONIZED VEHICULAR DEMAND INPUT</span>
          <strong>NGSIM US-101 Empirical Trajectory Stream (.rou.xml)</strong>
        </div>

        {/* Parallel Branches */}
        <div className="grid sm:grid-cols-2 gap-4 pt-1">
          {/* Baseline Branch */}
          <div
            className={`p-4 rounded border transition-all duration-200 space-y-2.5 ${
              activeSim === "BASELINE"
                ? "border-[var(--color-slate-light)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(255,255,255,0.05)]"
                : "border-[var(--color-border-subtle)] bg-[var(--color-surface)]/60 opacity-80"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2">
              <span className="text-xs font-bold text-[var(--color-ink)] flex items-center gap-1.5">
                <Timer size={13} className="text-[var(--color-slate-light)]" />
                <span>BASELINE INSTANCE</span>
              </span>
              <span className="text-[10px] text-[var(--color-slate)]">TraCI Port 8813</span>
            </div>
            <div className="text-[11px] space-y-1.5">
              <div><span className="text-[var(--color-slate-light)]">CONTROLLER:</span> <span className="text-[var(--color-ink)]">FixedTimeController</span></div>
              <div><span className="text-[var(--color-slate-light)]">POLICY:</span> Cyclical 30s Green / 3s Yellow</div>
              <div><span className="text-[var(--color-slate-light)]">MODE:</span> Headless background subprocess</div>
            </div>
          </div>

          {/* RL Branch */}
          <div
            className={`p-4 rounded border transition-all duration-200 space-y-2.5 ${
              activeSim === "RL"
                ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(126,231,135,0.1)]"
                : "border-[var(--color-border-subtle)] bg-[var(--color-surface)]/60 opacity-80"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2">
              <span className="text-xs font-bold text-[var(--color-terminal)] flex items-center gap-1.5">
                <Cpu size={13} />
                <span>RL POLICY INSTANCE</span>
              </span>
              <span className="text-[10px] text-[var(--color-terminal)]">TraCI Port 8814</span>
            </div>
            <div className="text-[11px] space-y-1.5">
              <div><span className="text-[var(--color-slate-light)]">CONTROLLER:</span> <span className="text-[var(--color-terminal)]">DDQNController (PyTorch)</span></div>
              <div><span className="text-[var(--color-slate-light)]">POLICY:</span> 25-State Dynamic Phase Optimization</div>
              <div><span className="text-[var(--color-slate-light)]">SAFETY:</span> Hysteresis (10s) & Starvation (60s)</div>
            </div>
          </div>
        </div>

        {/* Live Comparison Output */}
        <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <Shield size={13} className="text-[var(--color-terminal)]" />
            <span className="text-[var(--color-ink)] font-bold">METRICS COMPARATOR:</span>
            <span className="text-[var(--color-slate)]">Computes exact percentage deltas in real time</span>
          </div>
          <span className="text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5">
            WS BROADCAST (/ws @ 200ms)
          </span>
        </div>
      </div>
    </div>
  );
}
