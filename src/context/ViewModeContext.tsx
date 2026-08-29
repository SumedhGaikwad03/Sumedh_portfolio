import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { ViewModeContext, STORAGE_KEY, type ViewMode } from "./viewModeTypes";

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "STANDARD";
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "ENGINEERING" ? "ENGINEERING" : "STANDARD";
  });

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionTarget, setTransitionTarget] = useState<ViewMode | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore storage errors in private browsing modes
    }
  }, [mode]);

  const setMode = useCallback((newMode: ViewMode) => {
    if (newMode === mode) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setModeState(newMode);
      return;
    }

    // Trigger transition sequence
    setIsTransitioning(true);
    setTransitionTarget(newMode);

    if (timerRef.current) window.clearTimeout(timerRef.current);

    const duration = newMode === "ENGINEERING" ? 4800 : 2800;

    timerRef.current = window.setTimeout(() => {
      setModeState(newMode);
      setIsTransitioning(false);
      setTransitionTarget(null);
    }, duration);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode(mode === "STANDARD" ? "ENGINEERING" : "STANDARD");
  }, [mode, setMode]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ViewModeContext.Provider
      value={{ mode, isTransitioning, transitionTarget, setMode, toggleMode }}
    >
      {children}
    </ViewModeContext.Provider>
  );
}
