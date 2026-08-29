import { useState } from "react";
import { Siren } from "lucide-react";

interface Step {
  num: string;
  name: string;
  actor: string;
  description: string;
  codeSnippet: string;
}

const emergencySteps: Step[] = [
  {
    num: "01",
    name: "TraCI Vehicle Telemetry Scan",
    actor: "DualSimManager",
    description: "Iterates through all active vehicles across the simulation. Detects any vehicle with vType === 'emergency' on approach lanes.",
    codeSnippet: "for veh_id in active_vehicles:\n    if traci.vehicle.getTypeID(veh_id) == 'emergency':\n        return True, veh_id",
  },
  {
    num: "02",
    name: "Directional Corridor Resolution",
    actor: "DualSimManager",
    description: "Determines the specific approach edge (North-South vs East-West) and computes the required physical green phase index.",
    codeSnippet: "target_phase = 0 if direction in ['north', 'south'] else (4 if is_urban else 2)",
  },
  {
    num: "03",
    name: "Signal Preemption Override",
    actor: "DualSimManager -> TraCI",
    description: "Temporarily suspends normal DDQN policy and forces the target green phase via TraCI, clearing cross-traffic queues.",
    codeSnippet: "self.rl_sumo.set_phase(self.tls_id, forced_phase)\nself._rl_emergency_active = True",
  },
  {
    num: "04",
    name: "Gateway Node Congestion Detection",
    actor: "DualSimManager",
    description: "Detects if emergency vehicle is halted (speed < 0.5 m/s) on intermediate priority gateway nodes (e.g. A1B1.230.00).",
    codeSnippet: "if veh_speed < 0.5 and is_gateway_approach(current_edge):\n    # Gateway priority blocking detected",
  },
  {
    num: "05",
    name: "TraCI Teleport Recovery",
    actor: "TraCI moveTo() Hook",
    description: "Teleports the vehicle 20m onto the outgoing edge past the un-overridable priority gateway node to resume natural traversal.",
    codeSnippet: "traci.vehicle.moveTo(veh_id, target_lane, pos=20.0)\ntraci.vehicle.setSpeedMode(veh_id, 0)",
  },
  {
    num: "06",
    name: "Normal DDQN Policy Resumption",
    actor: "DualSimManager",
    description: "Once the emergency vehicle clears the intersection bounds, restores the PyTorch DDQN controller with fresh state observations.",
    codeSnippet: "self._rl_emergency_active = False\nself.rl_agent_controller.reset_timer()",
  },
];

export default function EmergencyPreemptionFlow() {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const step = emergencySteps[activeStepIdx];

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // SIGNAL_CONTROL::EMERGENCY_PREEMPTION
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            Emergency Green Corridor & Gateway Teleportation
          </h3>
        </div>
        <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
          [PRIORITY PREEMPTION & RECOVERY]
        </span>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        Emergency vehicles (ambulances, fire engines) require instant signal preemption. In multi-junction arterial simulations, intermediate non-controlled priority nodes (gateway edges) can cause vehicles to halt despite green TLS phases. STMS combines automated directional signal overrides with a TraCI <code className="text-[var(--color-terminal)] font-mono">moveTo()</code> teleport recovery mechanism.
      </p>

      {/* Step Selector Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1">
        {emergencySteps.map((s, idx) => {
          const isSelected = idx === activeStepIdx;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveStepIdx(idx)}
              className={`p-3 rounded border text-left transition-all duration-150 flex flex-col justify-between ${
                isSelected
                  ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(126,231,135,0.1)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-[var(--color-terminal)]">
                  {s.num}
                </span>
                <Siren
                  size={12}
                  className={isSelected ? "text-[var(--color-terminal)]" : "text-[var(--color-slate)]"}
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-[var(--color-ink)] line-clamp-1">
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Details */}
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 space-y-4 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-terminal)] font-bold">STAGE {step.num}:</span>
            <span className="text-[var(--color-ink)] font-bold text-sm">{step.name}</span>
          </div>
          <span className="text-[10px] text-[var(--color-slate-light)]">
            EXECUTING AGENT: {step.actor}
          </span>
        </div>

        <p className="text-sm font-sans text-[var(--color-slate)] leading-relaxed">
          {step.description}
        </p>

        <div className="p-3.5 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)] text-[11px] text-[var(--color-terminal)] whitespace-pre-wrap">
          {step.codeSnippet}
        </div>

        <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[11px] font-mono text-[var(--color-slate)]">
          <strong className="text-[var(--color-ink)] font-sans">Engineering Note: </strong>
          Teleportation is strictly a simulation recovery mechanism for un-overridable SUMO gateway priority junctions, ensuring emergency vehicles complete journeys realistically without requiring road network redesign.
        </div>
      </div>
    </div>
  );
}
