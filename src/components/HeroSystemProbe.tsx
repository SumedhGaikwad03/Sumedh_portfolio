import { useState, useRef, useEffect, useCallback } from "react";
import { Terminal, Crosshair } from "lucide-react";

export interface SystemNode {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  detail: string;
  tech: string;
  xPct: number; // Percentage 0-100 across container width
  yPct: number; // Percentage 0-100 across container height
  tooltipAlign: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center" | "top-center";
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: "financial",
    name: "NODE::FINANCIAL_CORRECTNESS",
    shortLabel: "FINANCIAL_CORRECTNESS",
    category: "LEDGER_INTEGRITY",
    detail: "Prisma.Decimal & Domain Budget Locking",
    tech: "PostgreSQL • pgvector",
    xPct: 10,
    yPct: 22,
    tooltipAlign: "bottom-left",
  },
  {
    id: "domain",
    name: "NODE::DOMAIN_MODELING",
    shortLabel: "DOMAIN_MODELING",
    category: "RELATIONAL_HIERARCHY",
    detail: "6-Tier Modular Monolith Architecture",
    tech: "Express 5 • Prisma 7",
    xPct: 75,
    yPct: 20,
    tooltipAlign: "bottom-right",
  },
  {
    id: "research",
    name: "NODE::RESEARCH_SYSTEMS",
    shortLabel: "RESEARCH_SYSTEMS",
    category: "CYBER_PHYSICAL",
    detail: "Lockstep Dual SUMO Micro-Simulation",
    tech: "TraCI Sockets • IJIRT Published",
    xPct: 90,
    yPct: 38,
    tooltipAlign: "bottom-right",
  },
  {
    id: "security",
    name: "NODE::SECURITY_BOUNDARIES",
    shortLabel: "SECURITY_BOUNDARIES",
    category: "INGESTION_DEFENSE",
    detail: "DNS Pre-Flight SSRF IP Blacklist",
    tech: "CIDR Filters • Buffer Stream",
    xPct: 88,
    yPct: 78,
    tooltipAlign: "top-right",
  },
  {
    id: "ml",
    name: "NODE::MACHINE_LEARNING",
    shortLabel: "MACHINE_LEARNING",
    category: "REINFORCEMENT_LEARNING",
    detail: "PyTorch DDQN 25-State Controller",
    tech: "Experience Replay • Huber Loss",
    xPct: 52,
    yPct: 82,
    tooltipAlign: "top-center",
  },
  {
    id: "realtime",
    name: "NODE::REAL_TIME_SYNC",
    shortLabel: "REAL_TIME_SYNC",
    category: "CONCURRENCY_STATE",
    detail: "Dual-Channel REST + Socket.io Stream",
    tech: "Multi-Connection Map",
    xPct: 10,
    yPct: 78,
    tooltipAlign: "top-left",
  },
];

// Perimeter framing connections avoiding center typography collision
const PERIMETER_CONNECTIONS: [number, number][] = [
  [0, 1], // Financial (top-left) -> Domain (top-mid-right)
  [1, 2], // Domain (top-mid-right) -> Research (top-right)
  [2, 3], // Research (top-right) -> Security (bottom-right)
  [3, 4], // Security (bottom-right) -> ML (bottom-center)
  [4, 5], // ML (bottom-center) -> Realtime (bottom-left)
  [5, 0], // Realtime (bottom-left) -> Financial (top-left)
];

