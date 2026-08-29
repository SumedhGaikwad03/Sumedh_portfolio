import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Shield, Zap, Database, Cpu, GitFork, CheckCircle2 } from "lucide-react";
import SectionHeader from "./SectionHeader";

export interface DomainNode {
  id: string;
  name: string;
  shortName: string;
  icon: typeof Layers;
  description: string;
  connectedProjects: string[];
  projectThreads: {
    projectId: string;
    projectName: string;
    implementation: string;
  }[];
}

export interface ProjectNode {
  id: string;
  name: string;
  slug: string;
  badge: string;
  category: string;
  oneLiner: string;
  domains: string[];
  evidence: string[];
}

const DOMAINS: DomainNode[] = [
  {
    id: "system-design",
    name: "System Design & Architecture",
    shortName: "SYSTEM_DESIGN",
    icon: Layers,
    description: "Layered architectures, multi-tenant boundaries, and micro-simulation concurrency.",
    connectedProjects: ["finance-one", "atrio", "virtual2reality", "smart-traffic-management-system"],
    projectThreads: [
      { projectId: "finance-one", projectName: "Finance One", implementation: "5-tier layered REST backend isolating business invariants from data persistence." },
      { projectId: "atrio", projectName: "Atrio", implementation: "Dual-channel architecture decoupling stateless HTTP mutations from stateful WebSocket presence." },
      { projectId: "virtual2reality", projectName: "Virtual2Reality", implementation: "6-tier domain-driven monolith with clear multi-stage publication boundaries." },
      { projectId: "smart-traffic-management-system", projectName: "STMS", implementation: "Dual-instance parallel SUMO micro-simulation synchronized via TraCI TCP sockets." },
    ],
  },
  {
    id: "data-integrity",
    name: "Data & Financial Integrity",
    shortName: "DATA_INTEGRITY",
    icon: Database,
    description: "Paise/Decimal precision, locked transaction ledgers, and zero IEEE-754 roundoff errors.",
    connectedProjects: ["finance-one", "virtual2reality", "smart-traffic-management-system"],
    projectThreads: [
      { projectId: "finance-one", projectName: "Finance One", implementation: "Prisma.Decimal across all budget allocations preventing floating-point drift." },
      { projectId: "virtual2reality", projectName: "Virtual2Reality", implementation: "BigInt 64-bit integer normalizer storing real-estate values in paise." },
      { projectId: "smart-traffic-management-system", projectName: "STMS", implementation: "Step-synchronized dual simulation eliminating vehicle arrival variance." },
    ],
  },
  {
    id: "realtime-concurrency",
    name: "Real-Time & Concurrency",
    shortName: "REAL_TIME_CONCURRENCY",
    icon: Zap,
    description: "Low-latency bidirectional streaming, multi-socket mapping, and lockstep synchronization.",
    connectedProjects: ["atrio", "smart-traffic-management-system"],
    projectThreads: [
      { projectId: "atrio", projectName: "Atrio", implementation: "In-memory Map<roomId, Map<userId, socketCount>> eliminating multi-tab presence flapping." },
      { projectId: "smart-traffic-management-system", projectName: "STMS", implementation: "0.1s step-locked parallel execution across Ports 8813 (Baseline) and 8814 (RL)." },
    ],
  },
  {
    id: "security-boundaries",
    name: "Security & Ingestion Defense",
    shortName: "SECURITY_BOUNDARIES",
    icon: Shield,
    description: "DNS pre-flight SSRF protection, anti-enumeration scoping, and stateless JWT revocation.",
    connectedProjects: ["finance-one", "atrio", "virtual2reality"],
    projectThreads: [
      { projectId: "finance-one", projectName: "Finance One", implementation: "Row-level tenant isolation returning 404 on mismatched ownership (anti-enumeration)." },
      { projectId: "atrio", projectName: "Atrio", implementation: "Stateless session revocation via passwordChangedAt JWT timestamp verification." },
      { projectId: "virtual2reality", projectName: "Virtual2Reality", implementation: "DNS pre-flight IP validator blocking RFC 1918 private subnets before HTTP fetch." },
    ],
  },
  {
    id: "domain-modeling",
    name: "Domain Modeling & Invariants",
    shortName: "DOMAIN_MODELING",
    icon: GitFork,
    description: "Deterministic business rules, budget locking invariants, and relational hierarchies.",
    connectedProjects: ["finance-one", "virtual2reality"],
    projectThreads: [
      { projectId: "finance-one", projectName: "Finance One", implementation: "BudgetLockedError prevents post-closing mutations; temporal period overlap protection." },
      { projectId: "virtual2reality", projectName: "Virtual2Reality", implementation: "Developer → Project → Configuration → Media / Lead cascade schema hierarchy." },
    ],
  },
  {
    id: "machine-learning",
    name: "Machine Learning & Simulation",
    shortName: "MACHINE_LEARNING",
    icon: Cpu,
    description: "Deep reinforcement learning, 25-state vectors, and empirical transportation research.",
    connectedProjects: ["smart-traffic-management-system", "finance-one"],
    projectThreads: [
      { projectId: "smart-traffic-management-system", projectName: "STMS", implementation: "PyTorch 25-state DDQN agent with physical timing invariants (MIN/MAX phase hold)." },
      { projectId: "finance-one", projectName: "Finance One", implementation: "PostgreSQL pgvector high-dimensional embeddings with 0.70 semantic confidence gating." },
    ],
  },
];

