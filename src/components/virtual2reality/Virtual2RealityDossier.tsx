import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import CurrencyModelingSpotlight from "./CurrencyModelingSpotlight";
import SsrfScraperPipeline from "./SsrfScraperPipeline";
import PublicationBoundaryDiagram from "./PublicationBoundaryDiagram";
import Virtual2RealityArchitecture from "./Virtual2RealityArchitecture";
import DecisionCard from "../finance-one/DecisionCard";
import type { DecisionProps } from "../finance-one/DecisionCard";
import ProjectNavigation from "../ProjectNavigation";
import type { Project } from "../../data/content";

const vrDecisions: DecisionProps[] = [
  {
    id: "01",
    title: "BigInt Currency Representation in Paise",
    category: "Financial Correctness",
    decision: "All property configuration pricing is parsed from Crores/Lakhs and stored as 64-bit integer paise (BigInt) in PostgreSQL.",
    why: "Binary floating-point arithmetic (IEEE-754) suffers from cumulative precision roundoff when normalizing multi-crore real estate values. Paise integers guarantee 100% accounting accuracy.",
    tradeoff: "Requires explicit BigInt-to-string serialization (priceFrom.toString()) at the controller boundary because JSON.stringify does not natively support BigInt.",
  },
  {
    id: "02",
    title: "DNS-Level Pre-Flight SSRF Defense",
    category: "Security Engineering",
    decision: "Executing asynchronous DNS resolution and private/loopback IP validation before initiating external scraper HTTP requests.",
    why: "Prevents administrative listing ingestion tools from being exploited to execute Server-Side Request Forgery attacks against internal cloud metadata (AWS/GCP) or Docker network bridges.",
    tradeoff: "Adds an asynchronous network resolution step and strict 10s AbortSignal timeout prior to initiating page fetches.",
  },
  {
    id: "03",
    title: "Relational Multi-Tier Publication Boundary",
    category: "Data Isolation",
    decision: "Public search queries enforce that both the Project and its parent Developer entity must have publishStatus === 'PUBLISHED'.",
    why: "Guarantees that draft developer profiles or staging project inventories never leak to public property buyers or search discovery endpoints.",
    tradeoff: "Requires multi-relation nested join conditions in Prisma repository queries.",
  },
  {
    id: "04",
    title: "Cloudinary Memory Buffer Streaming",
    category: "Media Infrastructure",
    decision: "Multer parses file uploads into memory buffers that stream directly to Cloudinary upload streams without local disk persistence.",
    why: "Keeps the backend stateless, container-friendly, and eliminates orphan file management on temporary container filesystems.",
    tradeoff: "Consumes server RAM during active uploads, necessitating strict file size caps (50MB video, 10MB image/document).",
  },
  {
    id: "05",
    title: "Authoritative Lead Context Resolution",
    category: "Relational Integrity",
    decision: "The server resolves parent developerId and projectId authoritatively from the verified configurationId rather than trusting client-supplied IDs.",
    why: "Prevents malicious or accidental cross-developer ownership mismatches and ensures CRM syncs always bind to genuine property entities.",
    tradeoff: "Requires hierarchical database lookups during lead creation to resolve and validate parent ownership chains.",
  },
];

const milestoneStatuses = [
  { name: "Public Discovery Showcase & Assistant", status: "COMPLETE", desc: "Home branding, developer portfolios, project pages, and rule-based search assistant." },
  { name: "Admin Management CMS Portal", status: "COMPLETE", desc: "JWT-authenticated portal for developers, projects, unit configurations, and media." },
  { name: "SSRF-Hardened Listing Ingestion", status: "COMPLETE", desc: "DNS pre-flight validation, 2MB byte cap, and JSON-LD/HTML metadata extraction." },
  { name: "Paise-Accurate Financial Engine", status: "COMPLETE", desc: "BigInt 64-bit integer normalizer converting Indian denominations to paise." },
  { name: "Cloudinary Media Asset Pipeline", status: "COMPLETE", desc: "In-memory buffer streaming across categorized slots (Hero, Floor Plans, Brochures)." },
  { name: "Context-Aware Lead CRM Pipeline", status: "COMPLETE", desc: "Hierarchical lead context resolution, rate limiting, and Google Sheets sync." },
  { name: "Full-Text Search Enhancements", status: "ACTIVE_DEVELOPMENT", desc: "Multi-attribute indexing and search catalog query optimization." },
  { name: "Self-Service Tour Scheduling", status: "ROADMAP", desc: "Direct calendar booking and automated visit confirmation." },
];

