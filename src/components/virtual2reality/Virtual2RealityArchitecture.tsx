import { useState } from "react";
import { Layers, Shield, CheckCircle2 } from "lucide-react";

interface ArchLayer {
  id: string;
  name: string;
  files: string[];
  responsibility: string;
  invariant: string;
  security: string;
}

const layers: ArchLayer[] = [
  {
    id: "frontend",
    name: "01 // React 19 Frontend & Public Shell",
    files: ["frontend/src/pages/*", "frontend/src/services/query-builder.ts", "frontend/src/api/*"],
    responsibility: "Public luxury showcase views, guided property discovery assistant, and Admin CMS portal with ProtectedRoute guards.",
    invariant: "Native Fetch API clients with AbortSignal cancellation prevent stale search race conditions.",
    security: "Admin token stored in localStorage, verified via AuthContext before mounting admin routes.",
  },
  {
    id: "http_boundary",
    name: "02 // HTTP Security & Routing Layer",
    files: ["backend/src/app.ts", "backend/src/routes/public/*", "backend/src/routes/admin/*"],
    responsibility: "Express 5 routing, Helmet security headers, CORS origin whitelisting, and rate-limited lead ingestion endpoints.",
    invariant: "Express Rate Limit enforces max 20 lead submissions per 15-minute window to block spam campaigns.",
    security: "Helmet disables MIME-sniffing (nosniff) and enforces strict cross-origin resource policies.",
  },
  {
    id: "controllers",
    name: "03 // Controller Layer (Zero DB Leakage)",
    files: ["backend/src/controllers/public/*", "backend/src/controllers/admin/*"],
    responsibility: "Extracts request params, maps DTOs, delegates to domain services, and handles HTTP response serialization.",
    invariant: "Controllers never execute Prisma queries directly, maintaining strict separation of concerns.",
    security: "Explicit BigInt-to-string serialization prevents JSON runtime serialization crashes.",
  },
  {
    id: "services",
    name: "04 // Domain Business Services",
    files: ["backend/src/services/import/scraper.ts", "backend/src/services/lead.service.ts", "backend/src/services/search/*"],
    responsibility: "SSRF-hardened listing scraping, paise-accurate currency normalization, lead relationship resolution, and admin auth.",
    invariant: "Lead context auto-populates parent developerId and projectId directly from verified database configurations.",
    security: "Scraper asserts safe DNS resolution and validates IP addresses against private subnet blacklists.",
  },
  {
    id: "repositories",
    name: "05 // Repository Layer (Prisma ORM)",
    files: ["backend/src/repositories/search.repository.ts", "backend/src/repositories/lead.repository.ts"],
    responsibility: "Constructs dynamic Prisma queries, applies bounded query limits (take: 50), and structures nested relation graphs.",
    invariant: "Enforces double-publication filter: project.publishStatus=PUBLISHED AND developer.publishStatus=PUBLISHED.",
    security: "Zero raw unsanitized SQL; all queries parameterized through Prisma type-safe builders.",
  },
  {
    id: "persistence",
    name: "06 // PostgreSQL & Cloudinary Storage",
    files: ["prisma/schema.prisma", "backend/src/lib/cloudinary.ts", "backend/googlesheets.js"],
    responsibility: "PostgreSQL relational persistence, Cloudinary buffer streaming, and Google Sheets CRM sync.",
    invariant: "Multer memory buffers stream directly to Cloudinary without saving temporary files to container disk.",
    security: "Google Sheets service account credentials isolate agency spreadsheet sync.",
  },
];

export default function Virtual2RealityArchitecture() {
  const [activeLayer, setActiveLayer] = useState<string>("services");
  const [viewMode, setViewMode] = useState<"PUBLIC" | "ADMIN">("PUBLIC");

  const selected = layers.find((l) => l.id === activeLayer) || layers[3];

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // ARCHITECTURE::MODULAR_MONOLITH
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            Domain-Driven 6-Tier System Architecture
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode("PUBLIC")}
            className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors ${
              viewMode === "PUBLIC"
                ? "border-[var(--color-terminal)] bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] font-bold"
                : "border-[var(--color-border)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
            }`}
          >
            PUBLIC DISCOVERY FLOW
          </button>
          <button
            type="button"
            onClick={() => setViewMode("ADMIN")}
            className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors ${
              viewMode === "ADMIN"
                ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-bold"
                : "border-[var(--color-border)] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
            }`}
          >
            ADMIN INGESTION FLOW
          </button>
        </div>
      </div>

      {/* Mode Flow Banner */}
      <div className="p-3.5 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] font-mono text-xs text-[var(--color-slate)]">
        {viewMode === "PUBLIC" ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[var(--color-terminal)] font-bold">PUBLIC PIPELINE:</span>
            <span>Home</span> &rarr;
            <span>Natural Language / Guided Search</span> &rarr;
            <span>Developer Portfolio</span> &rarr;
            <span>Project Overview</span> &rarr;
            <span>Configuration Floor Plans</span> &rarr;
            <span>Context-Aware Lead Enquiry</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[var(--color-accent)] font-bold">ADMIN PIPELINE:</span>
            <span>JWT Login</span> &rarr;
            <span>Dashboard</span> &rarr;
            <span>SSRF-Hardened Scraper Import</span> &rarr;
            <span>Project & Configuration CMS</span> &rarr;
            <span>Cloudinary Media Manager</span> &rarr;
            <span>Lead Triage</span>
          </div>
        )}
      </div>

      {/* Interactive Layer Explorer */}
      <div className="grid lg:grid-cols-12 gap-6 pt-2">
        {/* Layer Selector */}
        <div className="lg:col-span-6 space-y-2.5">
          {layers.map((layer) => {
            const isSelected = layer.id === activeLayer;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayer(layer.id)}
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

        {/* Dynamic Detail Inspector */}
        <div className="lg:col-span-6 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 mb-3">
              <h4 className="text-sm font-bold font-mono text-[var(--color-ink)] flex items-center gap-2">
                <Layers size={14} className="text-[var(--color-terminal)]" />
                <span>{selected.name}</span>
              </h4>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="mono-label text-[10px] text-[var(--color-slate-light)] block mb-1">
                  RESPONSIBILITY & WORKFLOW:
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed">
                  {selected.responsibility}
                </p>
              </div>

              <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-terminal)] font-mono font-semibold block mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={12} />
                  <span>DATA INVARIANT:</span>
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed font-mono text-[11px]">
                  {selected.invariant}
                </p>
              </div>

              <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-accent)] font-mono font-semibold block mb-1 flex items-center gap-1.5">
                  <Shield size={12} />
                  <span>SECURITY & ACCESS CONTROL:</span>
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed font-mono text-[11px]">
                  {selected.security}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 pt-3 border-t border-[var(--color-border-subtle)] flex flex-wrap gap-1.5">
            <span className="mono-label text-[10px] text-[var(--color-slate-light)] mr-1 self-center">SOURCE FILES:</span>
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
