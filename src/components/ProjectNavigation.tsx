import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { projectsData } from "../data/projects";

interface ProjectNavigationProps {
  currentSlug: string;
}

export default function ProjectNavigation({ currentSlug }: ProjectNavigationProps) {
  const currentIndex = projectsData.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return null;

  const prevProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  return (
    <nav
      aria-label="Project Pagination"
      className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs"
    >
      {/* Previous Project */}
      <Link
        to={`/projects/${prevProject.slug}`}
        className="w-full sm:w-auto flex items-center gap-2 p-2.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-terminal)] hover:text-[var(--color-terminal)] text-[var(--color-ink)] transition-colors group"
      >
        <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
        <div className="text-left">
          <span className="text-[10px] text-[var(--color-slate-light)] block">// PREV_SYSTEM</span>
          <span className="font-semibold">{prevProject.name}</span>
        </div>
      </Link>

      {/* Return to Selected Work */}
      <Link
        to="/#projects"
        className="inline-flex items-center gap-1.5 text-[var(--color-terminal)] hover:underline py-1.5 px-3 rounded bg-[var(--color-terminal-soft)] border border-[var(--color-terminal)]/30"
      >
        <Layers size={13} />
        <span>BACK TO SELECTED WORK</span>
      </Link>

      {/* Next Project */}
      <Link
        to={`/projects/${nextProject.slug}`}
        className="w-full sm:w-auto flex items-center justify-end gap-2 p-2.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-terminal)] hover:text-[var(--color-terminal)] text-[var(--color-ink)] transition-colors group text-right"
      >
        <div>
          <span className="text-[10px] text-[var(--color-slate-light)] block">// NEXT_SYSTEM</span>
          <span className="font-semibold">{nextProject.name}</span>
        </div>
        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </nav>
  );
}
