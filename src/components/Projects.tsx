import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight, Cpu, ChevronDown, ChevronUp, Zap } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { projects, type Project } from "../data/content";
import { PROJECT_EVIDENCE } from "../data/projectEvidence";
import FinanceIntegrityProbe from "./finance-one/FinanceIntegrityProbe";
import AtrioPresenceProbe from "./atrio/AtrioPresenceProbe";
import SSRFDefenseProbe from "./virtual2reality/SSRFDefenseProbe";
import SimulationSyncProbe from "./smart-traffic/SimulationSyncProbe";
import { useViewMode } from "../context/useViewMode";

type CategoryFilter = "ALL" | "FINANCIAL" | "REALTIME" | "SECURITY" | "RESEARCH";

interface FilterOption {
  id: CategoryFilter;
  label: string;
  count: number;
}

interface TelemetryFragment {
  text: string;
  top: string;
  left?: string;
  right?: string;
  depth: number;
  isPrimary?: boolean;
}

const PROJECT_TELEMETRY: Record<string, TelemetryFragment[]> = {
  "finance-one": [
    { text: "01 01 01", top: "10%", right: "8%", depth: 1.0 },
    { text: "// TRACE::LEDGER", top: "18%", right: "3%", depth: 1.8, isPrimary: true },
    { text: "110010", top: "48%", right: "5%", depth: 0.8 },
    { text: "010", top: "82%", left: "12%", depth: 1.5, isPrimary: true },
    { text: "001011", top: "78%", right: "12%", depth: 0.9 },
    { text: "// SYSTEM::ACTIVE", top: "86%", right: "4%", depth: 2.0, isPrimary: true },
  ],
  atrio: [
    { text: "10 10 10", top: "10%", right: "8%", depth: 1.0 },
    { text: "// TRACE::SOCKET", top: "18%", right: "3%", depth: 1.8, isPrimary: true },
    { text: "001101", top: "48%", right: "5%", depth: 0.8 },
    { text: "101", top: "82%", left: "12%", depth: 1.5, isPrimary: true },
    { text: "010011", top: "78%", right: "12%", depth: 0.9 },
    { text: "// SYSTEM::ACTIVE", top: "86%", right: "4%", depth: 2.0, isPrimary: true },
  ],
  virtual2reality: [
    { text: "01 01 10", top: "10%", right: "8%", depth: 1.0 },
    { text: "// TRACE::DNS_SSRF", top: "18%", right: "3%", depth: 1.8, isPrimary: true },
    { text: "111000", top: "48%", right: "5%", depth: 0.8 },
    { text: "010", top: "82%", left: "12%", depth: 1.5, isPrimary: true },
    { text: "100101", top: "78%", right: "12%", depth: 0.9 },
    { text: "// SYSTEM::ACTIVE", top: "86%", right: "4%", depth: 2.0, isPrimary: true },
  ],
  "smart-traffic-management-system": [
    { text: "00 11 10", top: "10%", right: "8%", depth: 1.0 },
    { text: "// TRACE::TRACI_CLOCK", top: "18%", right: "3%", depth: 1.8, isPrimary: true },
    { text: "011010", top: "48%", right: "5%", depth: 0.8 },
    { text: "101", top: "82%", left: "12%", depth: 1.5, isPrimary: true },
    { text: "101101", top: "78%", right: "12%", depth: 0.9 },
    { text: "// SYSTEM::ACTIVE", top: "86%", right: "4%", depth: 2.0, isPrimary: true },
  ],
};

function getProjectBadge(slug: string, isPlaceholder?: boolean) {
  if (slug === "finance-one") return "MVP_1_READY";
  if (isPlaceholder) return "IN_PROGRESS";
  if (slug === "smart-traffic-management-system") return "PEER_REVIEWED_RESEARCH";
  if (slug === "virtual2reality") return "CLIENT_DELIVERY";
  if (slug === "atrio") return "DEPLOYED_BETA";
  return "FEATURED_SYSTEM";
}

