export interface DecisionProps {
  id: string;
  title: string;
  category: string;
  decision: string;
  why: string;
  tradeoff: string;
}

export default function DecisionCard({
  id,
  title,
  category,
  decision,
  why,
  tradeoff,
}: DecisionProps) {
  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col justify-between hover:border-[var(--color-border-bright)] transition-all duration-150">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-mono text-[var(--color-terminal)] font-semibold">
            {id} // {category.toUpperCase()}
          </span>
        </div>
        <h4 className="text-base font-bold text-[var(--color-ink)] mb-2.5">
          {title}
        </h4>
        <p className="text-xs text-[var(--color-slate)] mb-4 leading-relaxed font-mono">
          <span className="text-[var(--color-ink)] font-semibold">Decision: </span>
          {decision}
        </p>

        <div className="space-y-2.5 text-xs">
          <div className="rounded bg-[var(--color-surface-elevated)] p-3 border border-[var(--color-border-subtle)]">
            <span className="text-[var(--color-terminal)] font-mono font-semibold block mb-1">
              &gt; WHY IT MATTERS:
            </span>
            <p className="text-[var(--color-slate)] leading-relaxed">{why}</p>
          </div>

          <div className="rounded bg-[var(--color-surface-elevated)] p-3 border border-[var(--color-border-subtle)]">
            <span className="text-[var(--color-accent)] font-mono font-semibold block mb-1">
              &gt; ENGINEERING TRADEOFF:
            </span>
            <p className="text-[var(--color-slate)] leading-relaxed">{tradeoff}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
