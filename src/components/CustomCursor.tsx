import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const ringVisualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on fine-pointer desktop devices and when reduced motion is not requested
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || prefersReducedMotion) {
      return;
    }

    setMounted(true);
    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isInteractive = false;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      // Check if hovering an interactive target
      const target = e.target as HTMLElement | null;
      const interactiveTarget = target?.closest(
        "a, button, [role='button'], input, textarea, select, label, summary, [data-interactive]"
      );
      const nextInteractive = Boolean(interactiveTarget);

      if (nextInteractive !== isInteractive) {
        isInteractive = nextInteractive;
        if (ringVisualRef.current) {
          if (isInteractive) {
            ringVisualRef.current.classList.add(
              "scale-135",
              "border-[var(--color-terminal)]",
              "bg-[var(--color-terminal-soft)]/30"
            );
            ringVisualRef.current.classList.remove(
              "border-[var(--color-terminal)]/40",
              "bg-[var(--color-terminal-soft)]/10"
            );
          } else {
            ringVisualRef.current.classList.remove(
              "scale-135",
              "border-[var(--color-terminal)]",
              "bg-[var(--color-terminal-soft)]/30"
            );
            ringVisualRef.current.classList.add(
              "border-[var(--color-terminal)]/40",
              "bg-[var(--color-terminal-soft)]/10"
            );
          }
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const render = () => {
      if (isVisible) {
        // Direct transform update on dot (1:1 precision hotspot with hardware pointer)
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }

        // Smooth high-cadence interpolation on ring
        ringX += (mouseX - ringX) * 0.35;
        ringY += (mouseY - ringY) * 0.35;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Precision Center Hotspot Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-opacity duration-150 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
        aria-hidden="true"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-terminal)] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_rgba(126,231,135,0.9)]" />
      </div>

      {/* Reactive Orbit Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] opacity-0 transition-opacity duration-150 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
        aria-hidden="true"
      >
        <div
          ref={ringVisualRef}
          className="w-7 h-7 rounded-full border border-[var(--color-terminal)]/40 bg-[var(--color-terminal-soft)]/10 -translate-x-1/2 -translate-y-1/2 transition-[transform,border-color,background-color] duration-150 ease-out"
        />
      </div>
    </>
  );
}
