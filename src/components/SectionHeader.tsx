import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  index: string;
  title: string;
  description?: string;
};

export default function SectionHeader({ index, title, description }: Props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      onViewportEnter={() => setIsActive(true)}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-8"
    >
      <div className="flex items-center justify-between gap-4 mb-2.5">
        <div className="flex items-center gap-3">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// {index}</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">{title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] hidden sm:inline-block">
            SEC::{index}
          </span>
          <span
            className={`mono-label text-[9px] font-mono rounded px-1.5 py-0.5 border transition-all duration-300 flex items-center gap-1 ${
              isActive
                ? "border-[var(--color-terminal)]/40 bg-[var(--color-terminal-soft)] text-[var(--color-terminal)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate-light)]"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[var(--color-terminal)] animate-pulse" : "bg-[var(--color-slate-light)]"}`} />
            <span>{isActive ? "ACTIVE" : "STANDBY"}</span>
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-[var(--color-border)]" />
      {description && (
        <p className="mt-3 text-[var(--color-slate)] max-w-xl text-sm leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
