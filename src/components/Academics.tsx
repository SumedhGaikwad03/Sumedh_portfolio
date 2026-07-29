import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { education, certifications, publication } from "../data/content";

export default function Academics() {
  return (
    <section id="academics" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader index="03" title="Academics" />

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-5">
          <p className="mono-label mb-3">Education</p>
          <h3 className="text-[15px] font-semibold mb-1 leading-snug">{education.degree}</h3>
          <p className="text-sm text-[var(--color-slate)] mb-3">{education.school}</p>
          <div className="flex flex-wrap gap-2">
            <span className="mono-label border border-[var(--color-border)] rounded px-2 py-1">
              {education.period}
            </span>
            <span className="mono-label border border-[var(--color-border)] rounded px-2 py-1">
              {education.sgpa}
            </span>
            <span className="mono-label border border-[var(--color-border)] rounded px-2 py-1">
              {education.cgpa}
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-white p-5 flex flex-col">
          <p className="mono-label mb-3">Certification</p>
          {certifications.map((c) => (
            <div key={c.name} className="flex flex-col flex-1">
              <h3 className="text-[15px] font-semibold mb-1 leading-snug">{c.name}</h3>
              <p className="text-sm text-[var(--color-slate)] mb-3">{c.info}</p>
              <div className="flex flex-wrap items-center gap-2 mt-auto">
                <span className="mono-label border border-[var(--color-border)] rounded px-2 py-1">
                  {c.period}
                </span>
                {c.url && (
                  <a
                    href={c.url}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] ml-auto"
                  >
                    View Certificate <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-white p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="mono-label mb-2">Publication</p>
          <h3 className="text-[15px] font-semibold mb-1 leading-snug">{publication.title}</h3>
          <p className="text-sm text-[var(--color-slate-light)] mb-1">{publication.authors}</p>
          <p className="text-sm text-[var(--color-slate)]">
            {publication.journal} · {publication.info}
          </p>
        </div>
        <a
          href={publication.url}
          className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-ink)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors whitespace-nowrap"
        >
          View Paper <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
