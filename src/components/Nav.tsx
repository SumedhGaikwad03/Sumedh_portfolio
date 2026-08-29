import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, ArrowLeft } from "lucide-react";
import { profile } from "../data/content";
import { useViewMode } from "../context/useViewMode";

const STANDARD_LINKS = [
  { href: "/#about", label: "about", id: "about" },
  { href: "/#projects", label: "projects", id: "projects" },
  { href: "/#experience", label: "experience", id: "experience" },
  { href: "/#technologies", label: "tech", id: "technologies" },
  { href: "/#contact", label: "contact", id: "contact" },
];

const ENGINEERING_LINKS = [
  { href: "/#terminal", label: "terminal", id: "terminal" },
  { href: "/#systems-map", label: "systems", id: "systems-map" },
  { href: "/#technical-dna", label: "dna", id: "technical-dna" },
  { href: "/#projects", label: "projects", id: "projects" },
  { href: "/#experience", label: "experience", id: "experience" },
  { href: "/#contact", label: "contact", id: "contact" },
];

export default function Nav() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const { mode, setMode } = useViewMode();

  const activeLinks = mode === "ENGINEERING" ? ENGINEERING_LINKS : STANDARD_LINKS;

  useEffect(() => {
    if (!isHome) return;
    const sectionIds = activeLinks.map((l) => l.id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome, activeLinks]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 font-mono text-sm tracking-tight text-[var(--color-ink)] hover:text-[var(--color-terminal)] transition-colors group flex-shrink-0"
        >
          <span className="text-[var(--color-terminal)] font-bold">~</span>
          <span className="text-[var(--color-slate)] group-hover:text-[var(--color-ink)] transition-colors font-medium">
            /sumedh
          </span>
          <span className="w-1.5 h-3.5 bg-[var(--color-terminal)] inline-block animate-pulse ml-0.5" />
        </Link>

        {/* Primary Desktop Nav Links (Clean & Mode-Driven) */}
        {isHome ? (
          <ul className="hidden md:flex items-center gap-5 lg:gap-7">
            {activeLinks.map((l) => {
              const isActive = activeSection === l.id;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`mono-label text-xs transition-colors inline-flex items-center py-1 ${
                      isActive
                        ? "text-[var(--color-terminal)] font-bold border-b border-[var(--color-terminal)]"
                        : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    <span>.{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <Link
            to="/"
            className="mono-label text-xs inline-flex items-center gap-1.5 text-[var(--color-slate)] hover:text-[var(--color-terminal)] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>cd .. /home</span>
          </Link>
        )}

        {/* Controls: Mode Switcher & Resume */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Segmented Mode Switcher */}
          <div
            role="group"
            aria-label="View Mode Switcher"
            className="flex items-center rounded border border-[var(--color-border)] bg-[#0B0D0F] p-0.5 font-mono text-[11px]"
          >
            <button
              type="button"
              onClick={() => setMode("STANDARD")}
              aria-pressed={mode === "STANDARD"}
              title="Standard Mode: Recruiter-friendly, concise overview"
              className={`px-2.5 py-1 rounded transition-all duration-150 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-terminal)] ${
                mode === "STANDARD"
                  ? "bg-[var(--color-surface-elevated)] text-[var(--color-ink)] font-bold border border-[var(--color-border-bright)] shadow-sm"
                  : "text-[var(--color-slate-light)] hover:text-[var(--color-slate)]"
              }`}
            >
              <span>STD</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("ENGINEERING")}
              aria-pressed={mode === "ENGINEERING"}
              title="Engineering Mode: Deep architectural telemetry, invariants, and implementation specs"
              className={`px-2.5 py-1 rounded transition-all duration-150 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-terminal)] ${
                mode === "ENGINEERING"
                  ? "bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] font-bold border border-[var(--color-terminal)]/60 shadow-[0_0_10px_rgba(126,231,135,0.25)]"
                  : "text-[var(--color-slate-light)] hover:text-[var(--color-slate)]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  mode === "ENGINEERING"
                    ? "bg-[var(--color-terminal)] animate-pulse"
                    : "bg-[var(--color-slate-light)]/40"
                }`}
              />
              <span>ENG</span>
            </button>
          </div>

          {/* Resume CTA */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded border border-[var(--color-accent)]/50 bg-[var(--color-accent-soft)] text-xs font-mono font-bold text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#0B0D0F] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
          >
            <span>RESUME</span>
            <ArrowUpRight size={12} />
          </a>

          {/* Mobile Menu Button */}
          {isHome && (
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded border border-[var(--color-border)] bg-[var(--color-surface)] w-8 h-8 text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)] transition-colors"
            >
              {open ? <X size={15} /> : <Menu size={15} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isHome && open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="max-w-5xl mx-auto flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[10px] text-[var(--color-slate-light)] font-mono mb-1">
              <span>// NAVIGATION [{mode} MODE]</span>
              <span className="text-[var(--color-terminal)]">{activeLinks.length} SECTIONS</span>
            </div>

            {activeLinks.map((l, idx) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="mono-label flex items-center justify-between py-2 text-xs text-[var(--color-slate)] hover:text-[var(--color-terminal)] border-b border-[var(--color-border-subtle)] last:border-0 transition-colors"
              >
                <span>
                  0{idx + 1} // {l.label}
                </span>
                <span className="text-[var(--color-slate-light)] text-[10px]">&rarr;</span>
              </a>
            ))}

            <div className="pt-2 mt-1">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full rounded border border-[var(--color-accent)]/50 bg-[var(--color-accent-soft)] py-2 text-xs font-mono font-bold text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#0B0D0F] transition-all"
              >
                <span>VIEW RESUME</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