function getDomainTag(slug: string) {
  if (slug === "finance-one") return "DOMAIN::FINANCIAL_LEDGER";
  if (slug === "atrio") return "DOMAIN::REAL_TIME_COLLAB";
  if (slug === "virtual2reality") return "DOMAIN::COMMERCIAL_SECURITY";
  if (slug === "smart-traffic-management-system") return "DOMAIN::CYBER_PHYSICAL_RL";
  return "DOMAIN::SYSTEMS";
}

function matchesCategory(slug: string, filter: CategoryFilter): boolean {
  if (filter === "ALL") return true;
  if (filter === "FINANCIAL" && slug === "finance-one") return true;
  if (filter === "REALTIME" && slug === "atrio") return true;
  if (filter === "SECURITY" && slug === "virtual2reality") return true;
  if (filter === "RESEARCH" && slug === "smart-traffic-management-system") return true;
  return false;
}

function ProjectCardTelemetry({
  slug,
  isHovered,
  mousePos,
}: {
  slug: string;
  isHovered: boolean;
  mousePos: { x: number; y: number };
}) {
  const fragments = PROJECT_TELEMETRY[slug] || [
    { text: "010101", top: "15%", right: "8%", depth: 1.0 },
    { text: "101010", top: "75%", right: "12%", depth: 1.2 },
    { text: "SYSTEM", top: "85%", left: "15%", depth: 1.5, isPrimary: true },
  ];

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 transition-opacity duration-200 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
    >
      {fragments.map((frag, i) => {
        const offsetX = mousePos.x * frag.depth * 3;
        const offsetY = mousePos.y * frag.depth * 2;

        return (
          <span
            key={i}
            style={{
              top: frag.top,
              left: frag.left,
              right: frag.right,
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
            }}
            className={`absolute font-mono text-[9px] tracking-wider transition-transform duration-75 ease-out select-none ${
              frag.isPrimary
                ? "text-[var(--color-terminal)]/30 font-bold"
                : "text-[var(--color-slate-light)]/20 font-normal"
            }`}
          >
            {frag.text}
          </span>
        );
      })}
    </div>
  );
}

