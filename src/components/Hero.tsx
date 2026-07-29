import { motion } from "framer-motion";
import { profile, status } from "../data/content";
import { Github, Linkedin, Mail, FileText, X as XIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-12 pb-14 md:pt-16 md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="mono-label mb-4">Backend Software Engineer</p>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.08] mb-4 max-w-3xl">
          {profile.name}
        </h1>

        <p className="text-base md:text-lg text-[var(--color-slate)] max-w-xl leading-relaxed mb-7">
          {profile.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-2.5 mb-7">
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-ink)] text-[var(--color-bg)] px-4 py-2 text-sm font-medium hover:opacity-85 transition-opacity"
          >
            <FileText size={14} />
            Resume
          </a>
          <a
            href={profile.github}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium hover:border-[var(--color-ink)] transition-colors"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium hover:border-[var(--color-ink)] transition-colors"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            href={profile.x}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium hover:border-[var(--color-ink)] transition-colors"
          >
            <XIcon size={14} />
            X
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium hover:border-[var(--color-ink)] transition-colors"
          >
            <Mail size={14} />
            Email
          </a>
        </div>

        {/* Signature element: status bar */}
        <div className="inline-flex flex-wrap items-center gap-x-5 gap-y-1.5 rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5">
          <span className="flex items-center gap-2">
            <span className="live-dot" />
            <span className="mono-label text-[var(--color-live)]">{status.state}</span>
          </span>
          <span className="h-3 w-px bg-[var(--color-border)] hidden sm:block" />
          <span className="mono-label">
            FOCUS: <span className="text-[var(--color-ink)]">{status.focus}</span>
          </span>
          <span className="h-3 w-px bg-[var(--color-border)] hidden sm:block" />
          <span className="mono-label">
            ROLE: <span className="text-[var(--color-ink)]">{status.role}</span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}
