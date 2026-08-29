import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { education, certifications, publication } from "../data/content";

import { useViewMode } from "../context/useViewMode";

export default function Academics() {
  const { mode } = useViewMode();

  return (
    <section id="academics" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader
        index={mode === "ENGINEERING" ? "08" : "05"}
        title="Academics & Research"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="grid md:grid-cols-2 gap-4 mb-4"
      >
        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-3">
            <p className="mono-label text-[var(--color-terminal)]">// EDUCATION</p>
            <span className="mono-label text-[10px] text-[var(--color-slate-light)]">DEGREE</span>
          </div>
          <h3 className="text-[15px] font-semibold mb-0.5 leading-snug text-[var(--color-ink)]">{education.degree}</h3>
          {education.honors && (
            <p className="text-xs text-[var(--color-terminal)] font-mono mb-2">{education.honors}</p>
          )}
          <p className="text-sm text-[var(--color-slate)] mb-4">{education.school}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="mono-label border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-slate)] rounded px-2 py-1">
              {education.period}
            </span>
            <span className="mono-label border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-slate)] rounded px-2 py-1">
              {education.sgpa}
            </span>
            <span className="mono-label border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-terminal)] rounded px-2 py-1">
              {education.cgpa}
            </span>
          </div>
        </div>

        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-3">
            <p className="mono-label text-[var(--color-terminal)]">// CERTIFICATION</p>
            <span className="mono-label text-[10px] text-[var(--color-slate-light)]">CREDENTIAL</span>
          </div>
          {certifications.map((c) => (
            <div key={c.name} className="flex flex-col flex-1">
              <h3 className="text-[15px] font-semibold mb-1 leading-snug text-[var(--color-ink)]">{c.name}</h3>
              <p className="text-sm text-[var(--color-slate)] mb-4 leading-relaxed">{c.info}</p>
              <div className="flex flex-wrap items-center gap-2 mt-auto">
                <span className="mono-label border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-slate)] rounded px-2 py-1">
                  {c.period}
                </span>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors ml-auto"
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="mono-label text-[var(--color-terminal)]">// PEER-REVIEWED PUBLICATION</p>
            <span className="mono-label text-[10px] text-[var(--color-slate-light)]">IJIRT</span>
          </div>
          <h3 className="text-[15px] font-semibold mb-1 leading-snug text-[var(--color-ink)]">{publication.title}</h3>
          <p className="text-xs text-[var(--color-slate-light)] font-mono mb-1">{publication.authors}</p>
          <p className="text-xs text-[var(--color-slate)] font-mono">
            {publication.journal} · {publication.info}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href={publication.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-terminal)] hover:text-[var(--color-terminal)] text-[var(--color-ink)] px-4 py-2 text-xs font-mono font-medium transition-colors whitespace-nowrap"
          >
            <span>VIEW PAPER</span>
            <ArrowUpRight size={13} />
          </a>
          {publication.pdfUrl && (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-terminal)] hover:text-[var(--color-terminal)] text-[var(--color-slate)] px-3 py-2 text-xs font-mono font-medium transition-colors whitespace-nowrap"
            >
              <span>PDF</span>
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
