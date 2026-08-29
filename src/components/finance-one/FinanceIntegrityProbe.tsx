import { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw, Lock, Terminal } from "lucide-react";

type TxScenario = "valid" | "locked";

export default function FinanceIntegrityProbe() {
  const [scenario, setScenario] = useState<TxScenario>("valid");
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState<number>(0);
  const [hasExecuted, setHasExecuted] = useState(false);

  const runSimulation = (selectedScenario: TxScenario) => {
    setScenario(selectedScenario);
    setIsRunning(true);
    setHasExecuted(true);
    setStage(1);

    setTimeout(() => setStage(2), 400);
    setTimeout(() => setStage(3), 850);
    setTimeout(() => {
      setStage(4);
      setIsRunning(false);
    }, 1300);
  };

  const reset = () => {
    setStage(0);
    setHasExecuted(false);
    setIsRunning(false);
  };

  return (
    <div className="rounded border border-[var(--color-border)] bg-[#0B0D0F] p-4 sm:p-5 font-mono text-xs space-y-4">
      {/* Console Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-2.5">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-[var(--color-terminal)]" />
          <span className="font-bold text-[var(--color-ink)]">FINANCIAL INTEGRITY & LEDGER CONSOLE</span>
        </div>
        <span className="text-[10px] text-[var(--color-slate-light)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2 py-0.5">
          SIMULATED ARCHITECTURE TRACE
        </span>
      </div>

      {/* Control buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={isRunning}
          onClick={() => runSimulation("valid")}
          className={`px-3 py-1.5 rounded border text-xs transition-colors flex items-center gap-1.5 ${
            scenario === "valid" && hasExecuted
              ? "border-[var(--color-terminal)] bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] font-bold"
              : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)]"
          }`}
        >
          <CheckCircle2 size={12} className="text-[var(--color-terminal)]" />
          <span>Execute Decimal Tx (₹2,500.75)</span>
        </button>

        <button
          type="button"
          disabled={isRunning}
          onClick={() => runSimulation("locked")}
          className={`px-3 py-1.5 rounded border text-xs transition-colors flex items-center gap-1.5 ${
            scenario === "locked" && hasExecuted
              ? "border-amber-500/50 bg-amber-500/10 text-amber-300 font-bold"
              : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)]"
          }`}
        >
          <Lock size={12} className="text-amber-400" />
          <span>Mutate Locked Period (Test Error)</span>
        </button>

        {hasExecuted && (
          <button
            type="button"
            onClick={reset}
            className="px-2.5 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] text-xs ml-auto transition-colors flex items-center gap-1"
          >
            <RefreshCw size={11} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Transaction Pipeline Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
        <div className={`p-2.5 rounded border transition-colors ${
          stage >= 1 ? "border-[var(--color-terminal)] bg-[var(--color-surface)]" : "border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 text-[var(--color-slate-light)]"
        }`}>
          <span className="text-[10px] text-[var(--color-slate-light)] block">01 // INCOMING</span>
          <span className="text-[var(--color-ink)] font-bold block mt-0.5">
            {scenario === "valid" ? "POST /api/v1/tx" : "PATCH /api/v1/tx"}
          </span>
          <span className="text-[10px] text-[var(--color-slate)]">
            {scenario === "valid" ? "Amount: ₹2,500.75" : "Period: isLocked=true"}
          </span>
        </div>

        <div className={`p-2.5 rounded border transition-colors ${
          stage >= 2 ? "border-[var(--color-terminal)] bg-[var(--color-surface)]" : "border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 text-[var(--color-slate-light)]"
        }`}>
          <span className="text-[10px] text-[var(--color-slate-light)] block">02 // PRECISION</span>
          <span className="text-[var(--color-ink)] font-bold block mt-0.5">Prisma.Decimal</span>
          <span className="text-[10px] text-[var(--color-slate)]">Zero IEEE-754 drift</span>
        </div>

        <div className={`p-2.5 rounded border transition-colors ${
          stage >= 3
            ? scenario === "locked"
              ? "border-amber-500 bg-amber-500/10 text-amber-300"
              : "border-[var(--color-terminal)] bg-[var(--color-surface)]"
            : "border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 text-[var(--color-slate-light)]"
        }`}>
          <span className="text-[10px] text-[var(--color-slate-light)] block">03 // INVARIANT</span>
          <span className="font-bold block mt-0.5">
            {scenario === "locked" ? "BudgetLockedError" : "Lock Verified: OK"}
          </span>
          <span className="text-[10px] text-[var(--color-slate)]">
            {scenario === "locked" ? "403 Mutation Blocked" : "Period active"}
          </span>
        </div>

        <div className={`p-2.5 rounded border transition-colors ${
          stage >= 4
            ? scenario === "locked"
              ? "border-amber-500/60 bg-[var(--color-surface)] text-amber-300"
              : "border-[var(--color-terminal)] bg-[var(--color-terminal-soft)] text-[var(--color-terminal)]"
            : "border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 text-[var(--color-slate-light)]"
        }`}>
          <span className="text-[10px] text-[var(--color-slate-light)] block">04 // OUTCOME</span>
          <span className="font-bold block mt-0.5">
            {stage < 4 ? "Awaiting stage..." : scenario === "valid" ? "LEDGER COMMITTED" : "TX REJECTED"}
          </span>
          <span className="text-[10px] text-[var(--color-slate)]">
            {stage < 4 ? "Pipeline idle" : scenario === "valid" ? "Balance: ₹7,499.25" : "Zero state mutated"}
          </span>
        </div>
      </div>

      {/* State Log Box */}
      <div className="rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] p-3 text-[11px] space-y-1">
        <div className="flex items-center justify-between text-[10px] text-[var(--color-slate-light)] border-b border-[var(--color-border-subtle)] pb-1 mb-1">
          <span>// PIPELINE EXECUTION LOG</span>
          <span>MULTI-TENANT ISOLATION: ACTIVE</span>
        </div>
        {!hasExecuted ? (
          <p className="text-[var(--color-slate)]">
            &gt; Select an execution scenario above to trace decimal arithmetic and domain locking invariants.
          </p>
        ) : scenario === "valid" ? (
          <div className="space-y-1">
            <p className="text-[var(--color-ink)]">
              &gt; Prisma.Decimal('10000.00').sub('2500.75') &rarr; <span className="text-[var(--color-terminal)] font-bold">₹7,499.25</span>
            </p>
            <p className="text-[var(--color-slate)]">
              &gt; Tenant check: req.user.userId matches ledger owner. No budget lock collision.
            </p>
            {stage >= 4 && (
              <p className="text-[var(--color-terminal)] font-bold flex items-center gap-1">
                <ShieldCheck size={12} />
                <span>Transaction boundary committed to PostgreSQL with row-level integrity.</span>
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-amber-300 font-bold flex items-center gap-1">
              <AlertTriangle size={12} />
              <span>BudgetLockedError: Cannot modify transactions in a locked financial period.</span>
            </p>
            <p className="text-[var(--color-slate)]">
              &gt; Domain service halted execution before repository write. Ledger state preserved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
