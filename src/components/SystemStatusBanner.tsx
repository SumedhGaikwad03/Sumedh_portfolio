import { motion } from "framer-motion";
import { Cpu, ShieldCheck } from "lucide-react";
import { useViewMode } from "../context/useViewMode";

export default function SystemStatusBanner() {
  const { mode } = useViewMode();

  return (
    <aside
      aria-label="Portfolio Systems Overview"
      className="max-w-5xl mx-auto px-6 pt-4 pb-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded border border-[var(--color-border)] bg-[#0B0D0F]/90 p-3 sm:px-4 sm:py-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs font-mono shadow-sm"
      >
        {/* Core Metrics Summary */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[var(--color-slate)]">
          <div className="flex items-center gap-1.5 text-[var(--color-terminal)] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terminal)] animate-pulse" />
            <span>SCOPE:</span>
          </div>

          <span className="text-[var(--color-ink)] font-semibold">04 SYSTEMS</span>
          <span className="text-[var(--color-slate-light)]">&bull;</span>
          <span className="text-[var(--color-ink)] font-semibold">06 DOMAINS</span>
          <span className="text-[var(--color-slate-light)] hidden sm:inline">&bull;</span>
          <span className="text-[var(--color-ink)] font-semibold hidden sm:inline">05 PRINCIPLES</span>
          <span className="text-[var(--color-slate-light)]">&bull;</span>
          <span className="text-[var(--color-ink)] font-semibold">04 PROBES</span>
        </div>

        {/* Mode-Specific Status Tag */}
        {mode === "ENGINEERING" ? (
          <div className="flex items-center gap-2 text-[10px] text-[var(--color-terminal)] border-t sm:border-t-0 border-[var(--color-border-subtle)] pt-1.5 sm:pt-0 w-full sm:w-auto">
            <Cpu size={12} className="text-[var(--color-terminal)]" />
            <span>SYSTEMS::4/4</span>
            <span className="text-[var(--color-slate-light)]">&bull;</span>
            <span>INVARIANTS::VERIFIED</span>
            <span className="text-[var(--color-slate-light)] hidden lg:inline">&bull;</span>
            <span className="hidden lg:inline text-[var(--color-accent)]">TRACE::AVAILABLE</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-slate-light)] hidden sm:flex">
            <ShieldCheck size={12} className="text-[var(--color-terminal)]/70" />
            <span>VERIFIED_ARCHITECTURES</span>
          </div>
        )}
      </motion.div>
    </aside>
  );
}
