// If you're reading this: yes, this is intentional.

import { useState, useRef, useEffect, type KeyboardEvent, type FormEvent } from "react";
import { CornerDownLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { profile, projects, technologies, type Project, type TechCategory } from "../data/content";
import { useViewMode } from "../context/useViewMode";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  isError?: boolean;
}

export default function TerminalInterface() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mode } = useViewMode();

  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Save to command history
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    let outputNode: React.ReactNode = null;
    let isError = false;

    // Handle compound commands like "sudo hire sumedh"
    if (trimmed.toLowerCase().startsWith("sudo hire") || trimmed.toLowerCase() === "hire") {
      outputNode = (
        <div className="space-y-2 text-xs font-mono p-3 rounded bg-[#0B0D0F] border border-[var(--color-terminal)]/50">
          <div className="text-[var(--color-slate-light)]">
            [sudo] password for recruiter: ********
          </div>
          <div className="border-t border-b border-[var(--color-border-subtle)] py-1.5 my-1 font-mono text-[11px] text-[var(--color-slate)] space-y-0.5">
            <p className="text-[var(--color-terminal)] font-bold">ACCESS CHECK</p>
            <p className="text-[var(--color-slate-light)]">──────────────────────────────</p>
            <p>identity       recruiter</p>
            <p>target         sumedh</p>
            <p>request        hire</p>
            <p>authorization  bypassed</p>
          </div>
          <div className="space-y-0.5 text-[11px] text-[var(--color-terminal)] font-bold">
            <p>✓ portfolio inspected</p>
            <p>✓ systems verified</p>
            <p>✓ engineering evidence available</p>
            <p className="pt-1 text-[var(--color-ink)]">STATUS::APPROVED</p>
          </div>
          <div className="pt-2 flex flex-wrap gap-2">
            <a
              href={`mailto:${profile.email}?subject=Engineering%20Opportunity%20via%20Portfolio`}
              className="px-2.5 py-1 rounded bg-[var(--color-terminal-soft)] border border-[var(--color-terminal)]/60 text-[var(--color-terminal)] hover:bg-[var(--color-terminal)] hover:text-[#0B0D0F] transition-all font-bold inline-flex items-center gap-1"
            >
              <span>[ REACH OUT VIA EMAIL &rarr; ]</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/60 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#0B0D0F] transition-all font-bold inline-flex items-center gap-1"
            >
              <span>[ VIEW LINKEDIN &rarr; ]</span>
            </a>
          </div>
        </div>
      );
    } else {
      switch (command) {
        case "help":
        case "?":
          outputNode = (
            <div className="space-y-2 text-xs font-mono">
              <p className="text-[var(--color-terminal)] font-bold">// AVAILABLE COMMANDS:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[var(--color-slate)]">
                <div><span className="text-[var(--color-ink)] font-bold">whoami</span> — Profile & engineering focus</div>
                <div><span className="text-[var(--color-ink)] font-bold">projects</span> — List featured systems</div>
                <div><span className="text-[var(--color-ink)] font-bold">open &lt;slug&gt;</span> — Inspect system dossier</div>
                <div><span className="text-[var(--color-ink)] font-bold">systems</span> — Architecture domains</div>
                <div><span className="text-[var(--color-ink)] font-bold">dna</span> — Core engineering principles</div>
                <div><span className="text-[var(--color-ink)] font-bold">stack</span> — Technology competencies</div>
                <div><span className="text-[var(--color-ink)] font-bold">status</span> — Portfolio runtime state</div>
                <div><span className="text-[var(--color-ink)] font-bold">contact</span> — Reach out & social links</div>
                <div><span className="text-[var(--color-ink)] font-bold">clear</span> — Clear terminal output</div>
              </div>
              <p className="text-[10px] text-[var(--color-slate-light)] pt-1">
                Tip: Use `open finance-one`, `open atrio`, `open virtual2reality`, or `open stms`.
              </p>
              <p className="text-[10px] text-[var(--color-terminal)]/70 italic">
                &gt; Note: Some system commands are not documented.
              </p>
            </div>
          );
          break;

        case "whoami":
        case "about":
          if (arg === "--deep" || arg === "-d" || arg === "deep") {
            outputNode = (
              <div className="space-y-2 text-xs font-mono p-3 rounded bg-[#0B0D0F] border border-[var(--color-terminal)]/40">
                <div className="text-[var(--color-terminal)] font-bold">// IDENTITY::SUMEDH_GAIKWAD</div>

                <div className="space-y-1.5 text-[var(--color-slate)]">
                  <div>
                    <span className="text-[var(--color-ink)] font-bold block text-[11px]">ROLE</span>
                    <span>Backend-focused Full Stack Engineer</span>
                  </div>

                  <div className="pt-0.5">
                    <span className="text-[var(--color-ink)] font-bold block text-[11px]">PRIMARY SYSTEMS</span>
                    <span>Distributed Services &bull; PostgreSQL &bull; Real-Time Systems &bull; Applied AI</span>
                  </div>

                  <div className="pt-0.5">
                    <span className="text-[var(--color-ink)] font-bold block text-[11px]">ENGINEERING BIAS</span>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      <li>correctness &gt; cleverness</li>
                      <li>evidence &gt; claims</li>
                      <li>explicit state &gt; hidden magic</li>
                      <li>boring infrastructure &gt; mysterious infrastructure</li>
                    </ul>
                  </div>

                  <div className="pt-0.5 border-t border-[var(--color-border-subtle)] pt-1">
                    <span className="text-[var(--color-ink)] font-bold block text-[11px]">CURRENT OBJECTIVE</span>
                    <span className="text-[var(--color-terminal)]">Build software systems with an obsession for correctness, architecture, and the details users actually notice.</span>
                  </div>
                </div>
              </div>
            );
          } else {
            outputNode = (
              <div className="space-y-1.5 text-xs font-mono">
                <div className="text-[var(--color-terminal)] font-bold">
                  {profile.name} — {profile.title}
                </div>
                <p className="text-[var(--color-slate)] leading-relaxed">{profile.tagline}</p>
                <div className="text-[11px] text-[var(--color-slate-light)] pt-1">
                  Location: {profile.location} &bull; Email: {profile.email}
                </div>
              </div>
            );
          }
          break;

        case "projects":
        case "work":
        case "ls":
          outputNode = (
            <div className="space-y-2 text-xs font-mono">
              <p className="text-[var(--color-terminal)] font-bold">// FEATURED SYSTEM REGISTRY:</p>
              <div className="space-y-2 text-[var(--color-slate)]">
                {projects.map((p: Project, idx: number) => (
                  <div key={p.slug} className="border-l-2 border-[var(--color-border-bright)] pl-2.5 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--color-terminal)] font-bold">0{idx + 1} //</span>
                      <span className="text-[var(--color-ink)] font-bold">{p.name.toUpperCase()}</span>
                      <span className="text-[10px] text-[var(--color-slate-light)] font-mono">({p.slug})</span>
                    </div>
                    <p className="text-[11px] text-[var(--color-slate)]">{p.oneLiner}</p>
                    {mode === "ENGINEERING" && (
                      <p className="text-[10px] text-[var(--color-terminal)]">
                        Stack: {p.tech.slice(0, 4).join(" • ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[var(--color-slate-light)] pt-1">
                Run <span className="text-[var(--color-terminal)] font-bold">open &lt;slug&gt;</span> to inspect full architecture.
              </p>
            </div>
          );
          break;

        case "open": {
          const target = arg.toLowerCase();
          let matchedSlug: string | null = null;

          if (target === "finance-one" || target === "finance") matchedSlug = "finance-one";
          else if (target === "atrio") matchedSlug = "atrio";
          else if (target === "virtual2reality" || target === "v2r") matchedSlug = "virtual2reality";
          else if (target === "smart-traffic-management-system" || target === "smart-traffic" || target === "stms") matchedSlug = "smart-traffic-management-system";
          else if (target === "404" || target === "project-404" || target === "classified") {
            // Easter Egg: Classified Project 404
            outputNode = (
              <div className="space-y-2 text-xs font-mono p-3 rounded bg-[#0B0D0F] border border-amber-500/40">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>PROJECT::404</span>
                  <span className="text-[10px] text-amber-500/80">[ STATUS::CLASSIFIED ]</span>
                </div>
                <div className="text-[11px] text-[var(--color-slate-light)] font-mono">DOMAIN::UNKNOWN</div>
                <div className="text-[var(--color-slate)] leading-relaxed space-y-1.5 pt-1">
                  <p className="text-[var(--color-ink)] font-bold">// PROJECT NOT FOUND</p>
                  <p>You found the project that wasn't supposed to exist.</p>
                  <p className="text-[11px] text-[var(--color-slate)]">
                    There is no architecture diagram.<br />
                    There is no case study.<br />
                    There is absolutely no production incident.<br />
                    <span className="italic text-[var(--color-slate-light)]">Probably.</span>
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleCommand("projects")}
                    className="text-[var(--color-terminal)] hover:underline font-bold text-xs"
                  >
                    [ RETURN TO KNOWN SYSTEMS &rarr; ]
                  </button>
                </div>
              </div>
            );
            break;
          }

          if (matchedSlug) {
            const p = projects.find((proj: Project) => proj.slug === matchedSlug);
            outputNode = (
              <div className="space-y-2 text-xs font-mono p-3 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)]">
                <div className="flex items-center justify-between text-[var(--color-terminal)] font-bold">
                  <span>SYSTEM::{p?.name.toUpperCase()}</span>
                  <span className="text-[10px] text-[var(--color-slate-light)]">VERIFIED DOSSIER</span>
                </div>
                <p className="text-[var(--color-slate)] leading-relaxed">{p?.oneLiner}</p>
                
                {mode === "ENGINEERING" && p?.architecture && (
                  <p className="text-[11px] text-[var(--color-slate-light)] border-t border-[var(--color-border-subtle)] pt-1.5">
                    <span className="text-[var(--color-ink)] font-bold">Arch Invariant:</span> {p.architecture}
                  </p>
                )}

                <div className="pt-1 flex items-center justify-between">
                  <Link
                    to={`/projects/${matchedSlug}`}
                    className="inline-flex items-center gap-1.5 text-[var(--color-terminal)] hover:underline font-bold text-xs"
                  >
                    <span>[ VIEW FULL DOSSIER &rarr; ]</span>
                    <ArrowRight size={12} />
                  </Link>
                  <span className="text-[10px] text-[var(--color-slate-light)]">route: /projects/{matchedSlug}</span>
                </div>
              </div>
            );
          } else {
            isError = true;
            outputNode = (
              <div className="text-xs font-mono text-rose-400 space-y-1">
                <p>ERROR: Unknown project slug '{arg}'.</p>
                <p className="text-[var(--color-slate)]">Valid slugs: `finance-one`, `atrio`, `virtual2reality`, `stms`</p>
              </div>
            );
          }
          break;
        }

        case "systems":
          outputNode = (
            <div className="space-y-1.5 text-xs font-mono">
              <p className="text-[var(--color-terminal)] font-bold">// ARCHITECTURAL CAPABILITY DOMAINS:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[var(--color-slate)]">
                <li>&bull; <span className="text-[var(--color-ink)] font-semibold">FINANCIAL LEDGER:</span> Prisma.Decimal Precision</li>
                <li>&bull; <span className="text-[var(--color-ink)] font-semibold">REAL-TIME COLLAB:</span> In-Memory Socket Map</li>
                <li>&bull; <span className="text-[var(--color-ink)] font-semibold">SECURITY DEFENSE:</span> DNS Pre-Flight SSRF Filter</li>
                <li>&bull; <span className="text-[var(--color-ink)] font-semibold">CYBER-PHYSICAL RL:</span> 0.1s Lockstep SUMO Sim</li>
                <li>&bull; <span className="text-[var(--color-ink)] font-semibold">DATA INTEGRITY:</span> Multi-Tenant Row Isolation</li>
                <li>&bull; <span className="text-[var(--color-ink)] font-semibold">MODULAR MONOLITH:</span> Layered Domain Boundaries</li>
              </ul>
            </div>
          );
          break;

        case "dna":
          outputNode = (
            <div className="space-y-1.5 text-xs font-mono">
              <p className="text-[var(--color-terminal)] font-bold">// 5 CORE ENGINEERING PRINCIPLES:</p>
              <div className="space-y-1 text-[var(--color-slate)]">
                <p>1. <span className="text-[var(--color-ink)] font-bold">CORRECTNESS:</span> Zero tolerance for silent floating-point drift.</p>
                <p>2. <span className="text-[var(--color-ink)] font-bold">SECURITY BOUNDARIES:</span> Ingress network validation & anti-enumeration.</p>
                <p>3. <span className="text-[var(--color-concurrency)] font-bold">CONCURRENCY:</span> Single source of truth across asynchronous streams.</p>
                <p>4. <span className="text-[var(--color-ink)] font-bold">SYSTEM DESIGN:</span> Layered domain separation decoupled from transport.</p>
                <p>5. <span className="text-[var(--color-terminal)] font-bold">CONTROLLED AI:</span> Deterministic safety constraints & zero direct SQL.</p>
              </div>
            </div>
          );
          break;

        case "stack":
          outputNode = (
            <div className="space-y-2 text-xs font-mono">
              <p className="text-[var(--color-terminal)] font-bold">// TECHNICAL STACK COMPETENCIES:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[var(--color-slate)]">
                {technologies.map((t: TechCategory) => (
                  <div key={t.label} className="p-2 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)]">
                    <span className="text-[var(--color-ink)] font-bold block mb-0.5">{t.label.toUpperCase()}</span>
                    <span className="text-[11px] text-[var(--color-slate)]">{t.items.join(" • ")}</span>
                  </div>
                ))}
              </div>
            </div>
          );
          break;

        case "status":
          if (arg === "--verbose" || arg === "-v" || arg === "verbose") {
            outputNode = (
              <div className="space-y-3 text-xs font-mono p-3 rounded bg-[#0B0D0F] border border-[var(--color-terminal)]/50">
                <div className="space-y-1">
                  <div className="text-[var(--color-terminal)] font-bold">SYSTEM STATUS</div>
                  <div className="text-[var(--color-slate-light)]">────────────────────────</div>
                  <div className="grid grid-cols-2 gap-y-0.5 text-[11px] text-[var(--color-slate)]">
                    <div>frontend: <span className="text-[var(--color-terminal)] font-bold">READY</span></div>
                    <div>backend: <span className="text-[var(--color-terminal)] font-bold">VERIFIED</span></div>
                    <div>database: <span className="text-[var(--color-terminal)] font-bold">CONNECTED</span></div>
                    <div>ai: <span className="text-[var(--color-accent)] font-bold">CONSTRAINED</span></div>
                    <div>portfolio: <span className="text-[var(--color-ink)] font-bold">OPERATIONAL</span></div>
                  </div>
                </div>
                <div className="space-y-1 border-t border-[var(--color-border-subtle)] pt-2">
                  <div className="text-[var(--color-accent)] font-bold">HUMAN FACTORS</div>
                  <div className="text-[var(--color-slate-light)]">────────────────────────</div>
                  <div className="grid grid-cols-2 gap-y-0.5 text-[11px] text-[var(--color-slate)]">
                    <div>sleep: <span className="text-amber-400 font-bold">DEGRADED</span></div>
                    <div>coffee: <span className="text-[var(--color-terminal)] font-bold">REQUIRED</span></div>
                    <div>deadlines: <span className="text-[var(--color-ink)] font-bold">PRESENT</span></div>
                    <div>bugs: <span className="text-rose-400 font-bold">INEVITABLE</span></div>
                    <div>confidence: <span className="text-[var(--color-terminal)] font-bold">HIGH</span></div>
                  </div>
                </div>
              </div>
            );
          } else {
            outputNode = (
              <div className="space-y-1.5 text-xs font-mono p-2.5 rounded bg-[#0B0D0F] border border-[var(--color-border-subtle)]">
                <div className="flex items-center justify-between text-[var(--color-terminal)] font-bold border-b border-[var(--color-border-subtle)] pb-1">
                  <span>SUMEDH.OS PORTFOLIO RUNTIME</span>
                  <span>STATE::OPERATIONAL</span>
                </div>
                <div className="grid grid-cols-2 gap-y-1 text-[11px] text-[var(--color-slate)] pt-0.5">
                  <div>VIEW_MODE: <span className="text-[var(--color-ink)] font-bold">{mode}</span></div>
                  <div>PROJECT_REGISTRY: <span className="text-[var(--color-ink)] font-bold">4 SYSTEMS</span></div>
                  <div>DOSSIERS: <span className="text-[var(--color-ink)] font-bold">4 / 4 LOADED</span></div>
                  <div>BUILD_STATUS: <span className="text-[var(--color-terminal)] font-bold">VERIFIED_GREEN</span></div>
                  <div>SECURITY_GATE: <span className="text-[var(--color-accent)] font-bold">ENFORCED</span></div>
                  <div>ENVIRONMENT: <span className="text-[var(--color-slate-light)]">CLIENT_STANDALONE</span></div>
                </div>
              </div>
            );
          }
          break;

        case "contact":
          outputNode = (
            <div className="space-y-1.5 text-xs font-mono">
              <p className="text-[var(--color-terminal)] font-bold">// CONTACT & DIRECT CHANNELS:</p>
              <div className="space-y-1 text-[var(--color-slate)]">
                <p>Email: <a href={`mailto:${profile.email}`} className="text-[var(--color-ink)] hover:underline">{profile.email}</a></p>
                <p>GitHub: <a href={profile.github} target="_blank" rel="noreferrer" className="text-[var(--color-terminal)] hover:underline">{profile.github}</a></p>
                <p>LinkedIn: <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-[var(--color-terminal)] hover:underline">{profile.linkedin}</a></p>
                <p>Resume: <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-[var(--color-accent)] hover:underline">/resume.pdf</a></p>
              </div>
            </div>
          );
          break;

        case "clear":
        case "cls":
          setHistory([]);
          setInputVal("");
          return;

        default:
          isError = true;
          outputNode = (
            <div className="text-xs font-mono text-rose-400 space-y-1">
              <p>COMMAND NOT FOUND: '{trimmed}'</p>
              <p className="text-[var(--color-slate)]">Type <span className="text-[var(--color-terminal)] font-bold">'help'</span> for available commands.</p>
            </div>
          );
          break;
      }
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        command: trimmed,
        output: outputNode,
        isError,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleCommand(inputVal);
      inputRef.current?.focus({ preventScroll: true });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setHistory([]);
      setInputVal("");
    } else if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  const executeShortcut = (cmd: string) => {
    setInputVal(cmd);
    handleCommand(cmd);
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <section id="terminal" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader
        index="02"
        title="Terminal Command Interface"
        description="Interactive read-only command console to inspect systems, architecture, and engineering principles."
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <span className="text-[11px] text-[var(--color-terminal)] font-semibold">
          // ENGINEERING_INSPECTION_MODE
        </span>
        <span className="text-[10px] text-[var(--color-slate-light)]">
          Deep technical view: architecture, invariants, system boundaries & implementation evidence.
        </span>
      </div>

      <div
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl overflow-hidden font-mono cursor-text"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0D0F] border-b border-[var(--color-border-subtle)] select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="text-[11px] font-mono text-[var(--color-slate-light)] ml-2">
              sumedh@portfolio:~ (read-only)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-1.5 py-0.5">
              {mode} MODE
            </span>
            <span className="text-[10px] text-[var(--color-slate-light)] hidden sm:inline">
              Ctrl+L: clear
            </span>
          </div>
        </div>

        {/* Terminal Output Log */}
        <div
          ref={outputContainerRef}
          aria-live="polite"
          className="p-4 sm:p-5 space-y-4 max-h-[380px] overflow-y-auto font-mono text-xs bg-[#08090A]"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5 animate-in fade-in duration-100">
              <div className="flex items-center gap-2 text-[var(--color-slate)]">
                <span className="text-[var(--color-terminal)] font-bold">&gt;</span>
                <span className="text-[var(--color-ink)] font-semibold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Terminal Input Row */}
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleCommand(inputVal);
            inputRef.current?.focus({ preventScroll: true });
          }}
          className="flex items-center gap-2 px-4 py-3 bg-[#0B0D0F] border-t border-[var(--color-border-subtle)]"
        >
          <div className="flex items-center gap-1 text-[var(--color-terminal)] font-bold text-xs select-none">
            <span>&gt;</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Terminal Command Input"
            placeholder="Type 'help', 'projects', 'dna', or 'open finance-one'..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-xs font-mono text-[var(--color-ink)] placeholder:text-[var(--color-slate-light)]/60 focus:outline-none"
          />

          <button
            type="submit"
            aria-label="Execute Command"
            className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--color-slate-light)] hover:text-[var(--color-terminal)] transition-colors p-1"
          >
            <span className="hidden sm:inline">EXEC</span>
            <CornerDownLeft size={12} />
          </button>
        </form>

        {/* Quick Command Shortcuts Pill Bar */}
        <div className="flex flex-wrap items-center gap-1.5 px-4 py-2.5 bg-[#08090A] border-t border-[var(--color-border-subtle)] text-[10px]">
          <span className="text-[var(--color-slate-light)] mr-1 hidden sm:inline">QUICK COMMANDS:</span>
          {["help", "projects", "open finance-one", "open atrio", "dna", "stack", "status", "clear"].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeShortcut(cmd)}
              className="px-2 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:border-[var(--color-terminal)] hover:text-[var(--color-terminal)] transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-[var(--color-terminal)] font-bold">
          {index} //
        </span>
        <h2 className="text-xl font-bold tracking-tight text-[var(--color-ink)]">
          {title}
        </h2>
      </div>
      <p className="text-xs text-[var(--color-slate)] max-w-2xl">{description}</p>
    </div>
  );
}
