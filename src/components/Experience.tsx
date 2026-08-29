import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Layers, CheckCircle2 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { experience } from "../data/content";
import { useViewMode } from "../context/useViewMode";

export default function Experience() {
  const { mode } = useViewMode();

  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader
        index={mode === "ENGINEERING" ? "06" : "03"}
        title="Professional Experience"
        description={
          mode === "ENGINEERING"
            ? "Production engineering delivery, client monolith architecture, and cyber-physical research leadership."
            : "Engineering internships, client platform delivery, and hackathon technical leadership."
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative pl-6"
      >
        {/* Timeline vertical track */}
        <div className="absolute left-0 top-1 bottom-1 w-px bg-[var(--color-border)]" />

        <div className="space-y-12">
          {experience.map((item) => (
            <div key={item.role + item.org} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[27px] top-1.5 w-2 h-2 rounded-full bg-[var(--color-terminal)] ring-4 ring-[var(--color-bg)]" />

              {/* Role and Metadata Header */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h3 className="font-semibold text-[15px] sm:text-base text-[var(--color-ink)]">
                  {item.role}
                </h3>
                <span className="text-[var(--color-slate)] text-sm font-normal">
                  — {item.org}
                </span>
                <span className="mono-label text-xs text-[var(--color-slate-light)] ml-auto">
                  {item.period}
                </span>
              </div>

              {/* Type pill and project shortcut */}
              <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono">
                <span className="text-[11px] text-[var(--color-terminal)] font-semibold">
                  // {item.type.toUpperCase()}
                </span>
                {item.projectSlug && (
                  <Link
                    to={`/projects/${item.projectSlug}`}
                    className="inline-flex items-center gap-1 text-[10px] text-[var(--color-accent)] hover:underline border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-2 py-0.5 rounded ml-2"
                  >
                    <Layers size={10} />
                    <span>VIEW DOSSIER</span>
                    <ArrowRight size={9} />
                  </Link>
                )}
              </div>

              {/* STANDARD MODE: Clean Recruiter Summary & Accomplishments */}
              {mode === "STANDARD" ? (
                <div className="space-y-2">
                  <p className="text-xs text-[var(--color-slate)] leading-relaxed italic mb-2">
                    {item.summary}
                  </p>
                  <ul className="space-y-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm text-[var(--color-slate)] flex gap-2.5 leading-relaxed"
                      >
                        <span className="text-[var(--color-slate-light)] font-mono select-none">
                          &rsaquo;
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                /* ENGINEERING MODE: Structured Delivery Context */
                <div className="space-y-3">
                  {/* Verified Accomplishments Bullet Points */}
                  <ul className="space-y-1.5 mb-3 text-xs text-[var(--color-slate)]">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 leading-relaxed">
                        <span className="text-[var(--color-terminal)] font-mono select-none">
                          &rsaquo;
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Engineering Delivery Context Box */}
                  <div className="p-4 rounded bg-[#0B0D0F] border border-[var(--color-terminal)]/35 space-y-3 font-mono text-xs shadow-inner">
                    <div className="flex items-center justify-between text-[10px] text-[var(--color-terminal)] font-bold border-b border-[var(--color-border-subtle)] pb-2">
                      <span className="flex items-center gap-1.5">
                        <Terminal size={11} className="text-[var(--color-terminal)]" />
                        <span>// ENGINEERING_DELIVERY_CONTEXT</span>
                      </span>
                      <span className="text-[var(--color-accent)]">SPEC::VERIFIED</span>
                    </div>

                    <div className="space-y-2.5 text-[11px] leading-relaxed">
                      {/* Systems Delivered */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="text-[10px] text-[var(--color-terminal)] font-bold shrink-0 w-32">
                          // SYSTEMS:
                        </span>
                        <span className="text-[var(--color-ink)]">
                          {item.engineeringContext.systemsDelivered}
                        </span>
                      </div>

                      {/* Architecture */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="text-[10px] text-[var(--color-accent)] font-bold shrink-0 w-32">
                          // ARCHITECTURE:
                        </span>
                        <span className="text-[var(--color-slate)]">
                          {item.engineeringContext.architecturalContributions}
                        </span>
                      </div>

                      {/* Key Engineering Decisions */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <span className="text-[10px] text-[var(--color-terminal)] font-bold shrink-0 w-32">
                          // DECISIONS:
                        </span>
                        <div className="space-y-1">
                          {item.engineeringContext.keyEngineeringDecisions.map((dec, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--color-slate)]">
                              <span className="text-[var(--color-terminal)]">&bull;</span>
                              <span>{dec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Performance & Constraints */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[var(--color-border-subtle)]">
                        <div>
                          <span className="text-[10px] text-[var(--color-slate-light)] font-bold block">
                            // PERFORMANCE / SCALE:
                          </span>
                          <span className="text-[10px] text-[var(--color-ink)]">
                            {item.engineeringContext.performanceReliability}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[var(--color-slate-light)] font-bold block">
                            // SECURITY / CONSTRAINTS:
                          </span>
                          <span className="text-[10px] text-[var(--color-slate)]">
                            {item.engineeringContext.securityDataConstraints}
                          </span>
                        </div>
                      </div>

                      {/* Evidence */}
                      <div className="flex items-center gap-2 pt-1 border-t border-[var(--color-border-subtle)] text-[10px]">
                        <span className="text-[var(--color-terminal)] font-bold shrink-0">
                          // EVIDENCE:
                        </span>
                        <span className="text-[var(--color-ink)] flex items-center gap-1">
                          <CheckCircle2 size={11} className="text-[var(--color-terminal)]" />
                          <span>{item.engineeringContext.deliveryEvidence}</span>
                        </span>
                      </div>

                      {/* Technology Surface Pills */}
                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        <span className="text-[10px] text-[var(--color-slate-light)] font-bold mr-1">
                          SURFACE:
                        </span>
                        {item.engineeringContext.techSurface.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] text-[var(--color-slate)] bg-[#161A20] border border-[var(--color-border)] rounded px-1.5 py-0.5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
