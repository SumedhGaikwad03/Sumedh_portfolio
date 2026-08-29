import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, Database, Layers, Cpu, ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import SectionHeader from "./SectionHeader";

export interface DNAEvidence {
  projectId: string;
  projectName: string;
  primitive: string;
  description: string;
}

export interface DNAPrinciple {
  id: string;
  name: string;
  shortLabel: string;
  icon: typeof Shield;
  philosophy: string;
  whyItMatters: string;
  inferences: string[];
  evidence: DNAEvidence[];
}

const PRINCIPLES: DNAPrinciple[] = [
  {
    id: "correctness",
    name: "CORRECTNESS & PRECISION",
    shortLabel: "CORRECTNESS",
    icon: Database,
    philosophy: "If the system can silently become wrong, the architecture is incomplete.",
    whyItMatters:
      "Financial ledgers and experimental benchmarks cannot tolerate floating-point drift, silent roundoff errors, or evaluation bias.",
    inferences: [
      "Explicit numeric representation (Prisma.Decimal & BigInt paise)",
      "Strict domain budget locking invariants (BudgetLockedError)",
      "Deterministic simulation clock synchronization (0.1s lockstep)",
    ],
    evidence: [
      {
        projectId: "finance-one",
        projectName: "Finance One",
        primitive: "Prisma.Decimal",
        description: "Exact arbitrary-precision decimal financial arithmetic preventing IEEE-754 binary floating-point roundoff drift.",
      },
      {
        projectId: "virtual2reality",
        projectName: "Virtual2Reality",
        primitive: "BigInt 64-bit Normalizer",
        description: "Stores all multi-crore real-estate transaction values as 64-bit integers in paise, eliminating decimal fractions at schema level.",
      },
      {
        projectId: "smart-traffic-management-system",
        projectName: "Smart Traffic",
        primitive: "Lockstep Simulation Sync",
        description: "Evaluates Baseline vs DDQN controllers under identical vehicle generation seeds, eliminating arrival variance bias.",
      },
    ],
  },
  {
    id: "security-boundaries",
    name: "SECURITY BOUNDARIES & ISOLATION",
    shortLabel: "SECURITY BOUNDARIES",
    icon: Shield,
    philosophy: "Security is an architectural invariant enforced before request execution.",
    whyItMatters:
      "Protection must exist at ingress boundaries, preventing malicious payloads or unauthorized tenant access from reaching domain logic.",
    inferences: [
      "Validate endpoints and resolve IP subnets before external network fetches",
      "Enforce multi-tenant anti-enumeration (404 on mismatched resource ownership)",
      "Revoke active sessions statelessly without distributed memory overhead",
    ],
    evidence: [
      {
        projectId: "finance-one",
        projectName: "Finance One",
        primitive: "Anti-Enumeration Guard",
        description: "Multi-tenant repository queries parameterize { where: { userId } } and return 404 on ownership mismatches to prevent ID guessing.",
      },
      {
        projectId: "atrio",
        projectName: "Atrio",
        primitive: "Stateless JWT Invalidation",
        description: "Compares JWT issued-at timestamp against user passwordChangedAt in DB, revoking stolen tokens without centralized token blacklists.",
      },
      {
        projectId: "virtual2reality",
        projectName: "Virtual2Reality",
        primitive: "DNS Pre-Flight SSRF Defense",
        description: "Resolves domain IP addresses and verifies CIDR blocks before HTTP stream initialization, blocking loopback and RFC 1918 private subnets.",
      },
    ],
  },
  {
    id: "concurrency",
    name: "CONCURRENCY & REAL-TIME STATE",
    shortLabel: "CONCURRENCY",
    icon: Zap,
    philosophy: "State transitions must maintain a single source of truth across asynchronous boundaries.",
    whyItMatters:
      "Collaborative platforms and simulation environments require deterministic connection accounting to prevent phantom state and race conditions.",
    inferences: [
      "Track multi-socket connection counts per user to prevent tab disconnect flapping",
      "Decouple durable persistence (REST) from ephemeral broadcast streams (WebSocket)",
      "Maintain strict simulation tick lockstep across parallel worker processes",
    ],
    evidence: [
      {
        projectId: "atrio",
        projectName: "Atrio",
        primitive: "In-Memory Socket Mapping",
        description: "Nested Map<roomId, Map<userId, socketCount>> tracks active browser tabs per user, ensuring offline events only emit when all sockets close.",
      },
      {
        projectId: "atrio",
        projectName: "Atrio",
        primitive: "Dual-Channel Synchronization",
        description: "Stateless Express 5 REST API handles durable MongoDB persistence while in-process Socket.io broadcasts low-latency updates.",
      },
      {
        projectId: "smart-traffic-management-system",
        projectName: "Smart Traffic",
        primitive: "0.1s Dual Sim Execution",
        description: "Step-synchronized dual SUMO micro-simulations execute concurrently across Ports 8813 and 8814 via TraCI TCP sockets.",
      },
    ],
  },
  {
    id: "system-design",
    name: "SYSTEM DESIGN & MODULAR ARCHITECTURE",
    shortLabel: "SYSTEM DESIGN",
    icon: Layers,
    philosophy: "Clean separation of concerns decouples business rules from persistence and transport.",
    whyItMatters:
      "Maintainable software isolates data validation, domain logic, and persistence into clear architectural tiers with strict interface contracts.",
    inferences: [
      "Layered domain separation prevents database queries from leaking into controllers",
      "Modular monolith architectures preserve transactional simplicity without microservice sprawl",
      "Decoupled IPC adapters isolate external C++ binaries from API web frameworks",
    ],
    evidence: [
      {
        projectId: "finance-one",
        projectName: "Finance One",
        primitive: "5-Tier Layered Architecture",
        description: "Routes &rarr; Controllers &rarr; Domain Services &rarr; Repositories &rarr; Database boundaries isolate Zod validation from Prisma queries.",
      },
      {
        projectId: "virtual2reality",
        projectName: "Virtual2Reality",
        primitive: "6-Tier Modular Monolith",
        description: "Full-stack React 19 + Express 5 + Prisma 7 architecture structured around Developer &rarr; Project &rarr; Media domain boundaries.",
      },
      {
        projectId: "smart-traffic-management-system",
        projectName: "Smart Traffic",
        primitive: "DualSimManager Orchestration",
        description: "Decouples TraCI TCP socket control, PyTorch inference, and FastAPI REST endpoints into clean, modular orchestration services.",
      },
    ],
  },
  {
    id: "controlled-ai",
    name: "CONTROLLED AI & SAFETY BOUNDARIES",
    shortLabel: "CONTROLLED AI",
    icon: Cpu,
    philosophy: "Machine learning models must operate strictly within deterministic safety boundaries.",
    whyItMatters:
      "Autonomous systems and LLMs cannot be given direct database mutation access or unconstrained physical control without rigid guardrails.",
    inferences: [
      "Restrict LLMs to JSON parameter extraction (zero raw text-to-SQL execution)",
      "Enforce semantic confidence gating on vector embeddings (0.70 threshold)",
      "Hardcode deterministic safety and starvation timing invariants around RL agents",
    ],
    evidence: [
      {
        projectId: "finance-one",
        projectName: "Finance One",
        primitive: "Bounded Semantic AI",
        description: "LLM operates purely as a parameter extractor for predefined TypeScript tools; pgvector semantic skill router enforces a 0.70 similarity gate.",
      },
      {
        projectId: "smart-traffic-management-system",
        projectName: "Smart Traffic",
        primitive: "Deterministic Safety Invariants",
        description: "Hard physical constraints (MIN_PHASE_STEPS=10, STARVATION_LIMIT=60) override PyTorch DDQN actions to prevent intersection deadlock.",
      },
    ],
  },
];

