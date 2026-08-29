import { useState } from "react";
import { Shield, Layers, CheckCircle2 } from "lucide-react";

interface LayerInfo {
  id: string;
  name: string;
  files: string[];
  responsibility: string;
  invariant: string;
  security: string;
}

const layers: LayerInfo[] = [
  {
    id: "routes",
    name: "01 // Route & Middleware Layer",
    files: ["src/routes/*.routes.ts", "src/middleware/auth.middleware.ts"],
    responsibility: "HTTP endpoint registration, async error wrapping, and JWT token authentication.",
    invariant: "Bearer tokens decoded via jsonwebtoken; req.user.userId populated before controller access.",
    security: "401 Unauthorized thrown immediately if token is missing, malformed, or expired.",
  },
  {
    id: "controllers",
    name: "02 // Controller Layer",
    files: ["src/controllers/*.controller.ts", "src/schemas/*.schema.ts"],
    responsibility: "Request payload parsing, boundary validation with Zod v4, and response serialization.",
    invariant: "Strict Zod schemas enforce positive decimals, valid enum values, and ISO date boundaries.",
    security: "Invalid payloads rejected at boundary with 400 Bad Request before hitting domain services.",
  },
  {
    id: "services",
    name: "03 // Domain Service & Analytics Layer",
    files: ["src/services/budget.service.ts", "src/services/analytics.services.ts", "src/services/dashboard.service.ts"],
    responsibility: "Domain business rules, budget locking invariants, overlap calculations, and decimal analytics.",
    invariant: "Budget modification blocked if isLocked=true (BudgetLockedError); periods checked for temporal collisions.",
    security: "Ownership verified against req.user.userId; non-matching resources return 404 (anti-enumeration).",
  },
  {
    id: "repositories",
    name: "04 // Repository Layer",
    files: ["src/repositories/transaction.repository.ts", "src/repositories/budget.repository.ts"],
    responsibility: "Data access abstraction isolating Prisma queries and query filter constructions from business logic.",
    invariant: "All lookups and aggregations strictly parameterize { where: { userId } }.",
    security: "No raw unsanitized queries; multi-tenant row-level isolation guaranteed at data boundary.",
  },
  {
    id: "database",
    name: "05 // Database & Vector Storage",
    files: ["prisma/schema.prisma", "docker-compose.yml (pgvector/pgvector:pg18)"],
    responsibility: "Transactional ledger persistence and pgvector high-dimensional vector embeddings.",
    invariant: "Prisma.Decimal prevents IEEE-754 binary floating-point roundoff errors.",
    security: "Relational foreign keys enforce CASCADE constraints; unique index @@unique([skillId, exampleText]).",
  },
];

export default function SystemArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState<string>("services");
  const selected = layers.find((l) => l.id === activeLayer) || layers[2];

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4 mb-6">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // ARCHITECTURE::BACKEND_PIPELINE
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            5-Tier Layered System Architecture
          </h3>
        </div>
        <span className="mono-label text-[10px] text-[var(--color-slate-light)] font-mono border border-[var(--color-border)] bg-[var(--color-surface-elevated)] rounded px-2 py-0.5">
          INTERACTIVE EXPLORER
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Visual Pipeline Stack */}
        <div className="lg:col-span-6 space-y-2.5">
          {layers.map((layer) => {
            const isSelected = layer.id === activeLayer;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayer(layer.id)}
                onMouseEnter={() => setActiveLayer(layer.id)}
                className={`w-full text-left p-3.5 rounded border transition-all duration-150 flex items-center justify-between group ${
                  isSelected
                    ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(126,231,135,0.1)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected
                        ? "bg-[var(--color-terminal)] shadow-[0_0_6px_var(--color-terminal)]"
                        : "bg-[var(--color-border-bright)] group-hover:bg-[var(--color-slate)]"
                    }`}
                  />
                  <div>
                    <span className="text-xs font-mono font-bold text-[var(--color-ink)] block">
                      {layer.name}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-slate-light)]">
                      {layer.files[0]}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isSelected
                      ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                      : "text-[var(--color-slate)] border-[var(--color-border-subtle)]"
                  }`}
                >
                  {isSelected ? "ACTIVE" : "INSPECT"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="lg:col-span-6 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 mb-4">
              <h4 className="text-sm font-bold font-mono text-[var(--color-ink)] flex items-center gap-2">
                <Layers size={14} className="text-[var(--color-terminal)]" />
                <span>{selected.name}</span>
              </h4>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="mono-label text-[10px] text-[var(--color-slate-light)] block mb-1">
                  RESPONSIBILITY & SCOPE:
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed">
                  {selected.responsibility}
                </p>
              </div>

              <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-terminal)] font-mono font-semibold block mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={12} />
                  <span>DOMAIN INVARIANT:</span>
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed font-mono text-[11px]">
                  {selected.invariant}
                </p>
              </div>

              <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-accent)] font-mono font-semibold block mb-1 flex items-center gap-1.5">
                  <Shield size={12} />
                  <span>SECURITY & ISOLATION:</span>
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed font-mono text-[11px]">
                  {selected.security}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex flex-wrap gap-1.5">
            <span className="mono-label text-[10px] text-[var(--color-slate-light)] mr-1 self-center">FILES:</span>
            {selected.files.map((f) => (
              <span
                key={f}
                className="text-[10px] font-mono text-[var(--color-slate)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-1.5 py-0.5"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