function ProjectCardItem({
  p,
  idx,
  mode,
  isExpanded,
  toggleProbe,
}: {
  p: Project;
  idx: number;
  mode: string;
  isExpanded: boolean;
  toggleProbe: (slug: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [supportsHover, setSupportsHover] = useState(false);

  const evidence = PROJECT_EVIDENCE[p.slug];

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSupportsHover(canHover && !reducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!supportsHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const num = String(idx + 1).padStart(2, "0");
  const badge = getProjectBadge(p.slug, p.placeholder);
  const domain = getDomainTag(p.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      data-cursor="project"
      className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 flex flex-col hover:border-[var(--color-border-bright)] hover:bg-[var(--color-surface-elevated)] transition-all duration-200 group relative overflow-hidden"
    >
      {/* Subtle Cursor-Reactive Background Telemetry Overlay */}
      {supportsHover && (
        <ProjectCardTelemetry
          slug={p.slug}
          isHovered={isHovered}
          mousePos={mousePos}
        />
      )}

      {/* Card Content Layer */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top metadata strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 mb-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-[var(--color-terminal)] font-bold shrink-0">{num} //</span>
            <span className="text-[var(--color-slate-light)]">repo:sumedh/{p.slug}</span>
            {mode === "ENGINEERING" && (
              <span className="text-[var(--color-terminal)] text-[11px] font-semibold hidden sm:inline-block border-l border-[var(--color-border-subtle)] pl-2">
                {domain}
              </span>
            )}
          </div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 shrink-0">
            [{badge}]
          </span>
        </div>

        {/* Title and one-liner */}
        <div className="mb-4">
          <Link
            to={`/projects/${p.slug}`}
            className="inline-block group-hover:text-[var(--color-terminal)] transition-colors"
          >
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink)] flex items-center gap-2 break-words">
              <span>{p.name}</span>
              <ArrowRight
                size={18}
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--color-terminal)] hidden sm:inline-block shrink-0"
              />
            </h3>
          </Link>
          <p className="text-sm sm:text-base text-[var(--color-slate)] mt-2 leading-relaxed max-w-3xl">
            {p.oneLiner}
          </p>
        </div>

        {/* STANDARD MODE: Problem / Solution / Verified Metric Card */}
        {mode === "STANDARD" && evidence && (
          <div className="mb-5 space-y-3">
            <div className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/80 p-3.5 text-xs font-mono space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="text-[10px] text-[var(--color-terminal)] font-bold shrink-0 sm:w-20">
                  PROBLEM:
                </span>
                <span className="text-[var(--color-slate)] leading-relaxed">
                  {evidence.standardProof.problemBrief}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="text-[10px] text-[var(--color-accent)] font-bold shrink-0 sm:w-20">
                  SOLUTION:
                </span>
                <span className="text-[var(--color-ink)] leading-relaxed font-medium">
                  {evidence.standardProof.solutionBrief}
                </span>
              </div>
            </div>

            {/* Key Verified Result Metric */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-3.5 py-2 rounded border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]/50 text-xs font-mono">
              <Zap size={13} className="text-[var(--color-terminal)] shrink-0" />
              <span className="text-[var(--color-terminal)] font-bold">
                {evidence.standardProof.keyMetric.value}
              </span>
              <span className="text-[var(--color-slate-light)] hidden sm:inline">&bull;</span>
              <span className="text-[var(--color-slate)] text-[11px]">
                {evidence.standardProof.keyMetric.label}
              </span>
            </div>
          </div>
        )}

        {/* ENGINEERING MODE: Deep Architectural Dossier Table */}
        {mode === "ENGINEERING" && evidence && (
          <div className="mb-5 p-4 rounded border border-[var(--color-terminal)]/35 bg-[#0B0D0F] font-mono text-xs space-y-2.5 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-1.5 text-[10px] text-[var(--color-terminal)] font-bold border-b border-[var(--color-border-subtle)] pb-1.5">
              <span className="flex items-center gap-1.5">
                <Cpu size={12} className="text-[var(--color-terminal)]" />
                <span>// ENGINEERING DOSSIER & INVARIANT SPECS</span>
              </span>
              <span className="text-[var(--color-accent)]">SPEC::VERIFIED</span>
            </div>

            <div className="space-y-2.5 text-[11px] leading-relaxed">
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="text-[10px] text-[var(--color-terminal)] font-bold shrink-0 sm:w-28">
                  // MODEL:
                </span>
                <span className="text-[var(--color-ink)] font-medium">
                  {evidence.engineeringSpecs.systemModel}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="text-[10px] text-[var(--color-terminal)] font-bold shrink-0 sm:w-28">
                  // INVARIANT:
                </span>
                <span className="text-[var(--color-ink)]">
                  {evidence.engineeringSpecs.invariant}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="text-[10px] text-[var(--color-accent)] font-bold shrink-0 sm:w-28">
                  // SECURITY:
                </span>
                <span className="text-[var(--color-slate)]">
                  {evidence.engineeringSpecs.securityBoundary}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="text-[10px] text-[var(--color-slate-light)] font-bold shrink-0 sm:w-28">
                  // CONCURRENCY:
                </span>
                <span className="text-[var(--color-slate)]">
                  {evidence.engineeringSpecs.concurrencyState}
                </span>
              </div>
              {evidence.engineeringSpecs.aiBoundary && (
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="text-[10px] text-[var(--color-terminal)] font-bold shrink-0 sm:w-28">
                    // AI BOUNDARY:
                  </span>
                  <span className="text-[var(--color-slate)]">
                    {evidence.engineeringSpecs.aiBoundary}
                  </span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 pt-1 border-t border-[var(--color-border-subtle)]">
                <span className="text-[10px] text-[var(--color-terminal)] font-bold shrink-0 sm:w-28">
                  // EVIDENCE:
                </span>
                <span className="text-[var(--color-ink)] text-[10px]">
                  {evidence.engineeringSpecs.implementationEvidence}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Technologies strip */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] mr-1 hidden sm:inline">
            STACK:
          </span>
          {p.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono text-[var(--color-slate)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Signature Interactive System Inspector Drawer */}
        {isExpanded && (
          <div className="my-4 pt-2 border-t border-[var(--color-border)] animate-in fade-in slide-in-from-top-1 duration-200">
            {p.slug === "finance-one" && <FinanceIntegrityProbe />}
            {p.slug === "atrio" && <AtrioPresenceProbe />}
            {p.slug === "virtual2reality" && <SSRFDefenseProbe />}
            {p.slug === "smart-traffic-management-system" && <SimulationSyncProbe />}
          </div>
        )}

        {/* Bottom action controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono pt-4 border-t border-[var(--color-border-subtle)] mt-auto">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Inline signature probe toggle button */}
            <button
              type="button"
              onClick={() => toggleProbe(p.slug)}
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-colors border ${
                isExpanded
                  ? "border-[var(--color-terminal)] bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] font-bold"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-terminal)]"
              }`}
            >
              <Cpu size={12} className="text-[var(--color-terminal)]" />
              <span>{isExpanded ? "HIDE INTERACTIVE PROBE" : "INSPECT SYSTEM PIPELINE"}</span>
              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor="external"
                className="inline-flex items-center gap-1.5 text-[var(--color-terminal)] hover:underline transition-all font-medium"
              >
                <ExternalLink size={12} />
                <span>Live Demo</span>
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="external"
                className="inline-flex items-center gap-1.5 text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors"
              >
                <Github size={12} />
                <span>GitHub</span>
              </a>
            )}
          </div>

          <Link
            to={`/projects/${p.slug}`}
            className="inline-flex items-center gap-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-mono font-medium text-[var(--color-ink)] hover:border-[var(--color-terminal)] hover:text-[var(--color-terminal)] transition-colors group-hover:border-[var(--color-terminal)]/60 ml-auto"
          >
            <span>VIEW FULL CASE STUDY</span>
            <ArrowRight
              size={13}
              className="text-[var(--color-terminal)] group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { mode } = useViewMode();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("ALL");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const filterOptions: FilterOption[] = [
    { id: "ALL", label: "ALL", count: projects.length },
    { id: "FINANCIAL", label: "FINANCIAL SYSTEMS", count: 1 },
    { id: "REALTIME", label: "REAL-TIME", count: 1 },
    { id: "SECURITY", label: "SECURITY & DOMAIN", count: 1 },
    { id: "RESEARCH", label: "ML & RESEARCH", count: 1 },
  ];

  const filteredProjects = projects.filter((p) => matchesCategory(p.slug, activeFilter));

  const toggleProbe = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader
        index={mode === "ENGINEERING" ? "05" : "02"}
        title="Selected Work"
        description={
          mode === "ENGINEERING"
            ? "Deep architectural dossiers, invariant specifications, and verified implementation evidence."
            : "Curated software systems, distributed real-time architectures, and machine learning research."
        }
      />

      {/* Lightweight Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 border-b border-[var(--color-border-subtle)]">
        <span className="mono-label text-[10px] text-[var(--color-slate-light)] mr-1 hidden sm:inline">
          FILTER:
        </span>
        {filterOptions.map((opt) => {
          const isSelected = activeFilter === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setActiveFilter(opt.id)}
              className={`text-xs font-mono px-3 py-1.5 rounded border transition-all duration-150 flex items-center gap-1.5 ${
                isSelected
                  ? "border-[var(--color-terminal)] bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] font-bold shadow-[0_0_10px_rgba(126,231,135,0.1)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:border-[var(--color-border-bright)] hover:text-[var(--color-ink)]"
              }`}
            >
              <span>[ {opt.label} ]</span>
              <span className="text-[10px] opacity-70">({opt.count})</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {filteredProjects.map((p, idx) => (
          <ProjectCardItem
            key={p.slug}
            p={p}
            idx={idx}
            mode={mode}
            isExpanded={expandedSlug === p.slug}
            toggleProbe={toggleProbe}
          />
        ))}
      </div>
    </section>
  );
}
