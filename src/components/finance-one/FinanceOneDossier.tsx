import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SystemArchitectureDiagram from "./SystemArchitectureDiagram";
import TransactionQueryFlow from "./TransactionQueryFlow";
import DecisionCard from "./DecisionCard";
import type { DecisionProps } from "./DecisionCard";
import MilestoneMatrix from "./MilestoneMatrix";
import ProjectNavigation from "../ProjectNavigation";
import type { Project } from "../../data/content";

const decisions: DecisionProps[] = [
  {
    id: "01",
    title: "Prisma.Decimal for Financial Truth",
    category: "Data Integrity",
    decision: "All transaction amounts and budget allocations are modeled and calculated using Prisma.Decimal rather than JavaScript Number.",
    why: "Binary floating-point arithmetic (IEEE-754) introduces silent cumulative roundoff errors (e.g. 0.1 + 0.2 = 0.30000000000000004). Financial ledgers require absolute decimal precision.",
    tradeoff: "Requires explicit conversion and wrapping (e.g. total.plus(amount), Decimal.div()) across repository and analytics service boundaries.",
  },
  {
    id: "02",
    title: "Domain-Enforced Budget Locking",
    category: "Business Invariants",
    decision: "Budget immutability is enforced in the service layer (BudgetLockedError) rather than relying on frontend disabled button states.",
    why: "UI constraints are easily bypassed via direct API calls. Financial rules must be guaranteed at the domain layer before database persistence.",
    tradeoff: "Requires additional database read queries during PATCH mutations to inspect current isLocked state prior to executing updates.",
  },
  {
    id: "03",
    title: "Multi-Tenant Isolation & Anti-Enumeration",
    category: "Security",
    decision: "All mutations and record lookups verify record.userId === authenticatedUserId, returning HTTP 404 on mismatched ownership.",
    why: "Returning 403 Forbidden reveals that a resource ID exists for another user. Returning 404 prevents malicious ID enumeration while maintaining complete tenant isolation.",
    tradeoff: "Slightly less informative debugging messages for unauthorized API consumers in development.",
  },
  {
    id: "04",
    title: "TransactionQuery Abstraction",
    category: "System Architecture",
    decision: "A formal TransactionQuery contract decouples query creation (natural language or UI filters) from database query execution.",
    why: "Prevents coupling the core ledger service to an LLM. Any new query origin can be plugged in without modifying the database or transaction retrieval services.",
    tradeoff: "Adds an intermediate extraction and validation step between user prompt input and SQL execution.",
  },
  {
    id: "05",
    title: "Strict LLM Database Boundary",
    category: "AI Architecture",
    decision: "The LLM extracts constrained JSON representing query parameters and is denied direct text-to-SQL or database execution capabilities.",
    why: "Prevents prompt injection vulnerabilities, database tampering, multi-tenant leakage, and unverified data hallucinations.",
    tradeoff: "Requires building and maintaining structured Zod extraction schemas and relative date parsing logic for every supported query type.",
  },
  {
    id: "06",
    title: "PostgreSQL + pgvector Dual Engine",
    category: "Infrastructure",
    decision: "Co-locating relational financial records and 2560-dimensional vector embeddings within PostgreSQL using the pgvector extension in Docker.",
    why: "Eliminates the complexity and network latency of maintaining a separate standalone vector database for skill matching during early development.",
    tradeoff: "Requires specialized raw SQL queries ($queryRaw with <=> operator) since standard Prisma ORM does not natively generate vector distance syntax.",
  },
];

