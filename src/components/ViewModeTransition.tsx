import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useViewMode } from "../context/useViewMode";

const ENG_LINES = [
  { text: "switching abstraction layer...", at: 600 },
  { text: "loading system architecture...", at: 1200 },
  { text: "mounting capability graph...", at: 1800 },
  { text: "loading engineering principles...", at: 2500 },
  { text: "exposing invariant specifications...", at: 3200 },
  { text: "enabling technical telemetry...", at: 3900 },
];

const STD_LINES = [
  { text: "restoring standard abstraction...", at: 600 },
  { text: "collapsing telemetry & invariant specs...", at: 1200 },
  { text: "restoring recruiter overview...", at: 1900 },
];

export default function ViewModeTransition() {
  const { isTransitioning, transitionTarget } = useViewMode();
  const [visibleCount, setVisibleCount] = useState<number>(0);

  useEffect(() => {
    if (!isTransitioning) {
      setVisibleCount(0);
      return;
    }

    const lines = transitionTarget === "ENGINEERING" ? ENG_LINES : STD_LINES;
    const timers: number[] = [];

    lines.forEach((line, index) => {
      const timer = window.setTimeout(() => {
        setVisibleCount(index + 1);
      }, line.at);
      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [isTransitioning, transitionTarget]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D0F]/90 backdrop-blur-md p-4 pointer-events-auto select-none"
          aria-live="assertive"
          role="status"
        >
          {transitionTarget === "ENGINEERING" ? (
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -6 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-[420px] p-6 rounded border border-[var(--color-terminal)]/60 bg-[#0B0D0F] shadow-2xl font-mono text-xs space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2 text-[var(--color-terminal)] font-bold">
                <span className="flex items-center gap-2">
                  <span>$ mode --switch ENGINEERING</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-terminal)] animate-ping" />
              </div>

              {/* Progress Log Lines */}
              <div className="space-y-1.5 min-h-[140px] text-[11px] text-[var(--color-slate)]">
                <p className="text-[var(--color-terminal)] font-bold">
                  // VIEW MODE CHANGE DETECTED:
                </p>
                {ENG_LINES.slice(0, visibleCount).map((l, i) => (
                  <motion.p
                    key={l.text}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.12 }}
                    className={
                      i === visibleCount - 1
                        ? "text-[var(--color-ink)] font-semibold flex items-center gap-1.5"
                        : "text-[var(--color-slate)] flex items-center gap-1.5"
                    }
                  >
                    <span className="text-[var(--color-terminal)]">&gt;</span>
                    <span>{l.text}</span>
                  </motion.p>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#161A20] rounded h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.6, ease: "easeInOut" }}
                  className="bg-[var(--color-terminal)] h-full shadow-[0_0_10px_var(--color-terminal)]"
                />
              </div>

              {/* Footer Status */}
              <div className="flex justify-between text-[10px] text-[var(--color-terminal)] font-bold pt-0.5 border-t border-[var(--color-border-subtle)]">
                <span>MODE::ENGINEERING</span>
                <span>{visibleCount === ENG_LINES.length ? "READY" : "LOADING..."}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.95, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-[360px] p-5 rounded border border-[var(--color-border-bright)] bg-[#0B0D0F] shadow-2xl font-mono text-xs space-y-3"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2 text-[var(--color-ink)] font-bold text-[11px]">
                <span>$ mode --switch STANDARD</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              </div>

              {/* Progress Log Lines */}
              <div className="space-y-1.5 min-h-[70px] text-[11px] text-[var(--color-slate)]">
                {STD_LINES.slice(0, visibleCount).map((l, i) => (
                  <motion.p
                    key={l.text}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.12 }}
                    className={
                      i === visibleCount - 1
                        ? "text-[var(--color-ink)] font-semibold flex items-center gap-1.5"
                        : "text-[var(--color-slate)] flex items-center gap-1.5"
                    }
                  >
                    <span className="text-[var(--color-accent)]">&gt;</span>
                    <span>{l.text}</span>
                  </motion.p>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#161A20] rounded h-1 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.6, ease: "easeInOut" }}
                  className="bg-[var(--color-accent)] h-full"
                />
              </div>

              {/* Footer Status */}
              <div className="flex justify-between text-[10px] text-[var(--color-slate-light)] font-mono pt-0.5 border-t border-[var(--color-border-subtle)]">
                <span>MODE::STANDARD</span>
                <span>STATE::READY</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
