import { useState } from "react";
import { ShieldCheck, AlertOctagon, CheckCircle2 } from "lucide-react";

interface Invariant {
  id: string;
  constant: string;
  value: string;
  name: string;
  purpose: string;
  hazardPrevented: string;
  enforcementSnippet: string;
}

const invariants: Invariant[] = [
  {
    id: "min_hold",
    constant: "MIN_PHASE_STEPS",
    value: "10 steps (1.0s real time)",
    name: "Minimum Phase Hold (Hysteresis Guard)",
    purpose: "Guarantees that once a green phase is initiated, it must remain active for at least 10 consecutive simulation steps before the agent is permitted to propose another transition.",
    hazardPrevented: "High-frequency signal flickering / rapid oscillation (switching lights every second), which confuses drivers and causes complete intersection gridlock.",
    enforcementSnippet: "if self.time_in_phase < self.MIN_PHASE_STEPS:\n    return self.PHASE_MAP.get(self.current_phase, self.current_phase)",
  },
  {
    id: "max_hold",
    constant: "MAX_PHASE_STEPS",
    value: "45 steps (4.5s decision limit)",
    name: "Maximum Phase Duration Cap",
    purpose: "Imposes a hard upper bound on the continuous duration of any single green phase, forcing the controller to evaluate alternative movements even during heavy directional saturation.",
    hazardPrevented: "Over-optimizing for a single dense highway artery while completely ignoring cross-street vehicles.",
    enforcementSnippet: "if self.time_in_phase >= self.MAX_PHASE_STEPS:\n    new_action = self.agent.select_action(state, training=False)",
  },
  {
    id: "starvation",
    constant: "STARVATION_LIMIT",
    value: "60 steps (6.0s max wait threshold)",
    name: "Cross-Street Starvation Override",
    purpose: "Tracks elapsed steps since each non-active phase was last served. If any approach exceeds 60 steps without a green phase, the system overrides RL policy and forces a phase switch.",
    hazardPrevented: "Minor side-street starvation where low-volume vehicles are trapped indefinitely by an agent prioritizing high-volume arterial flow.",
    enforcementSnippet: "if steps_since > self.STARVATION_LIMIT:\n    self.current_phase = starving_phase\n    return self.PHASE_MAP.get(self.current_phase, self.current_phase)",
  },
];

export default function SafetyInvariantPanel() {
  const [activeInvariantId, setActiveInvariantId] = useState<string>("min_hold");
  const selected = invariants.find((i) => i.id === activeInvariantId) || invariants[0];

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // CONTROL_THEORY::SAFETY_INVARIANTS
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            Deterministic Timing Invariants & Hysteresis Guards
          </h3>
        </div>
        <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
          [ZERO UNCHECKED NEURAL CONTROL]
        </span>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        Unconstrained reinforcement learning agents can discover degenerate policies, such as rapid 1-second signal flickering or indefinitely starving low-volume cross-streets. STMS wraps all PyTorch model inferences inside deterministic physical boundary guards: <strong>RL proposes actions; domain safety constraints decide whether those actions are physically acceptable.</strong>
      </p>

      {/* Interactive Invariant Selector */}
      <div className="grid lg:grid-cols-12 gap-6 pt-2">
        {/* Invariant Buttons */}
        <div className="lg:col-span-6 space-y-2.5">
          {invariants.map((inv) => {
            const isSelected = inv.id === activeInvariantId;
            return (
              <button
                key={inv.id}
                type="button"
                onClick={() => setActiveInvariantId(inv.id)}
                className={`w-full text-left p-3.5 rounded border transition-all duration-150 flex items-center justify-between group ${
                  isSelected
                    ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(126,231,135,0.1)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-xs font-mono font-bold text-[var(--color-terminal)]">
                      {inv.constant}
                    </code>
                    <span className="text-[10px] font-mono text-[var(--color-slate-light)]">
                      = {inv.value}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--color-ink)] font-semibold block">
                    {inv.name}
                  </span>
                </div>

                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                    isSelected
                      ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                      : "text-[var(--color-slate)] border-[var(--color-border-subtle)]"
                  }`}
                >
                  {isSelected ? "ACTIVE" : "INSPECT"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Invariant Detail */}
        <div className="lg:col-span-6 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between space-y-4 font-mono text-xs">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 mb-3">
              <h4 className="text-sm font-bold text-[var(--color-ink)] flex items-center gap-2">
                <ShieldCheck size={14} className="text-[var(--color-terminal)]" />
                <span>{selected.constant}</span>
              </h4>
              <span className="text-[10px] text-[var(--color-terminal)]">HARD CONSTRAINT</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-1">
                <span className="text-[10px] text-[var(--color-terminal)] font-sans font-semibold block flex items-center gap-1.5">
                  <CheckCircle2 size={12} />
                  <span>OPERATIONAL PURPOSE:</span>
                </span>
                <p className="text-[var(--color-slate)] font-sans text-xs leading-relaxed">
                  {selected.purpose}
                </p>
              </div>

              <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-1">
                <span className="text-[10px] text-[var(--color-accent)] font-sans font-semibold block flex items-center gap-1.5">
                  <AlertOctagon size={12} />
                  <span>PHYSICAL HAZARD MITIGATED:</span>
                </span>
                <p className="text-[var(--color-slate)] font-sans text-xs leading-relaxed">
                  {selected.hazardPrevented}
                </p>
              </div>

              <div className="p-3 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)] text-[11px] text-[var(--color-terminal)] whitespace-pre-wrap">
                {selected.enforcementSnippet}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-[var(--color-slate-light)] border-t border-[var(--color-border-subtle)] pt-2">
            File: backend/ml/ddqn_controller.py (lines 115–136)
          </div>
        </div>
      </div>
    </div>
  );
}
