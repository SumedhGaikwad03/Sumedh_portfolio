import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/40 mt-12">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terminal)]" />
          <p className="mono-label text-[11px] text-[var(--color-slate-light)]">
            © {new Date().getFullYear()} {profile.name} // ALL SYSTEMS OPERATIONAL
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-xs font-mono text-[var(--color-slate)]">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--color-terminal)] transition-colors">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--color-terminal)] transition-colors">
            LinkedIn
          </a>
          <a href={profile.x} target="_blank" rel="noreferrer" className="hover:text-[var(--color-terminal)] transition-colors">
            X
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-[var(--color-terminal)] transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
