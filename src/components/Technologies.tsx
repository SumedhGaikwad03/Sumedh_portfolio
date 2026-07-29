import SectionHeader from "./SectionHeader";
import { technologies } from "../data/content";

export default function Technologies() {
  return (
    <section id="technologies" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader index="06" title="Technologies I Work With" />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
        {technologies.map((group) => (
          <div key={group.label}>
            <p className="mono-label mb-2">{group.label}</p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