export default function Virtual2RealityDossier({ project }: { project: Project }) {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-16">
      {/* 1. Dossier Header */}
      <div>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 mono-label text-xs text-[var(--color-slate)] hover:text-[var(--color-terminal)] transition-colors mb-8"
        >
          <ArrowLeft size={13} />
          <span>cd .. /projects</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
            // DOSSIER::SYS_ARCH_03
          </span>
          <span className="mono-label text-[10px] text-[var(--color-accent)] border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] rounded px-2 py-0.5 font-mono">
            STATUS::ACTIVE_DEVELOPMENT
          </span>
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2 py-0.5 font-mono">
            TYPE::COMMERCIAL_PLATFORM
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-ink)] mb-4">
          Virtual2Reality
        </h1>
        <p className="text-base sm:text-xl text-[var(--color-slate)] leading-relaxed max-w-3xl mb-6">
          A domain-driven luxury real estate discovery platform and ingestion engine built with React 19, Express 5, Prisma, and PostgreSQL, featuring paise-accurate currency modeling and SSRF-hardened listing ingestion.
        </p>

        {/* Action Links & Tech Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded bg-[var(--color-terminal)] text-[#0B0D0F] hover:bg-[var(--color-terminal)]/90 transition-colors"
            >
              <span>LIVE PLATFORM</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="text-xs font-mono text-[var(--color-slate)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="h-px w-full bg-[var(--color-border)]" />
      </div>

      {/* 2. Core Domain Problem */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 01</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            THE REAL ESTATE INVENTORY & DISCOVERY PROBLEM
          </h2>
        </div>

        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 space-y-5">
          <h3 className="text-xl font-bold text-[var(--color-ink)]">
            Bridging Disparate Denominations, Secure Ingestion, and Relational Boundaries
          </h3>
          <p className="text-sm sm:text-base text-[var(--color-slate)] leading-relaxed">
            Real estate inventory management in high-growth property markets faces severe data integrity challenges: pricing formats fluctuate across Crores and Lakhs, unit carpet area measurements lack standardization, and developer staging inventories risk leaking to public search. Furthermore, ingesting external builder websites opens critical Server-Side Request Forgery (SSRF) vulnerabilities.
          </p>

          {/* Domain Entity Hierarchy */}
          <div className="rounded bg-[#0B0D0F] p-4 border border-[var(--color-border-subtle)] font-mono text-xs text-[var(--color-slate)] space-y-1">
            <span className="text-[var(--color-terminal)] font-bold block mb-2">
              // DOMAIN DATA MODEL HIERARCHY:
            </span>
            <div className="text-[var(--color-ink)]">DEVELOPER <span className="text-[var(--color-slate-light)]">(Brand Profile, Slugs, Status)</span></div>
            <div className="pl-4 text-[var(--color-terminal)]">&lfloor; PROJECT <span className="text-[var(--color-slate-light)]">(Location, Address, Status, Highlights, Amenities)</span></div>
            <div className="pl-8 text-[var(--color-accent)]">&lfloor; CONFIGURATION <span className="text-[var(--color-slate-light)]">(BHK, Carpet Area, Price in Paise, Availability)</span></div>
            <div className="pl-12 text-[var(--color-slate)]">&lfloor; MEDIA <span className="text-[var(--color-slate-light)]">(Cloudinary Slots: Hero, Gallery, Floor Plans, Brochures)</span></div>
            <div className="pl-12 text-[var(--color-slate)]">&lfloor; LEAD <span className="text-[var(--color-slate-light)]">(Context-Aware Enquiry, Status, Google Sheets Sync)</span></div>
          </div>
        </div>
      </section>

      {/* 3. System Architecture */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 02</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            SYSTEM ARCHITECTURE & LAYERED MODULAR MONOLITH
          </h2>
        </div>

        <Virtual2RealityArchitecture />
      </section>

      {/* 4. Paise-Accurate Financial Precision Spotlight */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 03</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            FINANCIAL INTEGRITY & PAISE-ACCURATE PRICING
          </h2>
        </div>

        <CurrencyModelingSpotlight />
      </section>

      {/* 5. SSRF Scraper Security Pipeline */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 04</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            SSRF-HARDENED PROPERTY INGESTION PIPELINE
          </h2>
        </div>

        <SsrfScraperPipeline />
      </section>

      {/* 6. Publication Boundary */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 05</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            MULTI-TIER PUBLICATION BOUNDARY & ISOLATION
          </h2>
        </div>

        <PublicationBoundaryDiagram />
      </section>

      {/* 7. Context-Aware Lead Pipeline & Admin CMS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 06</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            LEAD CONTEXT RESOLUTION & CLOUDINARY ASSET STREAMING
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-3">
            <span className="mono-label text-[10px] text-[var(--color-terminal)] block font-mono">
              [LEAD CONTEXT AUTO-RESOLUTION]
            </span>
            <h4 className="text-base font-bold text-[var(--color-ink)]">
              Authoritative Relationship Derivation
            </h4>
            <p className="text-xs text-[var(--color-slate)] leading-relaxed">
              When a user submits an enquiry from a unit configuration floor plan, <code className="text-[var(--color-terminal)]">lead.service.ts</code> verifies the configuration in PostgreSQL, derives the owning <code className="text-[var(--color-terminal)]">projectId</code>, and extracts the parent <code className="text-[var(--color-terminal)]">developerId</code>. This eliminates client-spoofing and prevents cross-developer ownership corruption before syncing with agency Google Sheets.
            </p>
          </div>

          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-3">
            <span className="mono-label text-[10px] text-[var(--color-terminal)] block font-mono">
              [MEDIA ASSET MANAGEMENT]
            </span>
            <h4 className="text-base font-bold text-[var(--color-ink)]">
              Stateless Cloudinary Buffer Streaming
            </h4>
            <p className="text-xs text-[var(--color-slate)] leading-relaxed">
              Administrative media uploads stream directly from Multer memory buffers to Cloudinary upload streams (<code className="text-[var(--color-terminal)]">uploadMediaBuffer</code>), mapping assets to designated slots (<code className="text-[var(--color-terminal)]">HERO</code>, <code className="text-[var(--color-terminal)]">GALLERY</code>, <code className="text-[var(--color-terminal)]">FLOOR_PLAN</code>, <code className="text-[var(--color-terminal)]">BROCHURE</code>). Deleting a record calls Cloudinary CDN invalidation hooks to purge cached edge assets.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Verified Engineering Decisions */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 07</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            VERIFIED ENGINEERING DECISIONS & TRADEOFFS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {vrDecisions.map((d) => (
            <DecisionCard key={d.id} {...d} />
          ))}
        </div>
      </section>

      {/* 9. Security Audit Status */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 08</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            SECURITY AUDIT MATRIX & BOUNDARIES
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="rounded border border-[var(--color-terminal)]/30 bg-[var(--color-surface)] p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2">
              <span className="text-[var(--color-terminal)] font-bold">
                [✓] VERIFIED SECURITY CONTROLS
              </span>
              <span className="text-[10px] text-[var(--color-terminal)]">VERIFIED</span>
            </div>
            <ul className="space-y-1.5 text-[var(--color-slate)]">
              <li>&bull; Admin password hashing using bcryptjs with 12 salt rounds</li>
              <li>&bull; SHA-256 password reset tokens with 15-minute expiration</li>
              <li>&bull; Pre-flight DNS IP resolution & private subnet blacklist (SSRF defense)</li>
              <li>&bull; 2MB stream byte caps & 10s AbortSignal timeouts (DoS mitigation)</li>
              <li>&bull; Rate limiting on public lead submissions (20 req / 15 min window)</li>
              <li>&bull; Helmet HTTP security headers & strict CORS origin isolation</li>
            </ul>
          </div>

          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2">
              <span className="text-[var(--color-slate-light)] font-bold">
                [!] KNOWN GAPS & ARCHITECTURAL BOUNDARIES
              </span>
              <span className="text-[10px] text-[var(--color-slate-light)]">AUDITED</span>
            </div>
            <ul className="space-y-1.5 text-[var(--color-slate)]">
              <li>&bull; Public /api/search does not mount explicit rate limiting (bounded by take: 50)</li>
              <li>&bull; Admin authentication uses standard 15m JWT tokens without refresh token rotation</li>
              <li>&bull; Search engine uses deterministic regex & rule trees (not an LLM / vector database)</li>
              <li>&bull; Single-region PostgreSQL deployment (no distributed multi-region replication)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10. Milestone Status & Technical Summary */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 09</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            MILESTONE STATUS & TECHNICAL SPECIFICATION
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Milestone List */}
          <div className="md:col-span-7 space-y-2 font-mono text-xs">
            {milestoneStatuses.map((m) => {
              const isComplete = m.status === "COMPLETE";
              const isActive = m.status === "ACTIVE_DEVELOPMENT";
              return (
                <div
                  key={m.name}
                  className="p-3 rounded border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-[var(--color-ink)] font-bold block">{m.name}</span>
                    <span className="text-[10px] text-[var(--color-slate-light)] font-sans">{m.desc}</span>
                  </div>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded border whitespace-nowrap ${
                      isComplete
                        ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                        : isActive
                        ? "text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]"
                        : "text-[var(--color-slate)] border-[var(--color-border-subtle)]"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Technical Spec Box */}
          <div className="md:col-span-5 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 space-y-3 font-mono text-xs">
            <span className="text-[var(--color-terminal)] font-bold block border-b border-[var(--color-border-subtle)] pb-2">
              // ARCHITECTURE SPEC:
            </span>
            <div className="space-y-2 text-[11px]">
              <div><span className="text-[var(--color-slate-light)]">ARCHITECTURE:</span> <strong className="text-[var(--color-ink)]">6-TIER MODULAR MONOLITH</strong></div>
              <div><span className="text-[var(--color-slate-light)]">PRIMARY STORE:</span> <strong className="text-[var(--color-ink)]">POSTGRESQL + PRISMA 7</strong></div>
              <div><span className="text-[var(--color-slate-light)]">CURRENCY ENGINE:</span> <strong className="text-[var(--color-ink)]">BIGINT / PAISE ACCURACY</strong></div>
              <div><span className="text-[var(--color-slate-light)]">INGESTION:</span> <strong className="text-[var(--color-ink)]">SSRF-HARDENED ASYNC SCRAPER</strong></div>
              <div><span className="text-[var(--color-slate-light)]">MEDIA CDN:</span> <strong className="text-[var(--color-ink)]">CLOUDINARY BUFFER STREAMING</strong></div>
              <div><span className="text-[var(--color-slate-light)]">SEARCH:</span> <strong className="text-[var(--color-ink)]">DETERMINISTIC REGEX & RULES</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Cross-Dossier Navigation */}
      <ProjectNavigation currentSlug={project.slug} />
    </article>
  );
}
