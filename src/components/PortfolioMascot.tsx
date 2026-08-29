import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, Cpu, X } from "lucide-react";
import { MASCOT_TIPS, type MascotTip, type MascotActionType } from "../data/mascotTips";
import { useViewMode } from "../context/useViewMode";

type MascotState = "idle" | "wandering" | "inspecting" | "acknowledged";

interface Waypoint {
  x: number; // Percentage across viewport width (safe margin zone: 2-12% or 85-95%)
  y: number; // Percentage across viewport height (safe bottom zone: 78-92%)
}

// Safe perimeter margin waypoints avoiding central content
const SAFE_WAYPOINTS: Waypoint[] = [
  { x: 92, y: 88 },
  { x: 86, y: 84 },
  { x: 94, y: 78 },
  { x: 88, y: 92 },
  { x: 90, y: 82 },
  { x: 8, y: 88 },
  { x: 12, y: 82 },
  { x: 6, y: 84 },
];

export default function PortfolioMascot() {
  const { mode, setMode } = useViewMode();
  const [waypoint, setWaypoint] = useState<Waypoint>(SAFE_WAYPOINTS[0]);
  const [mascotState, setMascotState] = useState<MascotState>("idle");
  const [currentTip, setCurrentTip] = useState<MascotTip | null>(null);
  const [tipIndex, setTipIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const dismissTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouchDevice(!finePointer);
    setPrefersReducedMotion(reducedMotion);
  }, []);

  // Filter available tips based on current view mode
  const getEligibleTips = useCallback(() => {
    return MASCOT_TIPS.filter(
      (t) => t.availableWhen === "ANY" || t.availableWhen === mode
    );
  }, [mode]);

  // Autonomous wandering & discovery tip timer
  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (isHovered || mascotState === "acknowledged") return;

      const randomAction = Math.random();

      if (randomAction < 0.40) {
        // Pick new safe waypoint and wander
        setMascotState("wandering");
        setCurrentTip(null);
        setWaypoint((prev) => {
          const available = SAFE_WAYPOINTS.filter((w) => w.x !== prev.x || w.y !== prev.y);
          return available[Math.floor(Math.random() * available.length)];
        });
      } else if (randomAction < 0.78) {
        // Pause and emit a contextual discovery tip
        setMascotState("inspecting");
        const eligible = getEligibleTips();
        const nextTip = eligible[tipIndex % eligible.length];
        setTipIndex((i) => i + 1);
        setCurrentTip(nextTip);

        // Auto dismiss after 8.5s
        if (dismissTimerRef.current) window.clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = window.setTimeout(() => {
          setCurrentTip(null);
          setMascotState("idle");
        }, 8500);
      } else {
        // Idle pause
        setMascotState("idle");
        setCurrentTip(null);
      }
    }, 11000);

    return () => {
      clearInterval(interval);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, [isTouchDevice, prefersReducedMotion, isHovered, mascotState, tipIndex, getEligibleTips]);

  const handleMascotClick = useCallback(() => {
    if (dismissTimerRef.current) window.clearTimeout(dismissTimerRef.current);

    setMascotState("acknowledged");
    const eligible = getEligibleTips();
    const randomTip = eligible[Math.floor(Math.random() * eligible.length)];
    setCurrentTip(randomTip);

    dismissTimerRef.current = window.setTimeout(() => {
      setCurrentTip(null);
      setMascotState("idle");
    }, 7000);
  }, [getEligibleTips]);

  const handleActionClick = (action?: MascotActionType) => {
    if (!action) return;

    switch (action) {
      case "SWITCH_TO_ENGINEERING":
        setMode("ENGINEERING");
        break;
      case "SWITCH_TO_STANDARD":
        setMode("STANDARD");
        break;
      case "SCROLL_TO_TERMINAL":
        document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "SCROLL_TO_PROJECTS":
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "SCROLL_TO_SYSTEMS":
        document.getElementById("systems-map")?.scrollIntoView({ behavior: "smooth" });
        break;
    }

    // Dismiss message after action
    setCurrentTip(null);
    setMascotState("idle");
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTip(null);
    setMascotState("idle");
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
  };

  // On touch/mobile or reduced motion, render nothing
  if (isTouchDevice || prefersReducedMotion) {
    return null;
  }

  // Determine dynamic edge-clamped positioning for the bubble
  const isRightSide = waypoint.x >= 50;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none"
      aria-hidden="true"
    >
      <motion.div
        animate={{
          left: `${waypoint.x}%`,
          top: `${waypoint.y}%`,
        }}
        transition={{
          duration: mascotState === "wandering" ? 5 : 0.5,
          ease: "easeInOut",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
        onClick={handleMascotClick}
        title="daemon:pid_4096 // click to discover portfolio tips"
      >
        {/* Dynamic Edge-Clamped Discovery Speech Bubble */}
        <AnimatePresence>
          {currentTip && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-full mb-3 ${
                isRightSide ? "right-0 left-auto" : "left-0 right-auto"
              } w-[260px] sm:w-[310px] max-w-[calc(100vw-32px)] p-3 rounded border border-[var(--color-terminal)]/50 bg-[#0B0D0F]/95 backdrop-blur-md shadow-2xl font-mono text-xs text-[var(--color-slate)] space-y-2 cursor-default z-50`}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between text-[10px] text-[var(--color-terminal)] font-bold border-b border-[var(--color-border-subtle)] pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terminal)] animate-pulse" />
                  <span>&gt; {currentTip.prefix || "observer::tip"}</span>
                </div>
                <button
                  type="button"
                  onClick={handleDismiss}
                  aria-label="Dismiss Tip"
                  className="text-[var(--color-slate-light)] hover:text-[var(--color-ink)] p-0.5"
                >
                  <X size={11} />
                </button>
              </div>

              {/* Message Content (Natural Multi-Line Wrapping) */}
              <p className="text-[11px] leading-relaxed text-[var(--color-ink)] whitespace-normal break-words">
                {currentTip.message}
              </p>

              {/* Action Button */}
              {currentTip.action && currentTip.actionLabel && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleActionClick(currentTip.action)}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded border border-[var(--color-terminal)]/40 bg-[var(--color-terminal-soft)] hover:bg-[var(--color-terminal)] hover:text-[#0B0D0F] text-[var(--color-terminal)] text-[10px] font-bold font-mono transition-all duration-150 shadow-sm group"
                  >
                    {currentTip.action === "SWITCH_TO_ENGINEERING" && <Cpu size={11} />}
                    {currentTip.action === "SCROLL_TO_TERMINAL" && <Terminal size={11} />}
                    <span>[ {currentTip.actionLabel} ]</span>
                    <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Geometric Body (22px x 22px System Daemon) */}
        <div className="relative flex flex-col items-center group">
          {/* Antenna */}
          <div className="w-0.5 h-1.5 bg-[var(--color-terminal)]/60 rounded-t-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 -top-1 absolute rounded-full bg-[var(--color-terminal)] shadow-[0_0_6px_var(--color-terminal)]" />
          </div>

          {/* Droid Core Body */}
          <div className="w-6 h-5.5 rounded bg-[#0B0D0F] border border-[var(--color-terminal)]/40 group-hover:border-[var(--color-terminal)] transition-colors flex items-center justify-center shadow-lg relative overflow-hidden">
            {/* Ambient scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-terminal)]/10 to-transparent opacity-40 animate-pulse" />

            {/* Glowing Optic Eye */}
            <div className="flex items-center gap-1 z-10">
              <span
                className={`w-2 h-2 rounded-sm transition-all duration-200 ${
                  mascotState === "acknowledged"
                    ? "bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]"
                    : mascotState === "inspecting"
                    ? "bg-[var(--color-terminal)] shadow-[0_0_8px_var(--color-terminal)] animate-ping"
                    : "bg-[var(--color-terminal)] shadow-[0_0_5px_var(--color-terminal)]"
                }`}
              />
            </div>
          </div>

          {/* Tiny Thruster / Ground Shadow */}
          <div className="w-4 h-1 rounded-full bg-[var(--color-terminal)]/20 blur-[1px] mt-0.5" />
        </div>
      </motion.div>
    </div>
  );
}
