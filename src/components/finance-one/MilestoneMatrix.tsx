import { CheckCircle2, Clock, Cpu } from "lucide-react";

interface Milestone {
  area: string;
  status: "READY" | "PROTOTYPE" | "FUTURE";
  tag: string;
  scope: string[];
  deliverable: string;
}

const milestones: Milestone[] = [
  {
    area: "Core Ledger & Business Logic",
    status: "READY",
    tag: "MVP 1 BASELINE",
    scope: [
      "User Authentication (JWT + bcrypt)",
      "User-Scoped Transaction CRUD (11 Categories, 3 Priorities)",
      "Period-Based Budgets (Weekly / Monthly / Quarterly)",
      "Domain Budget Lock & Overlap Prevention",
      "Decimal Financial Analytics & Dashboard Engine",
      "Multi-Tenant Isolation & 404 Anti-Enumeration",
    ],
    deliverable: "Express REST API & PostgreSQL / Prisma Schema (apps/server)",
  },
  {
    area: "AI & Vector Search Subsystem",
    status: "PROTOTYPE",
    tag: "FOUNDATION LAYER",
    scope: [
      "pgvector 2560-dim Storage (SkillEmbedding)",
      "Semantic Skill Matching with 0.70 Confidence Gating",
      "Ollama Qwen3 Structured JSON Query Extractor",
      "Relative & Calendar Date Range Resolution",
      "TransactionQuery Contract & LIST Execution",
    ],
    deliverable: "Service Pipeline & Verified tsx Test Runners",
  },
  {
    area: "AI Public API & Aggregations",
    status: "FUTURE",
    tag: "ROADMAP STAGE 2",
    scope: [
      "Mount Public /api/ai/query Route in Express Router",
      "Full Execution for SUM, COUNT, MAX, MIN Operations",
      "Multi-Turn Conversational Explanations",
      "Grounded Citation & Context Token Assembly",
    ],
    deliverable: "Public Conversational Query Endpoint",
  },
  {
    area: "Client Application & Deployment",
    status: "FUTURE",
    tag: "ROADMAP STAGE 3",
    scope: [
      "React + Vite Web Interface",
      "TanStack Query Cache Invalidation & Mutations",
      "React Hook Form + Client-Side Zod Schemas",
      "Docker Production Containerization",
    ],
    deliverable: "Full-Stack Single Page Application",
  },
];

export default function MilestoneMatrix() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {milestones.map((m) => {
          const isReady = m.status === "READY";
          const isPrototype = m.status === "PROTOTYPE";

          return (
            <div
              key={m.area}
              className={`rounded border p-5 flex flex-col justify-between transition-all duration-150 ${
                isReady
                  ? "border-[var(--color-terminal)]/30 bg-[var(--color-surface)]"
                  : isPrototype
                  ? "border-[var(--color-accent)]/30 bg-[var(--color-surface)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)]/60 opacity-85"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`mono-label text-[10px] px-2 py-0.5 rounded border font-mono ${
                      isReady
                        ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                        : isPrototype
                        ? "text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]"
                        : "text-[var(--color-slate-light)] border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
                    }`}
                  >
                    [{m.status} // {m.tag}]
                  </span>
                  {isReady ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--color-terminal)]">
                      <CheckCircle2 size={13} />
                      <span>COMPLETE</span>
                    </span>
                  ) : isPrototype ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--color-accent)]">
                      <Cpu size={13} />
                      <span>PROTOTYPE</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--color-slate-light)]">
                      <Clock size={13} />
                      <span>PLANNED</span>
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-[var(--color-ink)] mb-3">
                  {m.area}
                </h4>

                <ul className="space-y-1.5 mb-4 text-xs font-mono text-[var(--color-slate)]">
                  {m.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 ${
                          isReady
                            ? "text-[var(--color-terminal)]"
                            : isPrototype
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-slate-light)]"
                        }`}
                      >
                        &rsaquo;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[var(--color-border-subtle)] text-[11px] font-mono text-[var(--color-slate-light)] flex items-center justify-between">
                <span>Deliverable:</span>
                <span className="text-[var(--color-ink)] font-medium text-right max-w-[65%] truncate">
                  {m.deliverable}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
