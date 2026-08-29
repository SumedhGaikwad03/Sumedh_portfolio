import { useState } from "react";
import { Calculator } from "lucide-react";

interface SamplePrice {
  input: string;
  unit: string;
  multiplier: string;
  paise: string;
  rupees: string;
}

const samples: SamplePrice[] = [
  {
    input: "₹ 1.25 Cr",
    unit: "Crore (10,000,000)",
    multiplier: "1.25 × 10,000,000 × 100",
    paise: "12500000000",
    rupees: "₹ 1,25,00,000",
  },
  {
    input: "85.50 Lakhs",
    unit: "Lakh (100,000)",
    multiplier: "85.5 × 100,000 × 100",
    paise: "8550000000",
    rupees: "₹ 85,50,000",
  },
  {
    input: "₹ 4.80 Cr",
    unit: "Crore (10,000,000)",
    multiplier: "4.8 × 10,000,000 × 100",
    paise: "48000000000",
    rupees: "₹ 4,80,00,000",
  },
  {
    input: "45 Lacs",
    unit: "Lakh (100,000)",
    multiplier: "45 × 100,000 × 100",
    paise: "4500000000",
    rupees: "₹ 45,00,000",
  },
];

export default function CurrencyModelingSpotlight() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const sample = samples[selectedIdx];

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // DATA_INTEGRITY::CURRENCY_MODELING
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            Paise-Accurate Real Estate Financial Precision
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
            [BIGINT 64-BIT INTEGER ARITHMETIC]
          </span>
        </div>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        Indian real estate listings use heterogeneous denominations (Crores, Lakhs, Lacs, INR). Storing property pricing using standard JavaScript <code className="text-[var(--color-accent)] font-mono">Number</code> (IEEE-754 binary floating-point) introduces cumulative roundoff drift during boundary queries and budget filtering. Virtual2Reality normalizes all prices into exact 64-bit integer <strong>paise</strong> (1 Rupee = 100 Paise; 1 Cr = 10,000,000 Paise) via <code className="text-[var(--color-terminal)] font-mono">BigInt</code>.
      </p>

      {/* Interactive Normalizer Explorer */}
      <div className="grid lg:grid-cols-12 gap-6 pt-2">
        {/* Sample Selector */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] block mb-1 font-mono">
            SELECT SAMPLE REAL ESTATE LISTING:
          </span>
          {samples.map((s, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={s.input}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left p-3.5 rounded border transition-all duration-150 flex items-center justify-between group ${
                  isSelected
                    ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(126,231,135,0.1)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
                }`}
              >
                <div>
                  <span className="text-sm font-mono font-bold text-[var(--color-ink)] block">
                    {s.input}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-slate-light)]">
                    {s.unit}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isSelected
                      ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                      : "text-[var(--color-slate)] border-[var(--color-border-subtle)]"
                  }`}
                >
                  {isSelected ? "ACTIVE" : "NORMALIZE"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Normalization Pipeline Breakdown */}
        <div className="lg:col-span-7 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 mb-4">
              <h4 className="text-sm font-bold font-mono text-[var(--color-ink)] flex items-center gap-2">
                <Calculator size={14} className="text-[var(--color-terminal)]" />
                <span>Deterministic Normalization Lifecycle</span>
              </h4>
              <span className="text-[10px] font-mono text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5">
                EXACT PAISE
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)] space-y-1">
                <span className="text-[10px] text-[var(--color-slate-light)] block font-sans font-semibold">
                  STAGE 01: RAW USER / SCRAPED INPUT
                </span>
                <p className="text-[var(--color-ink)] font-bold text-sm">
                  "{sample.input}"
                </p>
              </div>

              <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)] space-y-1">
                <span className="text-[10px] text-[var(--color-slate-light)] block font-sans font-semibold">
                  STAGE 02: DENOMINATION SCALING FORMULA
                </span>
                <p className="text-[var(--color-accent)]">
                  {sample.multiplier}
                </p>
              </div>

              <div className="rounded bg-[#0B0D0F] p-3.5 border border-[var(--color-border-subtle)] space-y-1 text-[var(--color-ink)]">
                <span className="text-[10px] text-[var(--color-terminal)] block font-sans font-semibold">
                  STAGE 03: PRISMA / POSTGRESQL BIGINT INTEGER
                </span>
                <div className="text-base font-bold text-[var(--color-terminal)]">
                  {sample.paise}n <span className="text-xs text-[var(--color-slate)] font-normal font-sans">paise ({sample.rupees})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)] text-[11px] text-[var(--color-slate)] space-y-1">
            <span className="text-[var(--color-ink)] font-semibold font-sans block">
              Architectural Tradeoff:
            </span>
            <p className="leading-relaxed">
              <code className="text-[var(--color-terminal)] font-mono">JSON.stringify</code> does not natively serialize JavaScript <code className="text-[var(--color-terminal)] font-mono">BigInt</code> values. The service layer explicitly serializes BigInt fields to decimal strings (<code className="text-[var(--color-terminal)] font-mono">property.priceFrom.toString()</code>) at the controller boundary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
