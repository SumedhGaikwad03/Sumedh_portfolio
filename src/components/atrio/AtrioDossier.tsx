import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import AtrioArchitectureDiagram from "./AtrioArchitectureDiagram";
import RealtimeSyncFlow from "./RealtimeSyncFlow";
import PresenceSystem from "./PresenceSystem";
import DecisionCard from "../finance-one/DecisionCard";
import type { DecisionProps } from "../finance-one/DecisionCard";
import ProjectNavigation from "../ProjectNavigation";
import type { Project } from "../../data/content";

const atrioDecisions: DecisionProps[] = [
  {
    id: "01",
    title: "Room-Based Multi-Tenant Authorization",
    category: "Access Control",
    decision: "All note and task reads and writes verify room.members.includes(req.userId) rather than simple creator-only ownership.",
    why: "Enables real-time collaborative editing for all authorized teammates in a workspace while strictly isolating non-members from unauthorized access.",
    tradeoff: "Requires an additional database query to verify parent room membership on every note/task modification.",
  },
  {
    id: "02",
    title: "In-Memory Multi-Connection Presence Map",
    category: "State Management",
    decision: "Tracking room presence using a nested Map<roomId, Map<userId, socketCount>> on the Socket.io server instance.",
    why: "Accurately reflects active human presence across multi-tab or multi-window sessions without triggering phantom offline broadcasts upon closing a single tab.",
    tradeoff: "Presence state resides in Node.js process memory; horizontal multi-instance scaling would require an external Redis adapter.",
  },
  {
    id: "03",
    title: "Stateless Session Revocation via passwordChangedAt",
    category: "Security",
    decision: "Recording passwordChangedAt timestamps on user models and comparing against the JWT issued-at (iat) timestamp in authMiddleware.",
    why: "Instantly revokes active sessions across all devices when credentials are changed, without requiring a stateful token blacklist database.",
    tradeoff: "Requires querying the User collection on authenticated HTTP requests to inspect the passwordChangedAt field.",
  },
  {
    id: "04",
    title: "Automatic Cascade Cleanup via Pre-Hooks",
    category: "Data Integrity",
    decision: "Using Mongoose pre('findOneAndDelete') middleware on the Room schema to delete associated Notes and Tasks when a room is removed.",
    why: "Guarantees database consistency and prevents orphaned documents when the last member leaves a collaborative room.",
    tradeoff: "Couples document deletion lifecycles directly to Mongoose middleware query execution paths.",
  },
  {
    id: "05",
    title: "Deterministic Hash-Based Visual Note Tilt",
    category: "Frontend Architecture",
    decision: "Computing natural sticky-note rotation angles mathematically from the last 3 hex characters of the document's MongoDB ObjectId.",
    why: "Produces consistent, pleasant visual jitter across all browsers and re-renders without storing presentation metadata in the database.",
    tradeoff: "Card tilt angles are fixed within a deterministic [-3deg, +3deg] range based on the ObjectId hash rather than user-customizable.",
  },
  {
    id: "06",
    title: "Optimistic UI with Socket Deduplication",
    category: "Real-Time Sync",
    decision: "Inserting temporary client records (temp-<timestamp>) with immediate rendering, reconciled upon HTTP/Socket arrival.",
    why: "Provides zero-latency tactile feedback for the author while ensuring room peers receive live updates via WebSocket broadcasts.",
    tradeoff: "Requires deduplication logic in socket event listeners to prevent duplicate cards when both HTTP response and WebSocket broadcast arrive.",
  },
];

