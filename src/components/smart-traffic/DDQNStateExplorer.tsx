import { useState } from "react";
import { Sliders } from "lucide-react";

interface StateCategory {
  id: string;
  indices: string;
  count: number;
  name: string;
  description: string;
  normalization: string;
  sampleFeatures: string[];
}

const stateCategories: StateCategory[] = [
  {
    id: "queues",
    indices: "00 – 03",
    count: 4,
    name: "Queue Lengths (N, S, E, W)",
    description: "Number of halted vehicles (speed < 0.1 m/s) on the 4 incoming approach lanes.",
    normalization: "normalized_queue = min(queue, 20) / 20.0",
    sampleFeatures: ["queue_north / 20", "queue_south / 20", "queue_east / 20", "queue_west / 20"],
  },
  {
    id: "waiting",
    indices: "04 – 07",
    count: 4,
    name: "Average Waiting Times (N, S, E, W)",
    description: "Mean accumulated seconds that queued vehicles have spent waiting on each approach.",
    normalization: "normalized_wait = min(avg_wait, 60.0) / 60.0",
    sampleFeatures: ["wait_north / 60.0", "wait_south / 60.0", "wait_east / 60.0", "wait_west / 60.0"],
  },
  {
    id: "speeds",
    indices: "08 – 11",
    count: 4,
    name: "Mean Velocities (N, S, E, W)",
    description: "Average speed (m/s) of all vehicles approaching the intersection across each direction.",
    normalization: "normalized_speed = min(avg_speed, 15.0) / 15.0",
    sampleFeatures: ["speed_north / 15.0", "speed_south / 15.0", "speed_east / 15.0", "speed_west / 15.0"],
  },
  {
    id: "counts",
    indices: "12 – 15",
    count: 4,
    name: "Approach Vehicle Counts (N, S, E, W)",
    description: "Total active vehicle volume currently occupying incoming arterial road segments.",
    normalization: "normalized_count = min(vehicle_count, 1000.0) / 1000.0",
    sampleFeatures: ["count_north / 1000.0", "count_south / 1000.0", "count_east / 1000.0", "count_west / 1000.0"],
  },
  {
    id: "total_wait",
    indices: "16 – 19",
    count: 4,
    name: "Total Accumulated Delay (N, S, E, W)",
    description: "Aggregate cumulative delay experienced by all queued vehicles on approach edges.",
    normalization: "normalized_total_wait = min(total_wait, 100.0) / 100.0",
    sampleFeatures: ["total_wait_north / 100.0", "total_wait_south / 100.0", "total_wait_east / 100.0", "total_wait_west / 100.0"],
  },
  {
    id: "phase_state",
    indices: "20 – 21",
    count: 2,
    name: "Signal Phase & Elapsed Duration",
    description: "Active green phase index and number of consecutive steps the signal has remained in this phase.",
    normalization: "phase_idx / 4.0, time_in_phase / 60.0",
    sampleFeatures: ["current_phase / 4.0", "time_in_phase / 60.0"],
  },
  {
    id: "emergency",
    indices: "22 – 24",
    count: 3,
    name: "Emergency Vehicle Proximity Flags",
    description: "Binary directional indicators signaling emergency vehicle presence on North/South, East/West, and Proximity approach bounds.",
    normalization: "Binary {0.0, 1.0} per directional corridor",
    sampleFeatures: ["emergency_north_south", "emergency_east_west", "emergency_proximity"],
  },
];

export default function DDQNStateExplorer() {
  const [selectedCatId, setSelectedCatId] = useState<string>("queues");
  const selected = stateCategories.find((c) => c.id === selectedCatId) || stateCategories[0];

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // REINFORCEMENT_LEARNING::STATE_REPRESENTATION
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            Universal 25-Dimensional Observation Space
          </h3>
        </div>
        <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
          [CONTINUOUS NORMALIZED VECTOR]
        </span>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        The PyTorch DDQN agent operates on a continuous 25-dimensional state vector extracted via TraCI at each decision step. Normalizing dynamic physical measurements (queue lengths, cumulative delays, vehicle speeds) into standardized $[0, 1]$ bounds prevents gradient explosion and enables policy generalization across different physical junction topologies.
      </p>

      {/* Interactive Category Selector Grid */}
      <div className="grid lg:grid-cols-12 gap-6 pt-2">
        {/* Category List */}
        <div className="lg:col-span-6 space-y-2">
          {stateCategories.map((cat) => {
            const isSelected = cat.id === selectedCatId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCatId(cat.id)}
                className={`w-full text-left p-3 rounded border transition-all duration-150 flex items-center justify-between group ${
                  isSelected
                    ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(126,231,135,0.1)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[var(--color-terminal)] font-bold">
                    [{cat.indices}]
                  </span>
                  <div>
                    <span className="text-xs font-mono font-bold text-[var(--color-ink)] block">
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-slate-light)]">
                      {cat.count} features
                    </span>
                  </div>
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

        {/* Category Detail Inspector */}
        <div className="lg:col-span-6 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between space-y-4 font-mono text-xs">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 mb-3">
              <h4 className="text-sm font-bold text-[var(--color-ink)] flex items-center gap-2">
                <Sliders size={14} className="text-[var(--color-terminal)]" />
                <span>Feature Slice: Indices [{selected.indices}]</span>
              </h4>
              <span className="text-[10px] text-[var(--color-terminal)]">
                {selected.count} DIMENSIONS
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-1">
                <span className="text-[10px] text-[var(--color-slate-light)] font-sans font-semibold block">
                  PHYSICAL DOMAIN MEANING:
                </span>
                <p className="text-[var(--color-slate)] font-sans text-xs leading-relaxed">
                  {selected.description}
                </p>
              </div>

              <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-1">
                <span className="text-[10px] text-[var(--color-terminal)] font-sans font-semibold block">
                  NORMALIZATION FORMULA:
                </span>
                <code className="text-[var(--color-terminal)] text-[11px] block">
                  {selected.normalization}
                </code>
              </div>

              <div className="p-3 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)] space-y-1.5 text-[11px]">
                <span className="text-[var(--color-slate-light)] block font-sans text-[10px]">
                  STATE TENSOR ENCODING:
                </span>
                {selected.sampleFeatures.map((feat) => (
                  <div key={feat} className="text-[var(--color-ink)] flex items-center gap-2">
                    <span className="text-[var(--color-terminal)]">&rsaquo;</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-[var(--color-slate-light)] border-t border-[var(--color-border-subtle)] pt-2">
            Source: backend/ml/ddqn_controller.py &bull; StateExtractor
          </div>
        </div>
      </div>
    </div>
  );
}
