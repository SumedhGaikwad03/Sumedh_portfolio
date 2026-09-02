import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { current } from "../data/content";
import { useViewMode } from "../context/useViewMode";

function Panel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col hover:border-[var(--color-border-bright)] transition-colors h-full">
      <p className="mono-label text-[var(--color-terminal)] mb-3">// {label}</p>
      {children}
    </div>
  );
}

export default function Current() {
  const { mode } = useViewMode();

  return (
    <section id="current" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader
        index={mode === "ENGINEERING" ? "09" : "06"}
        title="Current Focus"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Panel label="BUILDING">
          <h3 className="text-[15px] font-semibold mb-1.5 text-[var(--color-ink)]">{current.building.name}</h3>
          <p className="text-[var(--color-slate)] text-xs leading-relaxed">
            {mode === "ENGINEERING" && current.building.engineeringDescription
              ? current.building.engineeringDescription
              : current.building.description}
          </p>
        </Panel>

        <Panel label="LEARNING">
          <ul className="space-y-1.5">
            {current.learning.map((item) => (
              <li key={item} className="flex gap-2 text-xs text-[var(--color-slate)]">
                <span className="text-[var(--color-terminal)] mt-0.5">&rsaquo;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel label="EXPLORING">
          <div className="flex flex-wrap gap-1.5">
            {current.exploring.map((item) => (
              <span
                key={item}
                className="rounded border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-mono text-[11px] px-2 py-0.5"
              >
                {item}
              </span>
            ))}
          </div>
        </Panel>

        <Panel label="STATUS">
          <div className="flex items-center gap-2 h-full py-1">
            <span className="live-dot" />
            <p className="text-xs font-mono text-[var(--color-slate)]">{current.statusNote}</p>
          </div>
        </Panel>
      </motion.div>
    </section>
  );
}
