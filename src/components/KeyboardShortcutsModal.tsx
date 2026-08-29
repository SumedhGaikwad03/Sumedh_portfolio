// Naming things remains undefeated.
// But keyboard listeners should always unmount cleanly.

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, X, ArrowRight, Sparkles } from "lucide-react";
import { KEYBOARD_SHORTCUTS, KONAMI_CODE_SEQUENCE } from "../data/easterEggs";
import { profile } from "../data/content";
import { useViewMode } from "../context/useViewMode";

export default function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const keySequenceRef = useRef<string[]>([]);
  const { setMode } = useViewMode();

  const handleAction = useCallback(
    (actionName: string) => {
      switch (actionName) {
        case "terminal": {
          setMode("ENGINEERING");
          setTimeout(() => {
            document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
          }, 300);
          break;
        }
        case "engineering": {
          setMode("ENGINEERING");
          break;
        }
        case "standard": {
          setMode("STANDARD");
          break;
        }
        case "resume": {
          window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
          break;
        }
        case "help": {
          setIsOpen((prev) => !prev);
          break;
        }
        case "close": {
          setIsOpen(false);
          break;
        }
      }
      setIsOpen(false);
    },
    [setMode]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs or textareas
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Konami Sequence Tracker
      const key = e.key.toLowerCase();
      const updated = [...keySequenceRef.current, key].slice(-KONAMI_CODE_SEQUENCE.length);
      keySequenceRef.current = updated;
      if (updated.join(",") === KONAMI_CODE_SEQUENCE.join(",")) {
        setKonamiUnlocked(true);
        setTimeout(() => setKonamiUnlocked(false), 5000);
        keySequenceRef.current = [];
      }

      // Keyboard Help Trigger
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      // Global Navigation Shortcuts
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        handleAction("terminal");
      } else if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        handleAction("engineering");
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        handleAction("standard");
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        handleAction("resume");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAction]);

  return (
    <>
      {/* Konami Code Legacy Notification Banner */}
      <AnimatePresence>
        {konamiUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 p-4 rounded border border-[var(--color-terminal)] bg-[#0B0D0F]/95 backdrop-blur-md shadow-2xl font-mono text-xs text-[var(--color-ink)] max-w-sm w-[90%] pointer-events-auto"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-between text-[var(--color-terminal)] font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-[var(--color-terminal)] animate-spin" />
                <span>// LEGACY INPUT SEQUENCE DETECTED</span>
              </span>
              <button
                type="button"
                onClick={() => setKonamiUnlocked(false)}
                className="text-[var(--color-slate-light)] hover:text-[var(--color-ink)]"
              >
                <X size={12} />
              </button>
            </div>
            <p className="text-[11px] text-[var(--color-slate)] leading-relaxed">
              &gt; Developer mode++ acknowledged.
              <br />
              <span className="text-[var(--color-terminal)]">
                [ 30 LIVES GRANTED &bull; ZERO PRODUCTION OVERHEAD ]
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D0F]/80 backdrop-blur-sm p-4 pointer-events-auto select-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="keyboard-shortcuts-title"
          >
            {/* Click-away backdrop */}
            <div
              className="absolute inset-0"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-md p-6 rounded border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl font-mono text-xs space-y-4 z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2.5">
                <div className="flex items-center gap-2 text-[var(--color-terminal)] font-bold">
                  <Command size={14} className="text-[var(--color-terminal)]" />
                  <span id="keyboard-shortcuts-title">// KEYBOARD_INTERFACE</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close shortcuts dialog"
                  className="text-[var(--color-slate)] hover:text-[var(--color-ink)] p-1 rounded hover:bg-[var(--color-surface-elevated)] transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Shortcuts Grid */}
              <div className="space-y-2 pt-1">
                {KEYBOARD_SHORTCUTS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleAction(item.actionName)}
                    className="w-full flex items-center justify-between p-2.5 rounded border border-[var(--color-border-subtle)] bg-[#0B0D0F] hover:border-[var(--color-border-bright)] hover:bg-[var(--color-surface-elevated)] transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <kbd className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] font-bold text-[var(--color-terminal)] shadow-inner">
                        {item.key}
                      </kbd>
                      <span className="text-[11px] text-[var(--color-slate)] group-hover:text-[var(--color-ink)] transition-colors">
                        {item.description}
                      </span>
                    </div>

                    <ArrowRight
                      size={12}
                      className="text-[var(--color-terminal)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    />
                  </button>
                ))}
              </div>

              {/* Footer Hint */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-subtle)] text-[10px] text-[var(--color-slate-light)]">
                <span>Press <kbd className="px-1 py-0.5 rounded bg-[#0B0D0F] border border-[var(--color-border)] text-[var(--color-terminal)]">ESC</kbd> to dismiss</span>
                <span className="text-[var(--color-terminal)] font-bold">[ FAST_NAVIGATION ]</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
