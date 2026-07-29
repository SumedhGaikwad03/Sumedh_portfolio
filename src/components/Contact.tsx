import { Github, Linkedin, Mail, FileText, X as XIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { profile } from "../data/content";

const items = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "X", href: profile.x, icon: XIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "Resume", href: profile.resumeUrl, icon: FileText },
];

export default function Contact() {
  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader index="07" title="Contact" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {items.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-2.5 rounded-lg border border-[var(--color-border)] bg-white px-4 py-3.5 hover:border-[var(--color-ink)] transition-colors"
          >
            <Icon size={15} className="text-[var(--color-accent)]" />
            <span className="font-medium text-sm">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
