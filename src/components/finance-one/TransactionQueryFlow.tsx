import { ShieldCheck, Terminal, Lock } from "lucide-react";

export default function TransactionQueryFlow() {
  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // QUERY_ABSTRACTION::CONVERGENCE_PIPELINE
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            Decoupling Query Creation from Execution
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
            [LLM ✕ DIRECT SQL EXECUTION]
          </span>
        </div>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        Most AI finance prototypes couple an LLM directly to a database via text-to-SQL or by injecting raw tables into prompt context. 
        Finance One establishes a strict boundary: the natural-language layer interprets intent and outputs a validated <code className="text-[var(--color-terminal)] font-mono">TransactionQuery</code> contract, which executes deterministically inside the user-scoped service layer.
      </p>

      {/* Visual Pipeline Flow */}
      <div className="grid lg:grid-cols-12 gap-3 pt-2">
        {/* Step 1: Query Sources */}
        <div className="lg:col-span-4 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 flex flex-col justify-between">
          <div>
            <span className="mono-label text-[10px] text-[var(--color-slate-light)] block mb-2 font-mono">
              STAGE 01 // QUERY ORIGINS
            </span>
            
            <div className="space-y-2.5">
              <div className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-ink)] font-semibold mb-1">
                  <Terminal size={12} className="text-[var(--color-terminal)]" />
                  <span>Natural Language Query</span>
                </div>
                <p className="text-[11px] font-mono text-[var(--color-slate)] italic">
                  "How much did I spend on food in the last 4 days?"
                </p>
              </div>

              <div className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-2.5 opacity-75">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-slate-light)] font-semibold mb-1">
                  <span>UI Filter / Query Builder</span>
                </div>
                <p className="text-[11px] font-mono text-[var(--color-slate-light)]">
                  [Category: FOOD] [Range: -4d] (Planned)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 text-[10px] font-mono text-[var(--color-slate-light)] border-t border-[var(--color-border-subtle)] pt-2">
            Both origins converge on identical downstream contract.
          </div>
        </div>

        {/* Step 2: Extraction & Vector Routing */}
        <div className="lg:col-span-4 rounded border border-[var(--color-accent)]/30 bg-[var(--color-surface-elevated)] p-4 flex flex-col justify-between">
          <div>
            <span className="mono-label text-[10px] text-[var(--color-accent)] block mb-2 font-mono">
              STAGE 02 // INTENT & EXTRACTION
            </span>

            <div className="space-y-2 text-xs font-mono">
              <div className="rounded bg-[var(--color-surface)] p-2 border border-[var(--color-border-subtle)]">
                <span className="text-[10px] text-[var(--color-accent)] font-semibold block">
                  1. pgvector Semantic Matcher
                </span>
                <span className="text-[11px] text-[var(--color-slate)]">
                  qwen3-embedding:4b &rarr; 2560d vector &rarr; &lt;=&gt; cosine distance with 0.70 confidence gate.
                </span>
              </div>

              <div className="rounded bg-[var(--color-surface)] p-2 border border-[var(--color-border-subtle)]">
                <span className="text-[10px] text-[var(--color-accent)] font-semibold block">
                  2. LLM Query Extractor
                </span>
                <span className="text-[11px] text-[var(--color-slate)]">
                  qwen3:4b extracts JSON &rarr; Zod validates &rarr; resolves relative calendar date math.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 text-[10px] font-mono text-[var(--color-accent)] border-t border-[var(--color-border-subtle)] pt-2 flex items-center gap-1">
            <Lock size={11} />
            <span>LLM generates JSON, never SQL</span>
          </div>
        </div>

        {/* Step 3: TransactionQuery Contract & Execution */}
        <div className="lg:col-span-4 rounded border border-[var(--color-terminal)]/30 bg-[var(--color-surface-elevated)] p-4 flex flex-col justify-between">
          <div>
            <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-2 font-mono">
              STAGE 03 // EXECUTION CONTRACT
            </span>

            <div className="rounded bg-[#0B0D0F] p-3 border border-[var(--color-border-subtle)] text-[11px] font-mono text-[var(--color-ink)] space-y-1">
              <span className="text-[var(--color-terminal)] font-semibold block mb-1">
                // TransactionQuery Object
              </span>
              <div><span className="text-[var(--color-slate)]">operation:</span> <span className="text-[var(--color-terminal)]">"SUM"</span>,</div>
              <div><span className="text-[var(--color-slate)]">category:</span> <span className="text-[var(--color-terminal)]">"FOOD"</span>,</div>
              <div><span className="text-[var(--color-slate)]">startDate:</span> <span className="text-[var(--color-accent)]">"2026-08-25T00:00:00Z"</span>,</div>
              <div><span className="text-[var(--color-slate)]">endDate:</span> <span className="text-[var(--color-accent)]">"2026-08-29T23:59:59Z"</span></div>
            </div>

            <div className="mt-2 text-xs font-mono text-[var(--color-slate)]">
              <span className="text-[var(--color-ink)] font-semibold">Service Layer: </span>
              Appends <code className="text-[var(--color-terminal)]">where: &#123; userId &#125;</code> and queries PostgreSQL ledger.
            </div>
          </div>

          <div className="mt-3 text-[10px] font-mono text-[var(--color-terminal)] border-t border-[var(--color-border-subtle)] pt-2 flex items-center gap-1">
            <ShieldCheck size={12} />
            <span>100% Deterministic & Auditable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