export default function AtrioDossier({ project }: { project: Project }) {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-16">
      {/* 1. Navigation & Header */}
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
            // DOSSIER::SYS_ARCH_02
          </span>
          <span className="mono-label text-[10px] text-[var(--color-accent)] border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] rounded px-2 py-0.5 font-mono">
            STATUS::DEPLOYED_BETA
          </span>
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2 py-0.5 font-mono">
            PROTOCOL::REST + WEBSOCKET
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-ink)] mb-4">
          Atrio
        </h1>
        <p className="text-base sm:text-xl text-[var(--color-slate)] leading-relaxed max-w-3xl mb-6">
          A real-time collaborative workspace engineered around dual-channel HTTP/WebSocket synchronization, multi-tenant room isolation, and low-latency team presence.
        </p>

        {/* Action Links & Tech Stack */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded bg-[var(--color-terminal)] text-[#0B0D0F] hover:bg-[var(--color-terminal)]/90 transition-colors"
            >
              <span>LIVE BETA DEPLOYMENT</span>
              <ExternalLink size={12} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors"
            >
              <Github size={13} />
              <span>SOURCE REPOSITORY</span>
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

      {/* 2. Core Problem & Engineering Philosophy */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 01</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            THE COLLABORATIVE SYNCHRONIZATION PROBLEM
          </h2>
        </div>

        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 space-y-5">
          <h3 className="text-xl font-bold text-[var(--color-ink)]">
            Coordinating Persistence with Sub-Millisecond Event Propagation
          </h3>
          <p className="text-sm sm:text-base text-[var(--color-slate)] leading-relaxed">
            Lightweight collaboration tools often make a dangerous architectural tradeoff: either they rely exclusively on slow request-polling APIs that introduce jarring latency, or they treat WebSockets as an ad-hoc database replacement, risking state loss and complex rollback handling.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-4 space-y-2">
              <span className="text-[10px] font-mono text-[var(--color-terminal)] block">
                CHANNEL 01 // REST PERSISTENCE
              </span>
              <h4 className="text-sm font-bold text-[var(--color-ink)]">
                Durable Truth & Authorization
              </h4>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Express routes handle authentication, input validation, and durable writes to MongoDB. All write mutations persist before socket events are broadcast.
              </p>
            </div>

            <div className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-4 space-y-2">
              <span className="text-[10px] font-mono text-[var(--color-accent)] block">
                CHANNEL 02 // WEBSOCKET SYNC
              </span>
              <h4 className="text-sm font-bold text-[var(--color-ink)]">
                Real-Time Event Propagation
              </h4>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Socket.io manages room channels, connection-counted presence tracking, and broadcast events (<code className="text-[var(--color-accent)]">note_created</code>, <code className="text-[var(--color-accent)]">task_updated</code>, <code className="text-[var(--color-accent)]">note_editing_start</code>).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dual-Channel Architecture Diagram */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 02</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            SYSTEM ARCHITECTURE & DUAL-CHANNEL COOPERATION
          </h2>
        </div>

        <AtrioArchitectureDiagram />
      </section>

      {/* 4. Real-Time Sync & Optimistic UI */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 03</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            MUTATION LIFECYCLE & OPTIMISTIC RECONCILIATION
          </h2>
        </div>

        <RealtimeSyncFlow />
      </section>

      {/* 5. In-Memory Presence Engine */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 04</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            IN-MEMORY PRESENCE & MULTI-TAB DEDUPLICATION
          </h2>
        </div>

        <PresenceSystem />
      </section>

      {/* 6. Security & Multi-Tenant Boundaries */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 05</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            SECURITY MODEL & SESSION REVOCATION
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-2.5">
            <span className="mono-label text-[10px] text-[var(--color-terminal)] block font-mono">
              [PASSWORD INVALIDATION]
            </span>
            <h4 className="text-base font-bold text-[var(--color-ink)]">
              Stateless Revocation
            </h4>
            <p className="text-xs text-[var(--color-slate)] leading-relaxed">
              When a password is changed, <code className="text-[var(--color-terminal)]">passwordChangedAt</code> is updated in MongoDB. Auth middleware compares token <code className="text-[var(--color-terminal)]">iat * 1000</code> against this timestamp, instantly revoking older active JWT sessions across all devices.
            </p>
          </div>

          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-2.5">
            <span className="mono-label text-[10px] text-[var(--color-terminal)] block font-mono">
              [COLLABORATIVE ACCESS]
            </span>
            <h4 className="text-base font-bold text-[var(--color-ink)]">
              Room Membership Scoping
            </h4>
            <p className="text-xs text-[var(--color-slate)] leading-relaxed">
              Access to room notes and tasks enforces <code className="text-[var(--color-terminal)]">room.members.includes(req.userId)</code>. This allows multi-user shared editing while ensuring users from outside the room receive HTTP 403 Access Denied.
            </p>
          </div>

          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-2.5">
            <span className="mono-label text-[10px] text-[var(--color-terminal)] block font-mono">
              [WEBSOCKET HANDSHAKE]
            </span>
            <h4 className="text-base font-bold text-[var(--color-ink)]">
              Authenticated Sockets
            </h4>
            <p className="text-xs text-[var(--color-slate)] leading-relaxed">
              Socket connections authenticate via JWT in the handshake (<code className="text-[var(--color-terminal)]">socket.handshake.auth.token</code>). Sockets without valid credentials are terminated prior to establishing subscriptions.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Verified Engineering Decisions */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 06</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            VERIFIED ENGINEERING DECISIONS & TRADEOFFS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {atrioDecisions.map((d) => (
            <DecisionCard key={d.id} {...d} />
          ))}
        </div>
      </section>

      {/* 8. Implementation Status & Limitations */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[var(--color-terminal)] font-semibold">// 07</span>
          <h2 className="mono-label font-bold text-[var(--color-ink)] tracking-wider">
            IMPLEMENTED CAPABILITIES & TECHNICAL BOUNDARIES
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="rounded border border-[var(--color-terminal)]/30 bg-[var(--color-surface)] p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2">
              <span className="text-[var(--color-terminal)] font-bold">
                [✓] VERIFIED IMPLEMENTATION
              </span>
              <span className="text-[10px] text-[var(--color-terminal)]">COMPLETE</span>
            </div>
            <ul className="space-y-1.5 text-[var(--color-slate)]">
              <li>&bull; JWT authentication + passwordChangedAt session invalidation</li>
              <li>&bull; Room creation, member email invites ($addToSet), and departures</li>
              <li>&bull; Mongoose pre('findOneAndDelete') cascade cleanup hooks</li>
              <li>&bull; In-memory multi-connection presence engine with tab counting</li>
              <li>&bull; Real-time sticky notes with live "Editing..." status broadcasting</li>
              <li>&bull; Real-time task sidebar with progress calculation and timestamps</li>
              <li>&bull; Deterministic hash-based sticky-note visual rotation jitter</li>
            </ul>
          </div>

          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2">
              <span className="text-[var(--color-slate-light)] font-bold">
                [!] SYSTEM BOUNDARIES & ROADMAP
              </span>
              <span className="text-[10px] text-[var(--color-slate-light)]">PLANNED</span>
            </div>
            <ul className="space-y-1.5 text-[var(--color-slate)]">
              <li>&bull; Single-node memory presence (Redis Pub/Sub required for multi-node clustering)</li>
              <li>&bull; Plain text note formatting (CRDT / Yjs rich-text transformation is a future goal)</li>
              <li>&bull; Activity audit logs (models exist in codebase in commented-out state)</li>
              <li>&bull; Automated multi-browser E2E integration test suite</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9. Cross-Dossier Navigation */}
      <ProjectNavigation currentSlug={project.slug} />
    </article>
  );
}