const PROJECTS: ProjectNode[] = [
  {
    id: "finance-one",
    name: "Finance One",
    slug: "finance-one",
    badge: "MVP_1_READY",
    category: "DOMAIN::FINANCIAL_LEDGER",
    oneLiner: "Financial ledger engineered for transactional correctness and bounded semantic AI.",
    domains: ["system-design", "data-integrity", "security-boundaries", "domain-modeling", "machine-learning"],
    evidence: [
      "Prisma.Decimal prevents IEEE-754 roundoff errors",
      "BudgetLockedError domain invariant enforcement",
      "pgvector 0.70 confidence gating (zero raw SQL)",
      "Multi-tenant anti-enumeration (404 on ownership mismatch)",
    ],
  },
  {
    id: "atrio",
    name: "Atrio",
    slug: "atrio",
    badge: "DEPLOYED_BETA",
    category: "DOMAIN::REAL_TIME_COLLAB",
    oneLiner: "Real-time collaboration workspace with dual-channel synchronization and presence.",
    domains: ["system-design", "realtime-concurrency", "security-boundaries"],
    evidence: [
      "Stateless REST API + In-process Socket.io stream",
      "In-memory socket-count map eliminates presence flicker",
      "Stateless JWT revocation via passwordChangedAt",
      "Mongoose cascading pre-remove middleware hooks",
    ],
  },
  {
    id: "virtual2reality",
    name: "Virtual2Reality",
    slug: "virtual2reality",
    badge: "CLIENT_DELIVERY",
    category: "DOMAIN::COMMERCIAL_SECURITY",
    oneLiner: "Real-estate discovery monolith with paise precision and SSRF ingestion defense.",
    domains: ["system-design", "data-integrity", "security-boundaries", "domain-modeling"],
    evidence: [
      "BigInt 64-bit integer paise currency engine",
      "DNS pre-flight validation blocking RFC 1918 private subnets",
      "6-tier modular monolith (React 19 + Express 5 + Prisma 7)",
      "Strict publication status boundaries (Draft / Active / Archived)",
    ],
  },
  {
    id: "smart-traffic-management-system",
    name: "Smart Traffic Management System",
    slug: "smart-traffic-management-system",
    badge: "PEER_REVIEWED_RESEARCH",
    category: "DOMAIN::CYBER_PHYSICAL_RL",
    oneLiner: "Deep Q-Network traffic control research with lockstep dual micro-simulation.",
    domains: ["system-design", "data-integrity", "realtime-concurrency", "machine-learning"],
    evidence: [
      "Dual SUMO micro-simulation (Port 8813 vs 8814 lockstep)",
      "PyTorch 25-dimensional DDQN agent with experience replay",
      "Safety timing invariants (MIN=10s, MAX=45s, STARVATION=60s)",
      "FHWA NGSIM US-101 empirical calibration (-23.2% wait reduction)",
    ],
  },
];

