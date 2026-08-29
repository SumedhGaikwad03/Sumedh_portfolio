import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, X as XIcon, ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { profile } from "../data/content";
import { useViewMode } from "../context/useViewMode";

const items = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "X", href: profile.x, icon: XIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "Resume", href: profile.resumeUrl, icon: FileText },
];

export default function Contact() {
  const { mode } = useViewMode();

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader
        index={mode === "ENGINEERING" ? "10" : "07"}
        title="Contact & Links"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
      >
        {items.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center justify-between gap-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-3 hover:border-[var(--color-terminal)] group transition-all"
          >
            <div className="flex items-center gap-2">
              <Icon size={14} className="text-[var(--color-terminal)]" />
              <span className="font-mono text-xs font-medium text-[var(--color-ink)] group-hover:text-[var(--color-terminal)] transition-colors">{label}</span>
            </div>
            <ArrowUpRight size={11} className="text-[var(--color-slate-light)] group-hover:text-[var(--color-terminal)] transition-colors" />
          </a>
        ))}
      </motion.div>
    </section>
  );
}
