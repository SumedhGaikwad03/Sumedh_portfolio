import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { profile } from "../data/content";

const links = [
  { href: "/#about", label: "Summary" },
  { href: "/#projects", label: "Projects" },
  { href: "/#academics", label: "Academics" },
  { href: "/#current", label: "Current" },
  { href: "/#experience", label: "Experience" },
  { href: "/#technologies", label: "Tech" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur border-b border-[var(--color-border)]">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-[15px]">
          {profile.name}
        </Link>

        {isHome ? (
          <ul className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="mono-label hover:text-[var(--color-ink)] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <Link to="/" className="mono-label hover:text-[var(--color-ink)] transition-colors">
            &larr; back
          </Link>
        )}

        <div className="flex items-center gap-2">
          <a
            href={profile.resumeUrl}
            className="hidden sm:inline-flex items-center rounded-md border border-[var(--color-ink)] px-3.5 py-1.5 text-sm font-medium hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors"
          >
            Resume
          </a>

          {isHome && (
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center rounded-md border border-[var(--color-border)] w-9 h-9 hover:border-[var(--color-ink)] transition-colors"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}
        </div>
      </nav>

      {isHome && open && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <ul className="max-w-5xl mx-auto px-6 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="mono-label block py-2 hover:text-[var(--color-ink)] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center rounded-md border border-[var(--color-ink)] px-3.5 py-1.5 text-sm font-medium"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