export default function HeroSystemProbe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [isProbing, setIsProbing] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouchDevice(!finePointer);
    setPrefersReducedMotion(reducedMotion);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || prefersReducedMotion) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    if (!isProbing) setIsProbing(true);

    // Calculate proximity to nodes
    let closestNode: string | null = null;
    let minDistance = 110; // Proximity threshold in pixels

    SYSTEM_NODES.forEach((node) => {
      const nodeX = (node.xPct / 100) * rect.width;
      const nodeY = (node.yPct / 100) * rect.height;
      const dist = Math.hypot(x - nodeX, y - nodeY);

      if (dist < minDistance) {
        minDistance = dist;
        closestNode = node.id;
      }
    });

    setActiveNodeId(closestNode);
  }, [isTouchDevice, prefersReducedMotion, isProbing]);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
    setActiveNodeId(null);
  }, []);

  const getTooltipClasses = (align: SystemNode["tooltipAlign"]) => {
    switch (align) {
      case "bottom-left":
        return "top-full mt-2 left-0 text-left";
      case "bottom-right":
        return "top-full mt-2 right-0 text-right";
      case "bottom-center":
        return "top-full mt-2 left-1/2 -translate-x-1/2 text-center";
      case "top-left":
        return "bottom-full mb-2 left-0 text-left";
      case "top-right":
        return "bottom-full mb-2 right-0 text-right";
      case "top-center":
      default:
        return "bottom-full mb-2 left-1/2 -translate-x-1/2 text-center";
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Background SVG System Schematic Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="probeReticleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-terminal)" stopOpacity="0.2" />
            <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Framing Perimeter Connections */}
        {PERIMETER_CONNECTIONS.map(([srcIdx, dstIdx], idx) => {
          const src = SYSTEM_NODES[srcIdx];
          const dst = SYSTEM_NODES[dstIdx];
          const isConnectedActive = activeNodeId === src.id || activeNodeId === dst.id;

          return (
            <line
              key={`conn-${idx}`}
              x1={`${src.xPct}%`}
              y1={`${src.yPct}%`}
              x2={`${dst.xPct}%`}
              y2={`${dst.yPct}%`}
              stroke={isConnectedActive ? "var(--color-terminal)" : "var(--color-border-bright)"}
              strokeWidth={isConnectedActive ? 1.5 : 1}
              strokeDasharray={isConnectedActive ? "4 3" : "2 6"}
              className="transition-all duration-300"
              opacity={isConnectedActive ? 0.75 : 0.22}
            />
          );
        })}

        {/* Ambient Crosshair Grid References */}
        <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="1 10" opacity="0.25" />
        <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="1 10" opacity="0.25" />
      </svg>

      {/* Desktop Pointer Radar Reticle */}
      {!isTouchDevice && !prefersReducedMotion && mousePos && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        >
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[var(--color-terminal)]/30 animate-ping opacity-20" />
            <div className="absolute inset-2 rounded-full border border-[var(--color-accent)]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-terminal)] shadow-[0_0_8px_var(--color-terminal)]" />
            <div className="absolute top-0 bottom-0 w-px bg-[var(--color-terminal)]/25" />
            <div className="absolute left-0 right-0 h-px bg-[var(--color-terminal)]/25" />
          </div>
        </div>
      )}

      {/* Interactive Node Anchors (Visible on Tablet & Desktop) */}
      <div className="absolute inset-0 hidden sm:block">
        {SYSTEM_NODES.map((node) => {
          const isActive = activeNodeId === node.id;
          return (
            <div
              key={node.id}
              style={{
                left: `${node.xPct}%`,
                top: `${node.yPct}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
            >
              <button
                type="button"
                onClick={() => setActiveNodeId(isActive ? null : node.id)}
                onFocus={() => setActiveNodeId(node.id)}
                onBlur={() => setActiveNodeId(null)}
                aria-label={`${node.name}: ${node.detail}`}
                className={`group relative flex items-center justify-center p-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-terminal)] ${
                  isActive ? "scale-110" : "scale-90 hover:scale-100"
                }`}
              >
                {/* Node Center Dot */}
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-terminal)] ring-4 ring-[var(--color-terminal-soft)] shadow-[0_0_10px_var(--color-terminal)]"
                      : "bg-[var(--color-slate-light)]/70 group-hover:bg-[var(--color-accent)]"
                  }`}
                />

                {/* Node Static Monospace Tag (Subtle when inactive) */}
                <span
                  className={`absolute top-full mt-1 whitespace-nowrap font-mono text-[9px] transition-all duration-200 ${
                    isActive
                      ? "text-[var(--color-terminal)] font-bold opacity-100"
                      : "text-[var(--color-slate-light)] opacity-40 group-hover:opacity-80"
                  }`}
                >
                  {node.shortLabel}
                </span>

                {/* Dynamic Boundary-Clamped Tooltip */}
                {isActive && (
                  <div
                    className={`absolute z-30 w-52 max-w-[calc(100vw-3rem)] p-2.5 rounded border border-[var(--color-terminal)]/50 bg-[#0B0D0F]/95 backdrop-blur-md shadow-2xl font-mono text-[10px] space-y-0.5 pointer-events-none animate-in fade-in duration-150 ${getTooltipClasses(
                      node.tooltipAlign
                    )}`}
                  >
                    <div className="flex items-center justify-between text-[var(--color-terminal)] font-bold">
                      <span className="truncate">{node.category}</span>
                      <span className="text-[9px] text-[var(--color-slate-light)] shrink-0 ml-1">VERIFIED</span>
                    </div>
                    <p className="text-[var(--color-ink)] font-semibold leading-tight text-left">
                      {node.detail}
                    </p>
                    <span className="text-[9px] text-[var(--color-slate)] block text-left">
                      {node.tech}
                    </span>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HeroProbeStatusRibbon({ activeNodeName }: { activeNodeName?: string | null }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] pb-2 text-xs font-mono">
      <div className="flex items-center gap-2 text-[var(--color-slate)] truncate">
        <Crosshair size={13} className="text-[var(--color-terminal)] shrink-0" />
        <span className="text-[10px] text-[var(--color-slate-light)] hidden sm:inline">PROBE_STATUS:</span>
        {activeNodeName ? (
          <span className="text-[11px] text-[var(--color-terminal)] font-bold truncate">
            {activeNodeName}
          </span>
        ) : (
          <span className="text-[11px] text-[var(--color-slate)] truncate">
            SYSTEM_PROBE::ACTIVE // 6 VERIFIED ARCHITECTURAL NODES
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-slate-light)] shrink-0">
        <Terminal size={11} className="text-[var(--color-terminal)]" />
        <span className="hidden md:inline">SYSTEM_GRID::ACTIVE</span>
      </div>
    </div>
  );
}
