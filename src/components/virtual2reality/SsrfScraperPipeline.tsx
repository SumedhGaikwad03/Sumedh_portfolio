import { useState } from "react";
import { Shield, ShieldAlert, CheckCircle2, Ban } from "lucide-react";

interface PipelineStage {
  id: string;
  step: string;
  name: string;
  threat: string;
  defense: string;
  codeSnippet: string;
}

const stages: PipelineStage[] = [
  {
    id: "dns",
    step: "01",
    name: "Pre-Flight DNS Resolution",
    threat: "Admins pasting arbitrary builder URLs might target internal microservices or cloud metadata endpoints.",
    defense: "Asynchronously resolves all IP addresses associated with the hostname via node:dns/promises before executing HTTP fetch.",
    codeSnippet: "const addresses = await lookup(hostname, { all: true });",
  },
  {
    id: "ip_check",
    step: "02",
    name: "Private & Loopback IP Blacklist",
    threat: "SSRF attacks targeting localhost (127.0.0.1), AWS metadata (169.254.169.254), or Docker bridge networks (172.17.0.0/16).",
    defense: "Validates all resolved IPv4 and IPv6 addresses against comprehensive private, link-local, and loopback CIDR ranges.",
    codeSnippet: "if (addresses.some((entry) => isPrivateAddress(entry.address))) {\n  throw new ImportScraperError('Unsafe URL');\n}",
  },
  {
    id: "redirect",
    step: "03",
    name: "Manual Redirect Enforcement",
    threat: "Attackers using public URLs that issue 301/302 HTTP redirects pointing to internal private IP endpoints.",
    defense: "Sets redirect: 'manual' in fetch configuration, rejecting redirect response codes (300–399) immediately.",
    codeSnippet: "response = await fetch(pageUrl, { redirect: 'manual', signal: AbortSignal.timeout(10_000) });",
  },
  {
    id: "byte_cap",
    step: "04",
    name: "2MB Stream Byte Limitation",
    threat: "Denial of Service (DoS) attacks from massive multi-gigabyte external file streams exhausting server memory.",
    defense: "Uses ReadableStreamDefaultReader to stream chunks, terminating connection if cumulative payload exceeds 2,000,000 bytes.",
    codeSnippet: "if (total > MAX_RESPONSE_BYTES) throw new ImportScraperError('Page is too large');",
  },
  {
    id: "timeout",
    step: "05",
    name: "10-Second AbortSignal Timeout",
    threat: "Slowloris or hung socket connections tying up Node.js event loop worker threads.",
    defense: "Attaches AbortSignal.timeout(10_000) to fetch request, aborting stalled external HTTP calls.",
    codeSnippet: "signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)",
  },
  {
    id: "extract",
    step: "06",
    name: "Structured Metadata Parsing",
    threat: "Unsanitized HTML payloads causing parsing corruption or XSS vectors.",
    defense: "Extracts JSON-LD (application/ld+json), OpenGraph meta tags, and regex BHK configurations into an ImportDraft object.",
    codeSnippet: "return { developer, project, configurations: extractConfigurations(text), media: extractMedia(html, pageUrl) };",
  },
];

const blockedSubnets = [
  { range: "127.0.0.0/8", type: "IPv4 Loopback / Localhost" },
  { range: "10.0.0.0/8", type: "Private Class A Network" },
  { range: "172.16.0.0/12", type: "Private Class B / Docker Bridges" },
  { range: "192.168.0.0/16", type: "Private Class C Local Network" },
  { range: "169.254.0.0/16", type: "Link-Local / Cloud Metadata (AWS/GCP)" },
  { range: "::1", type: "IPv6 Loopback" },
  { range: "fc00::/7", type: "IPv6 Unique Local (ULA)" },
  { range: "fe80::/10", type: "IPv6 Link-Local Unicast" },
];

export default function SsrfScraperPipeline() {
  const [activeStage, setActiveStage] = useState<string>("ip_check");
  const selected = stages.find((s) => s.id === activeStage) || stages[1];

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // SECURITY::SSRF_DEFENSE_PIPELINE
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            SSRF-Hardened Web Ingestion Architecture
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
            [PRE-FLIGHT DNS & SUBNET VALIDATION]
          </span>
        </div>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        Allowing administrative users to ingest external real estate websites by URL introduces severe Server-Side Request Forgery (SSRF) risks. Attackers can provide URLs targeting internal infrastructure or cloud metadata services. Virtual2Reality mitigates this with a strict pre-flight DNS resolution and IP subnet filter before initiating HTTP requests.
      </p>

      {/* Interactive Pipeline Stages */}
      <div className="grid lg:grid-cols-12 gap-6 pt-2">
        {/* Stage List */}
        <div className="lg:col-span-6 space-y-2">
          {stages.map((stage) => {
            const isSelected = stage.id === activeStage;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(stage.id)}
                className={`w-full text-left p-3 rounded border transition-all duration-150 flex items-center justify-between group ${
                  isSelected
                    ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(126,231,135,0.1)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[var(--color-terminal)] font-bold">
                    {stage.step}
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--color-ink)]">
                    {stage.name}
                  </span>
                </div>

                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
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

        {/* Selected Stage Detail Card */}
        <div className="lg:col-span-6 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 mb-3">
              <h4 className="text-sm font-bold font-mono text-[var(--color-ink)] flex items-center gap-2">
                <Shield size={14} className="text-[var(--color-terminal)]" />
                <span>Stage {selected.step}: {selected.name}</span>
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)] space-y-1">
                <span className="text-[10px] font-mono text-[var(--color-accent)] font-semibold flex items-center gap-1.5">
                  <ShieldAlert size={12} />
                  <span>THREAT VECTOR:</span>
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed">
                  {selected.threat}
                </p>
              </div>

              <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)] space-y-1">
                <span className="text-[10px] font-mono text-[var(--color-terminal)] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={12} />
                  <span>DEFENSE MECHANISM:</span>
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed">
                  {selected.defense}
                </p>
              </div>

              <div className="rounded bg-[#0B0D0F] p-3 border border-[var(--color-border-subtle)] font-mono text-[11px] text-[var(--color-terminal)] overflow-x-auto whitespace-pre-wrap">
                {selected.codeSnippet}
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[var(--color-slate-light)] border-t border-[var(--color-border-subtle)] pt-2">
            File: backend/src/services/import/scraper.ts
          </div>
        </div>
      </div>

      {/* Blocked Subnet Matrix Callout */}
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Ban size={13} className="text-[var(--color-accent)]" />
          <span className="text-xs font-mono font-bold text-[var(--color-ink)]">
            BLOCKED INTERNAL IP RANGES (SSRF BLACKLIST MATRIX):
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {blockedSubnets.map((sub) => (
            <div
              key={sub.range}
              className="p-2 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] font-mono text-[10px]"
            >
              <span className="text-[var(--color-accent)] font-bold block">
                {sub.range}
              </span>
              <span className="text-[var(--color-slate-light)] text-[9px]">
                {sub.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
