import { useParams, Link, Navigate } from "react-router-dom";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { projects } from "../data/content";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-b border-[var(--color-border)] last:border-0">
      <p className="mono-label mb-3">{label}</p>
      {children}
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-1.5 mono-label mb-10 hover:text-[var(--color-ink)] transition-colors"
      >
        <ArrowLeft size={14} /> back to projects
      </Link>

      <div className="mb-2 flex items-center gap-3">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{project.name}</h1>
        {project.placeholder && (
          <span className="mono-label text-[var(--color-slate-light)] border border-[var(--color-border)] rounded px-2 py-0.5">
            in progress
          </span>
        )}
      </div>
      <p className="text-lg text-[var(--color-slate)] mb-8">{project.oneLiner}</p>

      <div className="flex flex-wrap items-center gap-5 mb-10 text-sm">
        {project.github && (
          <a
            href={project.github}
            className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--color-accent)] transition-colors"
          >
            <Github size={15} /> GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--color-accent)] transition-colors"
          >
            <ExternalLink size={15} /> Live Demo
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((t) => (
          <span
            key={t}
            className="text-xs font-medium text-[var(--color-slate)] border border-[var(--color-border)] rounded px-2 py-1"
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
                <img src={s.src} alt={s.caption} className="rounded-lg border border-[var(--color-border)] w-full" />
                <figcaption className="mt-2 text-sm text-[var(--color-slate)]">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Block>
      )}

      <Block label="Engineering Decisions">
        <ul className="space-y-2">
          {project.engineeringDecisions.map((d) => (
            <li key={d} className="flex gap-2 leading-relaxed">
              <span className="text-[var(--color-accent)]">&rsaquo;</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Challenges">
        <ul className="space-y-2">
          {project.challenges.map((c) => (
            <li key={c} className="flex gap-2 leading-relaxed">
              <span className="text-[var(--color-accent)]">&rsaquo;</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Lessons Learned">
        <ul className="space-y-2">
          {project.lessonsLearned.map((l) => (
            <li key={l} className="flex gap-2 leading-relaxed">
              <span className="text-[var(--color-accent)]">&rsaquo;</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Future Improvements">
        <ul className="space-y-2">
          {project.futureImprovements.map((f) => (
            <li key={f} className="flex gap-2 leading-relaxed">
              <span className="text-[var(--color-accent)]">&rsaquo;</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </Block>
    </article>
  );
}
