import Hero from "../components/Hero";
import SystemStatusBanner from "../components/SystemStatusBanner";
import Summary from "../components/Summary";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import SystemsMap from "../components/SystemsMap";
import TechnicalDNA from "../components/TechnicalDNA";
import Academics from "../components/Academics";
import Current from "../components/Current";
import Technologies from "../components/Technologies";
import TerminalInterface from "../components/TerminalInterface";
import Contact from "../components/Contact";
import { useViewMode } from "../context/useViewMode";

export default function Home() {
  const { mode, setMode } = useViewMode();

  return (
    <>
      <Hero />
      <SystemStatusBanner />

      {mode === "ENGINEERING" ? (
        // Engineering Mode: Interactive Terminal & Systems Architecture First
        <>
          <TerminalInterface />
          <SystemsMap />
          <TechnicalDNA />
          <Projects />
          <Experience />
          <Technologies />
          <Academics />
          <Current />
          <Contact />
        </>
      ) : (
        // Standard Mode: Concise, Recruiter-Friendly Fast Scan
        <>
          <Summary />
          <Projects />
          <Experience />
          <Technologies />
          <Academics />
          <Current />

          {/* Compact Engineering View Discovery Banner */}
          <section className="max-w-5xl mx-auto px-6 py-6">
            <div className="p-4 sm:p-5 rounded border border-[var(--color-border)] bg-[#0B0D0F]/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs shadow-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--color-terminal)] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terminal)] animate-pulse" />
                  <span>// DEEP_ENGINEERING_INSPECTION_AVAILABLE</span>
                </div>
                <p className="text-[11px] text-[var(--color-slate)]">
                  Unlock interactive Systems Architecture Graph, 5 Technical DNA profiles, formal invariant specifications, and the CLI terminal console.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMode("ENGINEERING")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-[var(--color-terminal)]/50 bg-[var(--color-terminal-soft)] hover:bg-[var(--color-terminal)] hover:text-[#0B0D0F] text-[var(--color-terminal)] text-xs font-bold font-mono transition-all duration-150 shrink-0"
              >
                <span>[ UNLOCK ENGINEERING VIEW ]</span>
                <span className="text-[10px]">&rarr;</span>
              </button>
            </div>
          </section>

          <Contact />
        </>
      )}
    </>
  );
}
