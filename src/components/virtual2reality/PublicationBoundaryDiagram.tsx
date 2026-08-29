import { useState } from "react";
import { Database } from "lucide-react";

export default function PublicationBoundaryDiagram() {
  const [developerStatus, setDeveloperStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [projectStatus, setProjectStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");

  const isPubliclyVisible = developerStatus === "PUBLISHED" && projectStatus === "PUBLISHED";

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // DATA_ISOLATION::PUBLICATION_BOUNDARY
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            Relational Multi-Tier Publication Isolation
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
            [ZERO DRAFT DATA LEAKAGE]
          </span>
        </div>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        Real estate platforms manage staging projects and unverified developer portfolios that must remain invisible to public buyers. A naive query checking only <code className="text-[var(--color-accent)] font-mono">project.publishStatus === 'PUBLISHED'</code> can inadvertently expose projects whose parent developer profile is in <code className="text-[var(--color-accent)] font-mono">DRAFT</code> status. Virtual2Reality enforces publication boundaries across the entire relational hierarchy in Prisma repositories.
      </p>

      {/* Interactive Publication Matrix */}
      <div className="grid lg:grid-cols-12 gap-6 pt-2">
        {/* Left: State Controller */}
        <div className="lg:col-span-6 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 space-y-4">
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] block font-mono">
            INTERACTIVE PUBLICATION STATUS SIMULATOR:
          </span>

          {/* Developer Control */}
          <div className="p-3.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--color-ink)]">
                Parent Entity: Developer
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  developerStatus === "PUBLISHED"
                    ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                    : "text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]"
                }`}
              >
                {developerStatus}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeveloperStatus("PUBLISHED")}
                className={`flex-1 py-1.5 px-3 rounded text-xs font-mono border transition-colors ${
                  developerStatus === "PUBLISHED"
                    ? "border-[var(--color-terminal)] bg-[var(--color-terminal)]/20 text-[var(--color-terminal)] font-bold"
                    : "border-[var(--color-border)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                }`}
              >
                Set PUBLISHED
              </button>
              <button
                type="button"
                onClick={() => setDeveloperStatus("DRAFT")}
                className={`flex-1 py-1.5 px-3 rounded text-xs font-mono border transition-colors ${
                  developerStatus === "DRAFT"
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-bold"
                    : "border-[var(--color-border)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                }`}
              >
                Set DRAFT
              </button>
            </div>
          </div>

          {/* Project Control */}
          <div className="p-3.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--color-ink)]">
                Child Entity: Project
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  projectStatus === "PUBLISHED"
                    ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                    : "text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]"
                }`}
              >
                {projectStatus}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setProjectStatus("PUBLISHED")}
                className={`flex-1 py-1.5 px-3 rounded text-xs font-mono border transition-colors ${
                  projectStatus === "PUBLISHED"
                    ? "border-[var(--color-terminal)] bg-[var(--color-terminal)]/20 text-[var(--color-terminal)] font-bold"
                    : "border-[var(--color-border)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                }`}
              >
                Set PUBLISHED
              </button>
              <button
                type="button"
                onClick={() => setProjectStatus("DRAFT")}
                className={`flex-1 py-1.5 px-3 rounded text-xs font-mono border transition-colors ${
                  projectStatus === "DRAFT"
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-bold"
                    : "border-[var(--color-border)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                }`}
              >
                Set DRAFT
              </button>
            </div>
          </div>
        </div>

        {/* Right: Evaluated Discovery Outcome */}
        <div className="lg:col-span-6 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 mb-3">
              <h4 className="text-sm font-bold font-mono text-[var(--color-ink)] flex items-center gap-2">
                <Database size={14} className="text-[var(--color-terminal)]" />
                <span>Public Search & Catalog Evaluation</span>
              </h4>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isPubliclyVisible
                    ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                    : "text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]"
                }`}
              >
                {isPubliclyVisible ? "DISCOVERABLE ✓" : "BLOCKED ✕"}
              </span>
            </div>

            <div className="rounded bg-[#0B0D0F] p-3.5 border border-[var(--color-border-subtle)] font-mono text-xs text-[var(--color-ink)] space-y-1 overflow-x-auto">
              <span className="text-[var(--color-slate-light)]">// Prisma Repository Filter:</span>
              <div>prisma.configuration.findMany(&#123;</div>
              <div className="pl-4 text-[var(--color-slate)]">where: &#123;</div>
              <div className="pl-8 text-[var(--color-slate)]">
                project: &#123;
              </div>
              <div className="pl-12">
                publishStatus: <span className={projectStatus === "PUBLISHED" ? "text-[var(--color-terminal)]" : "text-[var(--color-accent)]"}>"{projectStatus}"</span>,
              </div>
              <div className="pl-12 text-[var(--color-slate)]">
                developer: &#123;
              </div>
              <div className="pl-16">
                publishStatus: <span className={developerStatus === "PUBLISHED" ? "text-[var(--color-terminal)]" : "text-[var(--color-accent)]"}>"{developerStatus}"</span>
              </div>
              <div className="pl-12 text-[var(--color-slate)]">&#125;</div>
              <div className="pl-8 text-[var(--color-slate)]">&#125;</div>
              <div className="pl-4 text-[var(--color-slate)]">&#125;</div>
              <div>&#125;)</div>
            </div>
          </div>

          <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[11px] font-mono text-[var(--color-slate)] leading-relaxed">
            {isPubliclyVisible ? (
              <span className="text-[var(--color-terminal)]">
                &bull; Both Developer and Project are PUBLISHED. Unit configurations, floor plans, and pricing render in public search results and showcase pages.
              </span>
            ) : (
              <span className="text-[var(--color-accent)]">
                &bull; Publication boundary triggered. Because {developerStatus === "DRAFT" ? "Developer is DRAFT" : "Project is DRAFT"}, Prisma query excludes all configurations from public responses.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