export default function SystemsMap() {
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>("security-boundaries");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const activeDomain = DOMAINS.find((d) => d.id === selectedDomainId);
  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId);

  const handleDomainSelect = (id: string) => {
    setSelectedDomainId((prev) => (prev === id ? null : id));
    setSelectedProjectId(null);
  };

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId((prev) => (prev === id ? null : id));
    setSelectedDomainId(null);
  };

  return (
    <section id="systems-map" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader
        index="03"
        title="Systems Architecture Map"
        description="Interactive capability graph mapping engineering domains and cross-project architectural threads."
      />

      <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
        {/* Top Control Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-subtle)] pb-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-terminal)] font-bold">// ARCHITECTURE_GRAPH</span>
            <span className="text-[var(--color-slate-light)] hidden sm:inline">&bull;</span>
            <span className="text-[var(--color-slate)] hidden sm:inline">04 SYSTEMS &bull; 06 CAPABILITY DOMAINS</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedDomainId(null);
                setSelectedProjectId(null);
              }}
              className={`px-2.5 py-1 rounded border text-[11px] font-mono transition-colors ${
                !selectedDomainId && !selectedProjectId
                  ? "border-[var(--color-terminal)] bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] font-bold"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
              }`}
            >
              [ RESET VIEW ]
            </button>
          </div>
        </div>

        {/* Domain Selection Matrix (Top Tier) */}
        <div>
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] block mb-2.5">
            01 // SELECT ENGINEERING CAPABILITY DOMAIN:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {DOMAINS.map((domain, idx) => {
              const isSelected = selectedDomainId === domain.id;
              const isConnectedToActiveProject = activeProject?.domains.includes(domain.id);
              const Icon = domain.icon;

              return (
                <motion.button
                  key={domain.id}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: idx * 0.05, ease: "easeOut" }}
                  onClick={() => handleDomainSelect(domain.id)}
                  className={`p-3 rounded border text-left transition-all duration-150 flex flex-col justify-between group min-h-[96px] min-w-0 ${
                    isSelected
                      ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(126,231,135,0.12)] ring-1 ring-[var(--color-terminal)]"
                      : isConnectedToActiveProject
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <Icon
                      size={14}
                      className={isSelected ? "text-[var(--color-terminal)]" : isConnectedToActiveProject ? "text-[var(--color-accent)]" : "text-[var(--color-slate-light)] group-hover:text-[var(--color-slate)]"}
                    />
                    <span className="text-[9px] font-mono text-[var(--color-slate-light)] shrink-0">
                      {domain.connectedProjects.length} SYS
                    </span>
                  </div>
                  <div className="min-w-0 w-full">
                    <span className={`text-[10px] sm:text-[11px] font-mono font-bold block leading-tight break-words ${
                      isSelected ? "text-[var(--color-terminal)]" : "text-[var(--color-ink)] group-hover:text-[var(--color-terminal)]"
                    }`}>
                      {domain.shortName}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Interactive Schematic Threads (Middle Visual Tier) */}
        <div className="rounded border border-[var(--color-border-subtle)] bg-[#0B0D0F] p-4 sm:p-5 relative overflow-hidden">
          {/* Active Domain Thread View */}
          {activeDomain ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-start sm:items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-2.5">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[var(--color-terminal)] block font-semibold">
                    THREAD EXPLORER // {activeDomain.name.toUpperCase()}
                  </span>
                  <p className="text-xs text-[var(--color-slate)] mt-0.5 leading-relaxed">
                    {activeDomain.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] rounded px-2 py-0.5 shrink-0">
                  CROSS-PROJECT EVIDENCE
                </span>
              </div>

              {/* Connected project thread cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {activeDomain.projectThreads.map((thread) => (
                  <div
                    key={thread.projectId}
                    className="p-3.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col justify-between min-w-0"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-xs font-bold text-[var(--color-terminal)] truncate">
                          {thread.projectName}
                        </span>
                        <span className="text-[9px] font-mono text-[var(--color-slate-light)] shrink-0">
                          VERIFIED
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                        {thread.implementation}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex justify-end">
                      <Link
                        to={`/projects/${thread.projectId}`}
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--color-ink)] hover:text-[var(--color-terminal)] transition-colors"
                      >
                        <span>Inspect Dossier</span>
                        <ArrowRight size={11} className="text-[var(--color-terminal)]" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeProject ? (
            /* Active Project Subsystem View */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-start sm:items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-2.5">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[var(--color-accent)] block font-semibold">
                    PROJECT ARCHITECTURE // {activeProject.name.toUpperCase()}
                  </span>
                  <p className="text-xs text-[var(--color-slate)] mt-0.5 leading-relaxed">
                    {activeProject.oneLiner}
                  </p>
                </div>
                <span className="text-[10px] font-mono border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] rounded px-2 py-0.5 shrink-0">
                  [{activeProject.badge}]
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[var(--color-slate-light)] block mb-2 font-semibold">
                  // VERIFIED ARCHITECTURAL INVARIANTS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.evidence.map((ev, i) => (
                    <div key={i} className="p-2.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] flex items-start gap-2 text-xs min-w-0">
                      <CheckCircle2 size={13} className="text-[var(--color-terminal)] shrink-0 mt-0.5" />
                      <span className="text-[var(--color-ink)] font-mono text-[11px] leading-relaxed break-words">{ev}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  to={`/projects/${activeProject.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-[var(--color-terminal)] bg-[var(--color-terminal)] text-[#0B0D0F] font-mono text-xs font-bold hover:bg-[var(--color-terminal)]/90 transition-colors"
                >
                  <span>VIEW FULL ENGINEERING DOSSIER</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ) : (
            /* Ambient Overview when nothing selected */
            <div className="py-6 text-center space-y-2">
              <p className="font-mono text-xs text-[var(--color-slate)]">
                &gt; SELECT AN ENGINEERING CAPABILITY ABOVE OR A PROJECT SUBSYSTEM BELOW TO TRACE ARCHITECTURAL THREADS.
              </p>
              <span className="text-[11px] font-mono text-[var(--color-terminal)] block">
                [ 4 REPOSITORIES &bull; FULL CROSS-DISCIPLINARY COHERENCE ]
              </span>
            </div>
          )}
        </div>

        {/* Project Nodes Matrix (Bottom Tier) */}
        <div>
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] block mb-2.5 font-semibold">
            02 // SELECT PROJECT SUBSYSTEM TO REVEAL CAPABILITIES:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PROJECTS.map((proj) => {
              const isSelected = selectedProjectId === proj.id;
              const isConnectedToActiveDomain = activeDomain?.connectedProjects.includes(proj.id);

              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => handleProjectSelect(proj.id)}
                  className={`p-4 rounded border text-left transition-all duration-150 flex flex-col justify-between group min-w-0 ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(122,162,247,0.15)] ring-1 ring-[var(--color-accent)]"
                      : isConnectedToActiveDomain
                      ? "border-[var(--color-terminal)] bg-[var(--color-terminal-soft)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
                  }`}
                >
                  <div className="min-w-0 w-full">
                    {/* Layered Metadata & Badge Row */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                      <span className="text-[10px] font-mono text-[var(--color-slate-light)] truncate max-w-[140px] sm:max-w-none">
                        {proj.category}
                      </span>
                      <span className={`text-[9px] font-mono rounded px-1.5 py-0.5 border shrink-0 ${
                        isConnectedToActiveDomain
                          ? "border-[var(--color-terminal)] text-[var(--color-terminal)] bg-[#0B0D0F]"
                          : "border-[var(--color-border)] text-[var(--color-slate-light)]"
                      }`}>
                        [{proj.badge}]
                      </span>
                    </div>

                    <h4 className={`text-sm sm:text-base font-bold tracking-tight mb-1.5 break-words leading-snug ${
                      isSelected ? "text-[var(--color-accent)]" : isConnectedToActiveDomain ? "text-[var(--color-terminal)]" : "text-[var(--color-ink)] group-hover:text-[var(--color-terminal)]"
                    }`}>
                      {proj.name}
                    </h4>

                    <p className="text-xs text-[var(--color-slate)] line-clamp-2 leading-relaxed">
                      {proj.oneLiner}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--color-slate-light)] w-full">
                    <span>{proj.domains.length} DOMAINS</span>
                    <span className="text-[var(--color-terminal)] group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
