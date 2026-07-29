import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { publication } from "../data/content";

export default function Publication() {
  return (
    <section id="publication" className="max-w-5xl mx-auto px-6 py-20 scroll-mt-16">
      <SectionHeader index="04" title="Publication" />

      <div className="rounded-lg border border-[var(--color-border)] bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-1.5">{publication.title}</h3>
          <p className="text-[var(--color-slate)]">
            {publication.journal} · {publication.info}
          </p>
        </div>
        <a
          href={publication.url}
          className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-ink)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors whitespace-nowrap"
        >
          View Paper <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}
