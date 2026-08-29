import { useState } from "react";
import { ShieldCheck, ShieldAlert, Terminal, CheckCircle2, XCircle } from "lucide-react";

interface UrlCandidate {
  url: string;
  resolvedIp: string;
  cidrClass: "PUBLIC" | "LOOPBACK" | "RFC_1918_PRIVATE";
  allowed: boolean;
  reason: string;
}

const CANDIDATES: UrlCandidate[] = [
  {
    url: "https://images.unsplash.com/photo-luxury-villa.jpg",
    resolvedIp: "151.101.65.181",
    cidrClass: "PUBLIC",
    allowed: true,
    reason: "Public IP verified; safe for Cloudinary streaming.",
  },
  {
    url: "http://127.0.0.1:3000/api/internal-credentials",
    resolvedIp: "127.0.0.1",
    cidrClass: "LOOPBACK",
    allowed: false,
    reason: "Loopback 127.0.0.0/8 address blocked before HTTP fetch.",
  },
  {
    url: "http://192.168.1.100/admin-database-dump",
    resolvedIp: "192.168.1.100",
    cidrClass: "RFC_1918_PRIVATE",
    allowed: false,
    reason: "RFC 1918 private subnet (192.168.0.0/16) blocked.",
  },
  {
    url: "http://localhost:8080/actuator/env",
    resolvedIp: "127.0.0.1",
    cidrClass: "LOOPBACK",
    allowed: false,
    reason: "Hostname resolved to local interface; rejected at pre-flight.",
  },
];

export default function SSRFDefenseProbe() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const current = CANDIDATES[selectedIdx];

  return (
    <div className="rounded border border-[var(--color-border)] bg-[#0B0D0F] p-4 sm:p-5 font-mono text-xs space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-2.5">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-[var(--color-terminal)]" />
          <span className="font-bold text-[var(--color-ink)]">DNS PRE-FLIGHT SSRF DEFENSE GATEWAY</span>
        </div>
        <span className="text-[10px] text-[var(--color-slate-light)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2 py-0.5">
          SECURITY INSPECTION ENGINE
        </span>
      </div>

      {/* URL Selector Buttons */}
      <div>
        <span className="text-[10px] text-[var(--color-slate-light)] block mb-2">
          // SELECT INCOMING MEDIA URL TO PROBE:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CANDIDATES.map((cand, idx) => (
            <button
              key={cand.url}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`p-2.5 rounded border text-left text-[11px] transition-all flex items-center justify-between ${
                selectedIdx === idx
                  ? cand.allowed
                    ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] ring-1 ring-[var(--color-terminal)]"
                    : "border-red-500/60 bg-red-500/10 ring-1 ring-red-500/50"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
              }`}
            >
              <div className="truncate mr-2">
                <span className={`font-bold block truncate ${selectedIdx === idx ? "text-[var(--color-ink)]" : "text-[var(--color-slate)]"}`}>
                  {cand.url}
                </span>
                <span className="text-[9px] text-[var(--color-slate-light)]">
                  IP: {cand.resolvedIp} &bull; {cand.cidrClass}
                </span>
              </div>
              <span className="shrink-0">
                {cand.allowed ? (
                  <CheckCircle2 size={13} className="text-[var(--color-terminal)]" />
                ) : (
                  <XCircle size={13} className="text-red-400" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4-Stage Security Verification Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
        <div className="p-2.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-0.5">
          <span className="text-[10px] text-[var(--color-slate-light)] block">01 // URL INGESTION</span>
          <span className="text-[var(--color-ink)] font-bold block truncate">{current.url}</span>
          <span className="text-[10px] text-[var(--color-slate)]">Payload parsed</span>
        </div>

        <div className="p-2.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-0.5">
          <span className="text-[10px] text-[var(--color-slate-light)] block">02 // DNS PRE-FLIGHT</span>
          <span className="text-[var(--color-terminal)] font-bold block">{current.resolvedIp}</span>
          <span className="text-[10px] text-[var(--color-slate)]">Pre-fetch lookup</span>
        </div>

        <div className="p-2.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] space-y-0.5">
          <span className="text-[10px] text-[var(--color-slate-light)] block">03 // CIDR FILTER</span>
          <span className={`font-bold block ${current.allowed ? "text-[var(--color-terminal)]" : "text-red-400"}`}>
            {current.cidrClass}
          </span>
          <span className="text-[10px] text-[var(--color-slate)]">Blacklist check</span>
        </div>

        <div className={`p-2.5 rounded border space-y-0.5 ${
          current.allowed ? "border-[var(--color-terminal)]/60 bg-[var(--color-terminal-soft)] text-[var(--color-terminal)]" : "border-red-500/60 bg-red-500/10 text-red-400"
        }`}>
          <span className="text-[10px] text-[var(--color-slate-light)] block">04 // GATE DECISION</span>
          <span className="font-bold block">
            {current.allowed ? "STREAM ALLOWED" : "FETCH BLOCKED"}
          </span>
          <span className="text-[10px] text-[var(--color-slate)]">
            {current.allowed ? "200 OK" : "403 Forbidden"}
          </span>
        </div>
      </div>

      {/* Security Explanation Box */}
      <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[11px] space-y-1">
        <div className="flex items-center justify-between text-[10px] text-[var(--color-slate-light)] border-b border-[var(--color-border-subtle)] pb-1 mb-1">
          <span>// SECURITY POLICY ENFORCEMENT</span>
          <span>PRE-FLIGHT GATEWAY: ACTIVE</span>
        </div>
        <div className="flex items-start gap-2">
          {current.allowed ? (
            <ShieldCheck size={14} className="text-[var(--color-terminal)] mt-0.5 shrink-0" />
          ) : (
            <ShieldAlert size={14} className="text-red-400 mt-0.5 shrink-0" />
          )}
          <div>
            <p className={current.allowed ? "text-[var(--color-terminal)] font-bold" : "text-red-400 font-bold"}>
              {current.allowed ? "SAFE PUBLIC ENDPOINT:" : "POTENTIAL SSRF ATTACK BLOCKED:"} {current.reason}
            </p>
            <p className="text-[10px] text-[var(--color-slate)] mt-0.5">
              Invariant: The backend resolves DNS records and verifies IP subnets before initializing HTTP streaming, preventing malicious payloads from hitting internal services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
