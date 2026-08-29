import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { technologies } from "../data/content";
import { useViewMode } from "../context/useViewMode";

export default function Technologies() {
  const { mode } = useViewMode();

  return (
    <section id="technologies" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader
        index={mode === "ENGINEERING" ? "07" : "04"}
        title="Technologies I Work With"
        description={
          mode === "ENGINEERING"
            ? "Full ecosystem technical surface including languages, backend runtimes, databases, ORMs, and reinforcement learning tooling."
            : "Core engineering stack across backend architectures, distributed data stores, and machine learning systems."
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {technologies.map((group) => {
          const displayItems =
            mode === "STANDARD" && group.coreItems ? group.coreItems : group.items;

          return (
            <div
              key={group.label}
              className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-border-bright)] transition-colors"
            >
              <div className="flex items-center justify-between mb-2.5">
                <p className="mono-label text-[var(--color-terminal)]">// {group.label.toUpperCase()}</p>
                <span className="text-[10px] font-mono text-[var(--color-slate-light)]">
                  {displayItems.length} {mode === "STANDARD" ? "CORE" : "TOTAL"}
                </span>
              </div>
              <ul className="space-y-1.5">
                {displayItems.map((item) => (
                  <li
                    key={item}
                    className="text-xs font-mono text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[var(--color-terminal)] text-[10px]">&rsaquo;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