export default function FinanceOneDossier({ project }: { project: Project }) {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-16">
      {/* 1. Back Navigation & Header */}
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
            // DOSSIER::SYS_ARCH_01
          </span>
          <span className="mono-label text-[10px] text-[var(--color-accent)] border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] rounded px-2 py-0.5 font-mono">
            STATUS::MVP_1_READY
          </span>
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2 py-0.5 font-mono">
            STATE::ACTIVE_DEVELOPMENT
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-ink)] mb-4">
          Finance One
        </h1>
        <p className="text-base sm:text-xl text-[var(--color-slate)] leading-relaxed max-w-3xl mb-6">
          A backend-first personal finance platform engineered around transactional correctness, multi-tenant data isolation, and a controlled query abstraction bridging deterministic ledgers with AI extensibility.
        </p>

        {/* Tech Stack Pills */}
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

      {/* 2. Core Philosophy & Problem Statement */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 01</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            CORE PHILOSOPHY & PROBLEM STATEMENT
          </h2>
        </div>

        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 space-y-5">
          <h3 className="text-xl font-bold text-[var(--color-ink)]">
            The Financial Integrity Imperative
          </h3>
          <p className="text-sm sm:text-base text-[var(--color-slate)] leading-relaxed">
            Most modern personal finance tools either lead with UI polish while treating database consistency as an afterthought, or recklessly connect an LLM directly to a database via prompt-injected text-to-SQL. Financial records cannot tolerate floating-point roundoff errors, phantom mutations, or unconstrained LLM data manipulation.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 pt-2">
            <div className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-4">
              <span className="text-[10px] font-mono text-[var(--color-terminal)] block mb-1">
                LAYER 01
              </span>
              <h4 className="text-sm font-bold text-[var(--color-ink)] mb-1">
                APPLICATION CODE
              </h4>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Owns business rules, budget locking invariants, anti-enumeration checks, and validation.
              </p>
            </div>

            <div className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-4">
              <span className="text-[10px] font-mono text-[var(--color-terminal)] block mb-1">
                LAYER 02
              </span>
              <h4 className="text-sm font-bold text-[var(--color-ink)] mb-1">
                DATABASE (PostgreSQL)
              </h4>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Owns financial truth, decimal arithmetic precision, and multi-tenant row isolation.
              </p>
            </div>

            <div className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-4">
              <span className="text-[10px] font-mono text-[var(--color-accent)] block mb-1">
                LAYER 03
              </span>
              <h4 className="text-sm font-bold text-[var(--color-ink)] mb-1">
                AI / LLM (Ollama)
              </h4>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Handles natural-language interpretation only. Zero direct database access or SQL execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Completed MVP 1 Baseline */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 02</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            COMPLETED MVP 1 CAPABILITIES
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-2.5">
            <span className="mono-label text-[10px] text-[var(--color-terminal)] block font-mono">
              [AUTHENTICATION & DATA ISOLATION]
            </span>
            <h4 className="text-base font-bold text-[var(--color-ink)]">
              Multi-Tenant JWT Security
            </h4>
            <p className="text-xs text-[var(--color-slate)] leading-relaxed">
              Complete registration and login workflows with bcrypt password hashing (salt 10). Authentication middleware extracts JWT bearer tokens and scopes all downstream database operations strictly to <code className="text-[var(--color-terminal)]">req.user.userId</code>. Mismatched resources return 404 to prevent ID enumeration.
            </p>
          </div>

          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-2.5">
            <span className="mono-label text-[10px] text-[var(--color-terminal)] block font-mono">
              [TRANSACTIONS & TAXONOMY]
            </span>
            <h4 className="text-base font-bold text-[var(--color-ink)]">
              Non-Judgmental Priority Tiers
            </h4>
            <p className="text-xs text-[var(--color-slate)] leading-relaxed">
              Full transaction CRUD supporting 11 categorized domains (Food, Fuel, Bills, Travel, etc.) paired with 3 non-moralizing spending priorities: <span className="text-[var(--color-ink)] font-semibold">ESSENTIAL</span>, <span className="text-[var(--color-ink)] font-semibold">GOOD_TO_HAVE</span>, and <span className="text-[var(--color-ink)] font-semibold">LUXURY</span>.
            </p>
          </div>

          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-2.5">
            <span className="mono-label text-[10px] text-[var(--color-terminal)] block font-mono">
              [BUDGET INVARIANTS]
            </span>
            <h4 className="text-base font-bold text-[var(--color-ink)]">
              Domain Lock & Overlap Prevention
            </h4>
            <p className="text-xs text-[var(--color-slate)] leading-relaxed">
              Supports Weekly, Monthly, and Quarterly budget periods. The service layer computes dynamic calendar end dates, detects temporal overlap to reject colliding active budgets (HTTP 409), and enforces domain-level locking (<code className="text-[var(--color-terminal)]">BudgetLockedError</code>) preventing mutation of finalized periods.
            </p>
          </div>

          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-2.5">
            <span className="mono-label text-[10px] text-[var(--color-terminal)] block font-mono">
              [ANALYTICS & AGGREGATION]
            </span>
            <h4 className="text-base font-bold text-[var(--color-ink)]">
              Decimal Analytics Calculation Engine
            </h4>
            <p className="text-xs text-[var(--color-slate)] leading-relaxed">
              Centralized dashboard service (<code className="text-[var(--color-terminal)]">analytics.services.ts</code>) calculating total spent, remaining balance, utilization percentage, category distributions, priority breakdowns, largest transaction, and daily burn rate with exact Decimal precision.
            </p>
          </div>
        </div>
      </section>

      {/* 4. System Architecture Diagram */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 03</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            SYSTEM ARCHITECTURE & DATA FLOW
          </h2>
        </div>

        <SystemArchitectureDiagram />
      </section>

      {/* 5. Financial Correctness Deep Dive */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 04</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            FINANCIAL CORRECTNESS & DOMAIN RULES
          </h2>
        </div>

        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[var(--color-ink)]">
              Why Decimal Arithmetic Matters
            </h3>
            <p className="text-sm text-[var(--color-slate)] leading-relaxed">
              JavaScript uses 64-bit binary floating-point numbers (IEEE-754) for all standard numeric types. Over repeated financial aggregations and percentage calculations, floating-point rounding creates subtle inaccuracies. Finance One mandates Prisma's Decimal wrapper across all models, repositories, and analytics services to preserve exact decimal precision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="rounded bg-[#0B0D0F] p-4 border border-[var(--color-border-subtle)] space-y-2">
              <span className="text-[var(--color-accent)] font-semibold block">
                Standard JavaScript Float (Risk):
              </span>
              <p className="text-[var(--color-slate)]">
                0.1 + 0.2 === 0.30000000000000004<br />
                (Fails exact accounting balance checks)
              </p>
            </div>

            <div className="rounded bg-[#0B0D0F] p-4 border border-[var(--color-border-subtle)] space-y-2">
              <span className="text-[var(--color-terminal)] font-semibold block">
                Finance One Prisma.Decimal (Guaranteed):
              </span>
              <p className="text-[var(--color-slate)]">
                new Prisma.Decimal("0.10").plus("0.20") === "0.30"<br />
                (100% Deterministic ledger balance)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. The TransactionQuery Abstraction */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 05</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            THE TRANSACTIONQUERY ABSTRACTION
          </h2>
        </div>

        <TransactionQueryFlow />
      </section>

      {/* 7. AI & Vector Subsystem (Prototype) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-accent)] font-semibold">// 06</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            AI & VECTOR SEARCH SUBSYSTEM (PROTOTYPE)
          </h2>
        </div>

        <div className="rounded border border-[var(--color-accent)]/30 bg-[var(--color-surface)] p-6 sm:p-7 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3">
            <h3 className="text-lg font-bold text-[var(--color-ink)]">
              Semantic Skill Routing with 0.70 Confidence Gating
            </h3>
            <span className="mono-label text-[10px] text-[var(--color-accent)] border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] rounded px-2 py-0.5 font-mono">
              [PROTOTYPE / FOUNDATION]
            </span>
          </div>

          <p className="text-sm text-[var(--color-slate)] leading-relaxed">
            In Finance One, vector search is used as a <strong>semantic skill router</strong> rather than a document dumper. Example questions are embedded into 2560-dimensional vectors using local Ollama (<code className="text-[var(--color-terminal)] font-mono">qwen3-embedding:4b</code>) and stored in PostgreSQL via <code className="text-[var(--color-terminal)] font-mono">pgvector</code>.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="rounded bg-[var(--color-surface-elevated)] p-3.5 border border-[var(--color-border-subtle)] space-y-1.5">
              <span className="text-[var(--color-terminal)] font-semibold block">
                Relevant Question:
              </span>
              <p className="text-[var(--color-slate)]">"How much did I spend on groceries?"</p>
              <p className="text-[11px] text-[var(--color-slate-light)]">
                &rarr; Closest: "How much did I spend on food?"<br />
                &rarr; Distance: 0.106 | Similarity: 0.894 (&ge; 0.70) <span className="text-[var(--color-terminal)]">[MATCHED]</span>
              </p>
            </div>

            <div className="rounded bg-[var(--color-surface-elevated)] p-3.5 border border-[var(--color-border-subtle)] space-y-1.5">
              <span className="text-[var(--color-accent)] font-semibold block">
                Unrelated Question:
              </span>
              <p className="text-[var(--color-slate)]">"What is the capital of France?"</p>
              <p className="text-[11px] text-[var(--color-slate-light)]">
                &rarr; Closest: "When did I last pay for fuel?"<br />
                &rarr; Distance: 0.627 | Similarity: 0.373 (&lt; 0.70) <span className="text-[var(--color-accent)]">[REJECTED]</span>
              </p>
            </div>
          </div>

          <div className="rounded bg-[var(--color-surface-elevated)] p-4 border border-[var(--color-border-subtle)] text-xs text-[var(--color-slate)]">
            <span className="text-[var(--color-ink)] font-semibold font-mono block mb-1">
              Current Prototype Boundaries:
            </span>
            <ul className="space-y-1 font-mono text-[11px]">
              <li>&bull; Ingestion, pgvector cosine search, and Ollama query extraction are implemented and verified via tsx test runners.</li>
              <li>&bull; The public <code className="text-[var(--color-terminal)]">/api/ai</code> router is not yet mounted in Express production routes (Stage 2 roadmap).</li>
              <li>&bull; <code className="text-[var(--color-terminal)]">TransactionQueryService</code> currently executes <code className="text-[var(--color-terminal)]">LIST</code> queries; aggregation operations (<code className="text-[var(--color-terminal)]">SUM, COUNT</code>) are in active development.</li>
            </ul>
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
          {decisions.map((d) => (
            <DecisionCard key={d.id} {...d} />
          ))}
        </div>
      </section>

      {/* 9. Milestone Matrix */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 08</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            MILESTONE STATUS MATRIX & ROADMAP
          </h2>
        </div>

        <MilestoneMatrix />
      </section>

      {/* 10. Cross-Dossier Navigation */}
      <ProjectNavigation currentSlug={project.slug} />
    </article>
  );
}
