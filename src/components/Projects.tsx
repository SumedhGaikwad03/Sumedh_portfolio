import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader index="02" title="Featured Projects" />

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="rounded-lg border border-[var(--color-border)] bg-white p-5 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-[15px] font-semibold">{p.name}</h3>
              {p.placeholder && (
                <span className="mono-label text-[var(--color-slate-light)] border border-[var(--color-border)] rounded px-1.5 py-0.5 text-[10px]">
                  in progress
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--color-slate)] mb-4 leading-relaxed">{p.oneLiner}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-medium text-[var(--color-slate)] border border-[var(--color-border)] rounded px-1.5 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm mt-auto pt-3 border-t border-[var(--color-border)]">
              {p.demo && (
                <a
                  href={p.demo}
                  className="inline-flex items-center gap-1 font-medium hover:text-[var(--color-accent)] transition-colors"
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
              )}
              {p.github && (
                <a
                  href={p.github}
                  className="inline-flex items-center gap-1 font-medium hover:text-[var(--color-accent)] transition-colors"
                >
                  <Github size={13} /> GitHub
                </a>
              )}
              <Link
                to={`/projects/${p.slug}`}
                className="inline-flex items-center gap-1 font-medium text-[var(--color-accent)] ml-auto"
              >
                Details <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
