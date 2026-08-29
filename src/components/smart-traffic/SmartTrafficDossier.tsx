import { Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import DualSimulationDiagram from "./DualSimulationDiagram";
import DDQNStateExplorer from "./DDQNStateExplorer";
import SafetyInvariantPanel from "./SafetyInvariantPanel";
import EmergencyPreemptionFlow from "./EmergencyPreemptionFlow";
import PerformanceComparison from "./PerformanceComparison";
import DecisionCard from "../finance-one/DecisionCard";
import type { DecisionProps } from "../finance-one/DecisionCard";
import ProjectNavigation from "../ProjectNavigation";
import type { Project } from "../../data/content";

const stmsDecisions: DecisionProps[] = [
  {
    id: "01",
    title: "Dual Parallel Micro-Simulation Execution",
    category: "Simulation Architecture",
    decision: "Executing two concurrent SUMO instances (Baseline port 8813, RL port 8814) step-synchronized at 0.1s ticks rather than sequential evaluation runs.",
    why: "Sequential evaluation introduces statistical noise from stochastic vehicle generation seeds. Parallel execution guarantees that both controllers confront identical vehicle arrivals at every step.",
    tradeoff: "Doubles CPU and memory overhead during simulation by running concurrent TraCI socket channels and simulator processes.",
  },
  {
    id: "02",
    title: "Double Deep Q-Networks (DDQN) over Vanilla DQN",
    category: "Reinforcement Learning",
    decision: "Decoupling action selection from action evaluation using separate policy and target neural networks with periodic weight synchronization (1000 steps).",
    why: "Standard Deep Q-Networks suffer from positive maximization bias (overoptimistic Q-values) in noisy stochastic traffic environments. DDQN stabilizes convergence.",
    tradeoff: "Requires maintaining two neural network weight graphs in PyTorch memory and tracking periodic target synchronization intervals.",
  },
  {
    id: "03",
    title: "Deterministic Safety Invariants & Hysteresis",
    category: "Control Safety",
    decision: "Wrapping neural network policy outputs with hard physical bounds: MIN_PHASE_STEPS = 10, MAX_PHASE_STEPS = 45, and STARVATION_LIMIT = 60.",
    why: "Unconstrained RL can discover degenerate policies, such as rapid 1-second signal flickering (causing gridlock) or indefinitely starving minor side-streets.",
    tradeoff: "Slightly restricts theoretical RL action freedom in favor of absolute real-world physical feasibility and cross-street fairness.",
  },
  {
    id: "04",
    title: "Empirical Ingestion of FHWA NGSIM US-101 Data",
    category: "Data Engineering",
    decision: "Preprocessing empirical vehicle trajectory recordings into SUMO XML route definitions (.rou.xml) rather than relying purely on synthetic Poisson traffic.",
    why: "Empirical highway trajectory data captures real-world speed variance, vehicle class ratios, and non-uniform arrival headway distributions.",
    tradeoff: "Requires coordinate transformation pipelines and vehicle class mapping (Motorcycle, Car, Truck) prior to simulation execution.",
  },
  {
    id: "05",
    title: "Live WebSocket Telemetry Broadcasting",
    category: "Real-Time Telemetry",
    decision: "Broadcasting comparative JSON metrics (queue lengths, velocities, wait-time deltas) over FastAPI WebSockets at 200ms intervals.",
    why: "Provides a responsive live monitoring stream for the dashboard without incurring the polling overhead of periodic HTTP requests.",
    tradeoff: "Adds asynchronous connection lifecycle management and client disconnection handling to the backend event loop.",
  },
];

const stmsMilestones = [
  { name: "Dual Simulation Orchestration Engine", status: "COMPLETE", desc: "Step-synchronized DualSimManager stepping Baseline and RL SUMO in parallel." },
  { name: "PyTorch DDQN Agent & Training Pipeline", status: "COMPLETE", desc: "25-state Double DQN with experience replay, target networks, and Huber loss." },
  { name: "Deterministic Safety Invariant Guards", status: "COMPLETE", desc: "10s minimum phase hold, 45s max green hold, and 60s starvation override." },
  { name: "Emergency Signal Preemption & Teleport", status: "COMPLETE", desc: "Corridor preemption and TraCI gateway priority node recovery." },
  { name: "FHWA NGSIM US-101 Trajectory Ingestion", status: "COMPLETE", desc: "Empirical vehicle trajectory preprocessing into microscopic SUMO routes." },
  { name: "FastAPI REST & WebSocket Telemetry", status: "COMPLETE", desc: "Simulation lifecycle endpoints and 200ms JSON state broadcasting." },
  { name: "Frontend Monitoring Dashboard", status: "WIP", desc: "React + Zustand parallel visualization UI (API bindings in progress)." },
  { name: "Multi-Agent Coordinated Grid RL (MARL)", status: "ROADMAP", desc: "Extending autonomous RL control across all 5 intersections in 3x3 grid." },
];

export default function SmartTrafficDossier({ project }: { project: Project }) {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-16">
      {/* 1. Dossier Header */}
      <div>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 mono-label text-xs text-[var(--color-slate)] hover:text-[var(--color-terminal)] transition-colors mb-8"
        >
          <ArrowLeft size={13} />
          <span>cd .. /projects</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
            // RESEARCH::TRAFFIC_CONTROL_01
          </span>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
            STATUS::PEER_REVIEWED_RESEARCH
          </span>
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2 py-0.5 font-mono">
            SUMO::MICRO_SIMULATION
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-ink)] mb-4">
          Smart Traffic Management System
        </h1>
        <p className="text-base sm:text-xl text-[var(--color-slate)] leading-relaxed max-w-3xl mb-6">
          A dual-simulation traffic control system using PyTorch Double Deep Q-Networks (DDQN) inside Eclipse SUMO, with synchronized baseline/RL evaluation, safety invariants, emergency preemption, and empirical NGSIM traffic data.
        </p>

        {/* Action Links & Tech Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <a
            href="https://ijirt.org/article?manuscript=199867"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded bg-[var(--color-terminal)] text-[#0B0D0F] hover:bg-[var(--color-terminal)]/90 transition-colors"
          >
            <span>VIEW PAPER (IJIRT)</span>
            <ExternalLink size={12} />
          </a>

          <a
            href="https://ijirt.org/publishedpaper/IJIRT199867_PAPER.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)] transition-colors"
          >
            <span>DIRECT PDF</span>
            <ArrowUpRight size={12} />
          </a>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)] transition-colors"
            >
              <Github size={12} />
              <span>SOURCE REPOSITORY</span>
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="text-xs font-mono text-[var(--color-slate)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="h-px w-full bg-[var(--color-border)]" />
      </div>

      {/* 2. Core Research Problem */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 01</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            THE TRAFFIC OPTIMIZATION & EVALUATION PROBLEM
          </h2>
        </div>

        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 space-y-5">
          <h3 className="text-xl font-bold text-[var(--color-ink)]">
            Can Adaptive RL Controllers Outperform Fixed Cycles Without Simulation Evaluation Bias?
          </h3>
          <p className="text-sm sm:text-base text-[var(--color-slate)] leading-relaxed">
            Conventional traffic signals use rigid, predetermined cycle timers that cannot adapt to real-time directional density fluctuations. However, evaluating reinforcement learning policies in academic literature often suffers from <strong>evaluation bias</strong>: running the baseline controller and the RL agent sequentially across separate simulation runs introduces uncontrolled variance in vehicle arrival headways.
          </p>

          <div className="grid sm:grid-cols-2 gap-3.5 pt-2 text-xs font-mono">
            <div className="p-3.5 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)] space-y-1">
              <span className="text-[var(--color-accent)] font-bold block">
                [!] CONVENTIONAL EVALUATION FLAW:
              </span>
              <p className="text-[var(--color-slate)] leading-relaxed font-sans">
                Running Fixed-Time on Seed A and RL on Seed B makes percentage comparisons statistically noisy due to stochastic arrival drift.
              </p>
            </div>

            <div className="p-3.5 rounded bg-[#0B0D0F] border border-[var(--color-terminal)]/30 space-y-1">
              <span className="text-[var(--color-terminal)] font-bold block">
                [✓] DUAL SIMULATION SOLUTION:
              </span>
              <p className="text-[var(--color-slate)] leading-relaxed font-sans">
                Advancing two concurrent SUMO instances in lockstep (0.1s per step) guarantees both controllers face identical vehicle streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Central Architectural Idea: Dual Simulation */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 02</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            DUAL PARALLEL MICRO-SIMULATION ARCHITECTURE
          </h2>
        </div>

        <DualSimulationDiagram />
      </section>

      {/* 4. DDQN Observation Space */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 03</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            OBSERVATION SPACE & 25-DIMENSIONAL STATE VECTOR
          </h2>
        </div>

        <DDQNStateExplorer />
      </section>

      {/* 5. Deterministic Safety Invariants */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 04</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            CONTROL SAFETY & TIMING INVARIANTS
          </h2>
        </div>

        <SafetyInvariantPanel />
      </section>

      {/* 6. Emergency Preemption & Gateway Recovery */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 05</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            EMERGENCY PREEMPTION & SIMULATION RECOVERY
          </h2>
        </div>

        <EmergencyPreemptionFlow />
      </section>

      {/* 7. Empirical Research Benchmarks */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 06</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            EMPIRICAL RESULTS & THE COORDINATION BOUNDARY
          </h2>
        </div>

        <PerformanceComparison />
      </section>

      {/* 8. FHWA NGSIM Data Ingestion Pipeline */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 07</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            REAL-WORLD VEHICLE TRAJECTORY INGESTION (FHWA NGSIM)
          </h2>
        </div>

        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-4">
          <h3 className="text-base font-bold text-[var(--color-ink)]">
            Grounding Microscopic Simulation in Real Vehicular Tracking Data
          </h3>
          <p className="text-sm text-[var(--color-slate)] leading-relaxed">
            Rather than training on synthetic, uniformly spaced vehicle traffic, the system ingests empirical vehicle trajectory recordings from the <strong>Federal Highway Administration (FHWA) NGSIM US-101 dataset</strong> (0.1s interval tracking). The preprocessing pipeline (<code className="text-[var(--color-terminal)]">map_to_sumo.py</code>) converts imperial measurements into metric units and maps vehicle class ratios (Motorcycles, Cars, Heavy Trucks) into SUMO-compatible <code className="text-[var(--color-terminal)]">.rou.xml</code> route definitions.
          </p>

          <div className="p-3.5 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)] font-mono text-xs text-[var(--color-terminal)] space-y-1 overflow-x-auto">
            <span className="text-[var(--color-slate-light)]">// Ingestion Pipeline:</span>
            <div>FHWA NGSIM US-101 CSV &rarr; data_preprocessing/map_to_sumo.py &rarr; sumo/routes/continuous_traffic.rou.xml</div>
          </div>
        </div>
      </section>

      {/* 9. Verified Engineering Decisions */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 08</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            VERIFIED ENGINEERING DECISIONS & TRADEOFFS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {stmsDecisions.map((d) => (
            <DecisionCard key={d.id} {...d} />
          ))}
        </div>
      </section>

      {/* 10. Research Lessons & Limitations */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 09</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            WHAT THE EXPERIMENT TAUGHT US: RESEARCH LIMITATIONS
          </h2>
        </div>

        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-4 font-mono text-xs">
          <div className="space-y-2.5 text-[var(--color-slate)]">
            <div className="p-3 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] space-y-1">
              <span className="text-[var(--color-terminal)] font-bold block">1. The Coordination Boundary Limitation:</span>
              <p className="font-sans leading-relaxed">
                In multi-intersection grids, single-agent RL at a central junction (B1) clears local queues rapidly, but causes upstream vehicles to hit fixed-time perimeter signals sooner, shifting rather than eliminating overall network delay.
              </p>
            </div>

            <div className="p-3 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] space-y-1">
              <span className="text-[var(--color-terminal)] font-bold block">2. Simulator Gateway Junction Physics:</span>
              <p className="font-sans leading-relaxed">
                Intermediate non-controlled priority junctions generated between intersections in SUMO cannot have their signal logic overridden via TraCI, necessitating teleportation recovery mechanisms for emergency vehicles.
              </p>
            </div>

            <div className="p-3 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] space-y-1">
              <span className="text-[var(--color-terminal)] font-bold block">3. Research Tool vs Live Municipal Deployment:</span>
              <p className="font-sans leading-relaxed">
                The platform is designed as an empirical simulation testbed operating on TraCI socket telemetry, not as a physical road-camera or municipal field controller.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Technical Specifications & Milestones */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 10</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            TECHNICAL SPECIFICATIONS & MILESTONES
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Milestone List */}
          <div className="md:col-span-7 space-y-2 font-mono text-xs">
            {stmsMilestones.map((m) => {
              const isComplete = m.status === "COMPLETE";
              const isWip = m.status === "WIP";
              return (
                <div
                  key={m.name}
                  className="p-3 rounded border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-[var(--color-ink)] font-bold block">{m.name}</span>
                    <span className="text-[10px] text-[var(--color-slate-light)] font-sans">{m.desc}</span>
                  </div>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded border whitespace-nowrap ${
                      isComplete
                        ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                        : isWip
                        ? "text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]"
                        : "text-[var(--color-slate)] border-[var(--color-border-subtle)]"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Technical Spec Box */}
          <div className="md:col-span-5 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 space-y-3 font-mono text-xs">
            <span className="text-[var(--color-terminal)] font-bold block border-b border-[var(--color-border-subtle)] pb-2">
              // SPECIFICATION MATRIX:
            </span>
            <div className="space-y-2 text-[11px]">
              <div><span className="text-[var(--color-slate-light)]">SIMULATOR:</span> <strong className="text-[var(--color-ink)]">ECLIPSE SUMO v1.24+</strong></div>
              <div><span className="text-[var(--color-slate-light)]">CONTROL API:</span> <strong className="text-[var(--color-ink)]">TraCI (MULTI-PORT)</strong></div>
              <div><span className="text-[var(--color-slate-light)]">ML ENGINE:</span> <strong className="text-[var(--color-ink)]">PyTorch (DDQN)</strong></div>
              <div><span className="text-[var(--color-slate-light)]">BACKEND:</span> <strong className="text-[var(--color-ink)]">FastAPI (ASYNC)</strong></div>
              <div><span className="text-[var(--color-slate-light)]">TELEMETRY:</span> <strong className="text-[var(--color-ink)]">WEBSOCKETS (/ws @ 200ms)</strong></div>
              <div><span className="text-[var(--color-slate-light)]">DATASET:</span> <strong className="text-[var(--color-ink)]">FHWA NGSIM US-101</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Cross-Dossier Navigation */}
      <ProjectNavigation currentSlug={project.slug} />
    </article>
  );
}
