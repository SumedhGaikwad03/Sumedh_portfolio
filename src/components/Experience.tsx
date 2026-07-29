import SectionHeader from "./SectionHeader";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader index="05" title="Experience" />

      <div className="relative pl-6">
        <div className="absolute left-0 top-1 bottom-1 w-px bg-[var(--color-border)]" />

        <div className="space-y-7">
          {experience.map((item) => (
            <div key={item.role + item.org} className="relative">
              <div className="absolute -left-[26px] top-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]" />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h3 className="font-semibold text-[15px]">{item.role}</h3>
                <span className="text-[var(--color-slate)] text-sm">— {item.org}</span>
                <span className="mono-label ml-auto">{item.period}</span>
              </div>
              <span className="mono-label text-[var(--color-accent)] block mb-1.5">
                {item.type}
              </span>
              <ul className="space-y-1">
                {item.points.map((point) => (
                  <li key={point} className="text-sm text-[var(--color-slate)] flex gap-2">
                    <span className="text-[var(--color-slate-light)]">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
