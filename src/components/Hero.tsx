import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { profile, status, current } from "../data/content";
import { Github, Linkedin, Mail, ArrowRight, ArrowUpRight, X as XIcon, Terminal, Cpu } from "lucide-react";
import HeroSystemProbe from "./HeroSystemProbe";
import { useViewMode } from "../context/useViewMode";

export default function Hero() {
  const { mode } = useViewMode();
  const fullName = profile.name;
  const [displayText, setDisplayText] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return fullName;
    }
    return "";
  });
  const [isRevealing, setIsRevealing] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplayText(fullName);
      setIsRevealing(false);
      return;
    }

    let currentIndex = 0;
    let timer: number;
    let cursorTimer: number;

    const startTimeout = window.setTimeout(() => {
      timer = window.setInterval(() => {
        currentIndex++;
        setDisplayText(fullName.slice(0, currentIndex));

        if (currentIndex >= fullName.length) {
          clearInterval(timer);
          cursorTimer = window.setTimeout(() => {
            setIsRevealing(false);
          }, 350);
        }
      }, 70);
    }, 100);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(timer);
      clearTimeout(cursorTimer);
    };
  }, [fullName]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-20 relative">
      {/* System Schematic Probe Layer */}
      <HeroSystemProbe />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 relative z-10"
      >
        {/* CLI Context Prompt Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-[var(--color-slate)]">
            <Terminal size={14} className="text-[var(--color-terminal)]" />
            <span className="text-[var(--color-terminal)]">$</span>
            <span className="text-[var(--color-ink)]">whoami</span>
            <span className="w-1.5 h-3.5 bg-[var(--color-terminal)] inline-block animate-pulse ml-0.5" />
          </div>
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] hidden sm:inline-block">
            ENVIRONMENT::PRODUCTION // PUNE_IN {mode === "ENGINEERING" && "• VIEW::ENG"}
          </span>
        </motion.div>

        {/* Identity & Main Title */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--color-ink)] leading-[1.05] relative min-h-[1.05em]"
            aria-label={profile.name}
          >
            {/* Semantic & Layout Anchor: Reserves full layout footprint without layout shift */}
            <span className="invisible select-none pointer-events-none" aria-hidden="true">
              {profile.name}
            </span>

            {/* Progressive Terminal Identity Reveal Overlay */}
            <span className="absolute top-0 left-0 inline-flex items-center" aria-hidden="true">
              <span>{displayText}</span>
              {isRevealing && (
                <span className="inline-block w-[3px] sm:w-[5px] h-[0.75em] bg-[var(--color-terminal)] ml-1 sm:ml-1.5 animate-pulse rounded-xs" />
              )}
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-base sm:text-xl font-mono font-medium text-[var(--color-terminal)]">
              Backend-focused Full Stack Engineer
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="terminal-pill text-[11px] text-[var(--color-slate)] border-[var(--color-border)] bg-[var(--color-surface)]">
              [ BACKEND SYSTEMS ]
            </span>
            <span className="terminal-pill text-[11px] text-[var(--color-slate)] border-[var(--color-border)] bg-[var(--color-surface)]">
              [ FULL-STACK PRODUCTS ]
            </span>
            <span className="terminal-pill text-[11px] text-[var(--color-slate)] border-[var(--color-border)] bg-[var(--color-surface)]">
              [ AI / LLM INTEGRATION ]
            </span>
          </div>
        </motion.div>

        {/* Positioning Summary */}
        <motion.p variants={itemVariants} className="text-base md:text-lg text-[var(--color-slate)] max-w-2xl leading-relaxed font-normal">
          {profile.tagline}
        </motion.p>

        {/* Engineering Mode Diagnostic Telemetry Banner */}
        {mode === "ENGINEERING" && (
          <motion.div
            variants={itemVariants}
            className="p-3 rounded border border-[var(--color-terminal)]/40 bg-[var(--color-terminal-soft)] font-mono text-xs space-y-1.5 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between text-[10px] text-[var(--color-terminal)] font-bold">
              <span className="flex items-center gap-1.5">
                <Cpu size={12} className="text-[var(--color-terminal)]" />
                <span>ENGINEERING MODE ACTIVE // ARCHITECTURAL TELEMETRY</span>
              </span>
              <span>4 VERIFIED SYSTEMS</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-[var(--color-slate)]">
              <div className="p-1.5 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-ink)] font-bold block">FINANCE ONE</span>
                <span>Prisma.Decimal &bull; pgvector</span>
              </div>
              <div className="p-1.5 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-ink)] font-bold block">ATRIO</span>
                <span>Dual-Channel &bull; Socket Map</span>
              </div>
              <div className="p-1.5 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-ink)] font-bold block">VIRTUAL2REALITY</span>
                <span>BigInt Paise &bull; SSRF DNS</span>
              </div>
              <div className="p-1.5 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-ink)] font-bold block">STMS</span>
                <span>Lockstep SUMO &bull; DDQN</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* System Status & Metadata Panel */}
        <motion.div variants={itemVariants} className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 hover:border-[var(--color-border-bright)] transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="mono-label text-[10px] text-[var(--color-slate-light)] block">// AVAILABILITY</span>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="live-dot" />
                <span className="font-semibold text-[var(--color-terminal)]">{status.state}</span>
              </div>
              <span className="text-[11px] text-[var(--color-slate)] block">{status.role}</span>
            </div>

            <div className="space-y-1 sm:border-l sm:border-[var(--color-border)] sm:pl-4">
              <span className="mono-label text-[10px] text-[var(--color-slate-light)] block">// ENGINEERING FOCUS</span>
              <p className="font-medium text-[var(--color-ink)] pt-0.5">{status.focus}</p>
              <span className="text-[11px] text-[var(--color-slate)] block">Architecture &bull; APIs &bull; Data</span>
            </div>

            <div className="space-y-1 sm:border-l sm:border-[var(--color-border)] sm:pl-4">
              <span className="mono-label text-[10px] text-[var(--color-slate-light)] block">// CURRENTLY BUILDING</span>
              <p className="font-medium text-[var(--color-terminal)] pt-0.5">{current.building.name}</p>
              <span className="text-[11px] text-[var(--color-slate)] block truncate" title={current.building.description}>
                {current.building.description}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Controls & Social Links */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded border border-[var(--color-terminal)] bg-[var(--color-terminal)] text-[#0B0D0F] hover:bg-[var(--color-terminal)]/90 px-4 py-2 text-xs font-mono font-bold tracking-wide transition-all shadow-sm group"
          >
            <span>VIEW WORK</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-terminal)] hover:text-[var(--color-terminal)] px-4 py-2 text-xs font-mono font-medium transition-colors"
          >
            <span>RESUME</span>
            <ArrowUpRight size={13} />
          </a>

          <div className="h-4 w-px bg-[var(--color-border)] hidden sm:block mx-1" />

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)] px-3 py-2 text-xs font-mono transition-colors"
            >
              <Github size={13} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)] px-3 py-2 text-xs font-mono transition-colors"
            >
              <Linkedin size={13} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href={profile.x}
              target="_blank"
              rel="noreferrer"
              aria-label="X Profile"
              className="inline-flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)] px-3 py-2 text-xs font-mono transition-colors"
            >
              <XIcon size={13} />
              <span className="hidden sm:inline">X</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send Email"
              className="inline-flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)] px-3 py-2 text-xs font-mono transition-colors"
            >
              <Mail size={13} />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