export default function TechnicalDNA() {
  const [selectedId, setSelectedId] = useState<string>("correctness");
  const active = PRINCIPLES.find((p) => p.id === selectedId) || PRINCIPLES[0];
  const Icon = active.icon;

  return (
    <section id="technical-dna" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader
        index="04"
        title="Technical DNA & Engineering Principles"
        description="Core engineering decision framework and architectural invariants demonstrated across projects."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Principle Selector Column (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] block mb-1">
            // ENGINEERING PROFILES:
          </span>
          <div className="space-y-2">
            {PRINCIPLES.map((principle, idx) => {
              const isSelected = selectedId === principle.id;
              const PrincipleIcon = principle.icon;

              return (
                <motion.button
                  key={principle.id}
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: idx * 0.06, ease: "easeOut" }}
                  onClick={() => setSelectedId(principle.id)}
                  aria-selected={isSelected}
                  className={`w-full text-left p-3.5 rounded border transition-all duration-150 flex items-center justify-between gap-2 group min-h-[50px] min-w-0 ${
                    isSelected
                      ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(126,231,135,0.1)] ring-1 ring-[var(--color-terminal)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <PrincipleIcon
                      size={15}
                      className={`shrink-0 ${isSelected ? "text-[var(--color-terminal)]" : "text-[var(--color-slate-light)] group-hover:text-[var(--color-slate)]"}`}
                    />
                    <div className="min-w-0">
                      <span className={`text-xs font-mono font-bold block truncate ${
                        isSelected ? "text-[var(--color-terminal)]" : "text-[var(--color-ink)] group-hover:text-[var(--color-terminal)]"
                      }`}>
                        {principle.shortLabel}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono rounded px-1.5 py-0.5 border shrink-0 ${
                    isSelected
                      ? "border-[var(--color-terminal)]/40 bg-[var(--color-terminal-soft)] text-[var(--color-terminal)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate-light)]"
                  }`}>
                    {principle.evidence.length} SYS
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Evidence & Inference Panel (8 cols) */}
        <div className="lg:col-span-8 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6 min-w-0">
          {/* Header & Philosophy Quote */}
          <div className="border-b border-[var(--color-border-subtle)] pb-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Icon size={16} className="text-[var(--color-terminal)] shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-ink)] font-mono break-words">
                  {active.name}
                </h3>
              </div>
              <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 shrink-0">
                {active.evidence.length} SYSTEMS DEMONSTRATED
              </span>
            </div>

            <p className="text-sm font-mono text-[var(--color-terminal)] italic pt-1">
              "{active.philosophy}"
            </p>
            <p className="text-xs text-[var(--color-slate)] leading-relaxed pt-1">
              {active.whyItMatters}
            </p>
          </div>

          {/* Concrete Implementation Evidence Threads */}
          <div className="space-y-3">
            <span className="mono-label text-[10px] text-[var(--color-slate-light)] block">
              // CONCRETE IMPLEMENTATION EVIDENCE THREADS:
            </span>

            <div className="space-y-2.5">
              {active.evidence.map((ev, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded border border-[var(--color-border-subtle)] bg-[#0B0D0F] hover:border-[var(--color-border-bright)] transition-colors space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--color-ink)] font-mono">
                        {ev.projectName}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--color-terminal)] border border-[var(--color-terminal)]/20 bg-[var(--color-terminal-soft)] rounded px-1.5 py-0.5">
                        {ev.primitive}
                      </span>
                    </div>

                    <Link
                      to={`/projects/${ev.projectId}`}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--color-slate)] hover:text-[var(--color-terminal)] transition-colors ml-auto"
                    >
                      <span>View Dossier</span>
                      <ArrowRight size={10} className="text-[var(--color-terminal)]" />
                    </Link>
                  </div>

                  <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Inference Box */}
          <div className="p-3.5 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)] space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-[10px] text-[var(--color-terminal)] font-bold border-b border-[var(--color-border-subtle)] pb-1.5">
              <span className="flex items-center gap-1.5">
                <Terminal size={12} className="text-[var(--color-terminal)]" />
                <span>ARCHITECTURAL INFERENCE</span>
              </span>
              <span className="text-[9px] text-[var(--color-slate-light)]">SYSTEMIC RULE</span>
            </div>

            <div className="space-y-1.5 pt-0.5">
              {active.inferences.map((inf, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-[var(--color-slate)]">
                  <CheckCircle2 size={12} className="text-[var(--color-terminal)] mt-0.5 shrink-0" />
                  <span className="text-[var(--color-ink)] leading-snug">{inf}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
