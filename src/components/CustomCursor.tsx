import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "project" | "external">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectTarget = target.closest("[data-cursor='project']");
      const externalTarget = target.closest("a[target='_blank'], [data-cursor='external']");
      const interactive = target.closest("a, button, [role='button'], input, textarea, [data-cursor]");

      if (projectTarget) {
        setCursorType("project");
      } else if (externalTarget) {
        setCursorType("external");
      } else if (interactive) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {cursorType === "project" ? (
        <div className="w-10 h-10 rounded-full border border-[var(--color-terminal)] bg-[var(--color-terminal-soft)] flex items-center justify-center text-[10px] font-mono font-bold text-[var(--color-terminal)] shadow-[0_0_12px_rgba(126,231,135,0.25)] transition-all duration-150 scale-100">
          <span>&rarr;</span>
        </div>
      ) : cursorType === "external" ? (
        <div className="w-8 h-8 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)] flex items-center justify-center text-[10px] font-mono text-[var(--color-accent)] transition-all duration-150 scale-100">
          <span>&nearr;</span>
        </div>
      ) : cursorType === "pointer" ? (
        <div className="w-8 h-8 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)] transition-all duration-150" />
      ) : (
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-terminal)] shadow-[0_0_8px_rgba(126,231,135,0.6)] transition-all duration-150" />
      )}
    </div>
  );
}
