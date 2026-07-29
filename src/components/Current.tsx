import SectionHeader from "./SectionHeader";
import { current } from "../data/content";

function Panel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-5">
      <p className="mono-label mb-3">{label}</p>
      {children}
    </div>
  );
}

export default function Current() {
  return (
    <section id="current" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader index="04" title="Current" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Panel label="Building">
          <h3 className="text-[15px] font-semibold mb-1.5">{current.building.name}</h3>
          <p className="text-[var(--color-slate)] text-sm leading-relaxed">
            {current.building.description}
          </p>
        </Panel>

        <Panel label="Learning">
          <ul className="space-y-1.5">
            {current.learning.map((item) => (
              <li key={item} className="flex gap-2 text-sm">
                <span className="text-[var(--color-accent)] mt-0.5">&rsaquo;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel label="Exploring">
          <div className="flex flex-wrap gap-1.5">
            {current.exploring.map((item) => (
              <span
                key={item}
                className="rounded-md bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-xs px-2.5 py-1 font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </Panel>

        <Panel label="Status">
          <div className="flex items-center gap-2 h-full">
            <span className="live-dot" />
            <p className="text-sm">{current.statusNote}</p>
          </div>
        </Panel>
      </div>
    </section>
  );
}
