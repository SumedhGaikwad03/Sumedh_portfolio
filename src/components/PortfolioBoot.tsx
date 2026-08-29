import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { DAEMON_STATUS_EASTER_EGG } from "../data/easterEggs";

const DESKTOP_STEPS = [
  { text: "initializing portfolio runtime...", at: 100 },
  { text: "loading project registry........ OK", at: 700 },
  { text: "loading engineering profile..... OK", at: 1400 },
  { text: "mounting interface.............. OK", at: 2100 },
  { text: "system status................... READY", at: 2800 },
];

const MOBILE_STEPS = [
  { text: "initializing runtime...", at: 80 },
  { text: "loading registry....... OK", at: 600 },
  { text: "mounting interface..... OK", at: 1150 },
  { text: "system status.......... READY", at: 1700 },
];

const BOOT_SESSION_KEY = "portfolio_boot_seen";

export default function PortfolioBoot() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    // Direct deep links or returning visitors skip boot
    const seen = sessionStorage.getItem(BOOT_SESSION_KEY);
    return !seen && isHome;
  });

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isDaemonCurious, setIsDaemonCurious] = useState<boolean>(false);
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  const finishTimerRef = useRef<number | null>(null);
  const hoverTimerRef = useRef<number | null>(null);

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_SESSION_KEY, "true");
    } catch {
      // Ignore private storage errors
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !isHome) {
      finishBoot();
      return;
    }

    const isMobile = window.innerWidth < 640;
    const steps = isMobile ? MOBILE_STEPS : DESKTOP_STEPS;
    const totalDuration = isMobile ? 2200 : 3500;

    const timers: number[] = [];

    steps.forEach((step, index) => {
      const timer = window.setTimeout(() => {
        setStepIndex(index + 1);
        if (index === steps.length - 1) {
          setIsReady(true);
        }
      }, step.at);
      timers.push(timer);
    });

    // Only auto-finish if not actively hovering to allow Easter egg discovery
    if (!isCardHovered) {
      finishTimerRef.current = window.setTimeout(() => {
        finishBoot();
      }, totalDuration);
    }

    const handleKey = () => finishBoot();
    window.addEventListener("keydown", handleKey, { once: true });

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      if (finishTimerRef.current) window.clearTimeout(finishTimerRef.current);
      if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
      window.removeEventListener("keydown", handleKey);
    };
  }, [isVisible, isHome, isCardHovered, finishBoot]);

  const handleStatusMouseEnter = () => {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);

    hoverTimerRef.current = window.setTimeout(() => {
      setIsDaemonCurious(true);
    }, DAEMON_STATUS_EASTER_EGG.triggerHoverMs);
  };

  const handleStatusMouseLeave = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsDaemonCurious(false);
  };

  const handleCardMouseEnter = () => {
    setIsCardHovered(true);
    if (finishTimerRef.current) {
      window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
  };

  const handleCardMouseLeave = () => {
    setIsCardHovered(false);
    handleStatusMouseLeave();
    if (isReady) {
      finishTimerRef.current = window.setTimeout(() => {
        finishBoot();
      }, 1000);
    }
  };

  if (!isVisible) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const steps = isMobile ? MOBILE_STEPS : DESKTOP_STEPS;
  const progressRatio = Math.min(100, Math.round((stepIndex / steps.length) * 100));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D0F] p-4 select-none pointer-events-auto"
          aria-live="polite"
          role="status"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
            className="w-full max-w-[440px] p-6 rounded border border-[var(--color-border)] bg-[#0B0D0F] shadow-2xl font-mono text-xs space-y-4"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2 text-[var(--color-slate)]">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-terminal)] font-bold">~/sumedh</span>
                <span className="text-[var(--color-slate-light)]">::</span>
                <span className="text-[var(--color-ink)] font-medium">portfolio runtime</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terminal)] animate-pulse" />
            </div>

            {/* Boot Log Stream */}
            <div className="space-y-1.5 min-h-[110px] text-[11px] text-[var(--color-slate)] font-mono">
              {steps.slice(0, stepIndex).map((s, idx) => (
                <motion.div
                  key={s.text}
                  initial={{ opacity: 0, x: -3 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`flex items-center gap-1.5 ${
                    idx === stepIndex - 1 ? "text-[var(--color-ink)]" : "text-[var(--color-slate)]"
                  }`}
                >
                  <span className="text-[var(--color-terminal)] font-bold">&gt;</span>
                  <span>{s.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="w-full bg-[#161A20] rounded h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progressRatio}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-[var(--color-terminal)] h-full shadow-[0_0_8px_var(--color-terminal)]"
                />
              </div>
              <div className="flex justify-between items-start text-[10px] text-[var(--color-slate-light)] font-mono pt-1">
                <span>PROGRESS: {progressRatio}%</span>
                <div
                  onMouseEnter={handleStatusMouseEnter}
                  onMouseLeave={handleStatusMouseLeave}
                  className="text-right cursor-default select-none"
                  title={isReady ? "status::system_ready" : undefined}
                >
                  <span className={`flex items-center gap-1 justify-end ${isReady ? "text-[var(--color-terminal)] font-bold" : ""}`}>
                    {isReady && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terminal)] animate-pulse inline-block" />}
                    <span>{isReady ? "SYSTEM READY" : "BOOTING..."}</span>
                  </span>
                  <AnimatePresence>
                    {isDaemonCurious && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-[9px] text-[var(--color-terminal)]/70 font-mono tracking-wider italic pt-0.5"
                      >
                        {DAEMON_STATUS_EASTER_EGG.revealedText}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
