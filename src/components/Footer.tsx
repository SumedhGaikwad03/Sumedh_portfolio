import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="mono-label">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex gap-6 text-sm text-[var(--color-slate)]">
          <a href={profile.github} className="hover:text-[var(--color-ink)] transition-colors">
            GitHub
          </a>
          <a href={profile.linkedin} className="hover:text-[var(--color-ink)] transition-colors">
            LinkedIn
          </a>
          <a href={profile.x} className="hover:text-[var(--color-ink)] transition-colors">
            X
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-[var(--color-ink)] transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
