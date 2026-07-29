import SectionHeader from "./SectionHeader";
import { summary } from "../data/content";

export default function Summary() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader index="01" title="Summary" />
      <div className="max-w-2xl space-y-4">
        {summary.paragraphs.map((p) => (
          <p key={p} className="text-[15px] leading-relaxed text-[var(--color-ink)]">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
