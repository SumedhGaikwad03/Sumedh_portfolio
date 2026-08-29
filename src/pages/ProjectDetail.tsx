import { useParams, Link, Navigate } from "react-router-dom";
import { Github, ExternalLink, ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "../data/content";
import FinanceOneDossier from "../components/finance-one/FinanceOneDossier";
import AtrioDossier from "../components/atrio/AtrioDossier";
import Virtual2RealityDossier from "../components/virtual2reality/Virtual2RealityDossier";
import SmartTrafficDossier from "../components/smart-traffic/SmartTrafficDossier";
import ProjectNavigation from "../components/ProjectNavigation";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-b border-[var(--color-border)] last:border-0">
      <p className="mono-label text-[var(--color-terminal)] mb-3">// {label.toUpperCase()}</p>
      {children}
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  if (project.slug === "finance-one") {
    return <FinanceOneDossier project={project} />;
  }

  if (project.slug === "atrio") {
    return <AtrioDossier project={project} />;
  }

  if (project.slug === "virtual2reality") {
    return <Virtual2RealityDossier project={project} />;
  }

  if (project.slug === "smart-traffic-management-system") {
    return <SmartTrafficDossier project={project} />;
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-1.5 mono-label text-xs text-[var(--color-slate)] hover:text-[var(--color-terminal)] transition-colors mb-10"
      >
        <ArrowLeft size={13} />
        <span>cd .. /projects</span>
      </Link>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--color-ink)]">{project.name}</h1>
        {project.placeholder && (
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2 py-0.5">
            in progress
          </span>
        )}
      </div>
      <p className="text-base md:text-lg text-[var(--color-slate)] mb-8 leading-relaxed">{project.oneLiner}</p>

      <div className="flex flex-wrap items-center gap-3 mb-8 text-xs font-mono">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded border border-[var(--color-terminal)]/40 bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] px-3.5 py-1.5 hover:bg-[var(--color-terminal)] hover:text-[#0B0D0F] transition-all"
          >
            <ExternalLink size={13} />
            <span>Live Demo</span>
            <ArrowUpRight size={12} />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)] px-3.5 py-1.5 transition-colors"
          >
            <Github size={13} />
            <span>GitHub</span>
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.techStack.map((t) => (
          <span
            key={t}
            className="text-xs font-mono text-[var(--color-slate)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] rounded px-2.5 py-1"
          >
            {t}
          </span>
        ))}
      </div>

      <Block label="Overview">
        <p className="leading-relaxed text-[var(--color-ink)]">{project.overview}</p>
      </Block>

      <Block label="Problem">
        <p className="leading-relaxed text-[var(--color-ink)]">{project.problem}</p>
      </Block>

      <Block label="Solution">
        <p className="leading-relaxed text-[var(--color-ink)]">{project.solution}</p>
      </Block>

      <Block label="Architecture">
        <p className="leading-relaxed text-[var(--color-ink)]">{project.architecture}</p>
      </Block>

      {project.screenshots && project.screenshots.length > 0 && (
        <Block label="Screenshots">
          <div className="grid gap-4">
            {project.screenshots.map((s) => (
              <figure key={s.src}>
                <img src={s.src} alt={s.caption} className="rounded border border-[var(--color-border)] w-full" />
                <figcaption className="mt-2 text-xs font-mono text-[var(--color-slate)]">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Block>
      )}

      <Block label="Engineering Decisions">
        <ul className="space-y-2">
          {project.engineeringDecisions.map((d) => (
            <li key={d} className="flex gap-2.5 leading-relaxed text-sm text-[var(--color-slate)]">
              <span className="text-[var(--color-terminal)] font-mono">&rsaquo;</span>
              <span className="text-[var(--color-ink)]">{d}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Challenges">
        <ul className="space-y-2">
          {project.challenges.map((c) => (
            <li key={c} className="flex gap-2.5 leading-relaxed text-sm text-[var(--color-slate)]">
              <span className="text-[var(--color-terminal)] font-mono">&rsaquo;</span>
              <span className="text-[var(--color-ink)]">{c}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Lessons Learned">
        <ul className="space-y-2">
          {project.lessonsLearned.map((l) => (
            <li key={l} className="flex gap-2.5 leading-relaxed text-sm text-[var(--color-slate)]">
              <span className="text-[var(--color-terminal)] font-mono">&rsaquo;</span>
              <span className="text-[var(--color-ink)]">{l}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Future Improvements">
        <ul className="space-y-2">
          {project.futureImprovements.map((f) => (
            <li key={f} className="flex gap-2.5 leading-relaxed text-sm text-[var(--color-slate)]">
              <span className="text-[var(--color-terminal)] font-mono">&rsaquo;</span>
              <span className="text-[var(--color-ink)]">{f}</span>
            </li>
          ))}
        </ul>
      </Block>

      <ProjectNavigation currentSlug={project.slug} />
    </article>
  );
}
