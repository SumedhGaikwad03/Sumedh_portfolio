import { useState } from "react";
import { Zap, Shield, Layers } from "lucide-react";

interface LayerDetail {
  id: string;
  title: string;
  protocol: string;
  role: string;
  files: string[];
  responsibility: string;
  invariant: string;
  security: string;
}

const layers: LayerDetail[] = [
  {
    id: "rest",
    title: "01 // REST API & Persistence Channel",
    protocol: "HTTP/1.1 (JSON)",
    role: "Durable State & CRUD",
    files: ["backend/routes/notes.js", "backend/routes/rooms.js", "backend/routes/tasks.js"],
    responsibility: "Handles initial workspace hydration, durable CRUD mutations, user authentication, and room lifecycle management.",
    invariant: "All write mutations persist directly to MongoDB before socket events are broadcasted to ensure durable truth.",
    security: "authMiddleware validates Bearer JWT and checks passwordChangedAt against token issued-at timestamp.",
  },
  {
    id: "socket",
    title: "02 // WebSocket Real-Time Event Layer",
    protocol: "Socket.io (WebSocket / Polling Fallback)",
    role: "Sub-Millisecond Event Propagation",
    files: ["backend/socket.js", "frontend/src/sockets.js"],
    responsibility: "Propagates live room events (note_created, note_updated, task_updated), edit lock indicators, and online presence updates.",
    invariant: "Sockets join isolated room channels (io.to(roomId)) only after verifying room membership in MongoDB.",
    security: "Socket handshake authenticates JWT token; unauthorized connections are rejected before channel subscription.",
  },
  {
    id: "auth",
    title: "03 // Room-Scoped Multi-Tenant Boundary",
    protocol: "Domain Middleware & Membership Checks",
    role: "Access Control & Isolation",
    files: ["backend/middleware/auth.js", "backend/models/room.js"],
    responsibility: "Enforces that all note and task reads/writes verify room.members.includes(req.userId) rather than creator-only ownership.",
    invariant: "Collaborative editing allowed for all room members; non-members receive HTTP 403 Access Denied.",
    security: "Prevents cross-tenant data leakage across distinct collaborative room boundaries.",
  },
  {
    id: "presence",
    title: "04 // In-Memory Presence Engine",
    protocol: "RAM State (Map<roomId, Map<userId, count>>)",
    role: "Multi-Connection Deduplication",
    files: ["backend/socket.js"],
    responsibility: "Tracks active user presence per room by connection count rather than binary socket connection state.",
    invariant: "A user is marked offline only when their active socket count reaches 0, preventing multi-tab disconnect flicker.",
    security: "Presence updates are broadcasted strictly to authenticated room members within the target roomKey channel.",
  },
  {
    id: "database",
    title: "05 // Mongoose & MongoDB Document Storage",
    protocol: "MongoDB Wire Protocol",
    role: "Relational Document Invariants",
    files: ["backend/models/room.js", "backend/models/note.js", "backend/models/task.js"],
    responsibility: "Persists Users, Rooms, Notes, and Tasks. Enforces index on Task.room for rapid querying.",
    invariant: "RoomSchema.pre('findOneAndDelete') hook cascades deletion to all child Notes and Tasks when a room is removed.",
    security: "Strict schema casting and sanitization across all persistent collections.",
  },
];

export default function AtrioArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState<string>("socket");
  const selected = layers.find((l) => l.id === activeLayer) || layers[1];

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // ARCHITECTURE::DUAL_CHANNEL_SYSTEM
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            Separation of Persistence & Real-Time Sync
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
            [REST + SOCKET.IO COOPERATION]
          </span>
        </div>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        Atrio separates concerns by assigning <strong>durable persistence</strong> to an Express REST API and <strong>ephemeral synchronization</strong> to a Socket.io layer. WebSockets are not treated as a replacement for the database; rather, mutations first persist to MongoDB, after which the server emits real-time events to connected room peers.
      </p>

      <div className="grid lg:grid-cols-12 gap-6 pt-2">
        {/* Layer Selector Stack */}
        <div className="lg:col-span-6 space-y-2.5">
          {layers.map((layer) => {
            const isSelected = layer.id === activeLayer;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayer(layer.id)}
                onMouseEnter={() => setActiveLayer(layer.id)}
                className={`w-full text-left p-3.5 rounded border transition-all duration-150 flex items-center justify-between group ${
                  isSelected
                    ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_rgba(126,231,135,0.1)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected
                        ? "bg-[var(--color-terminal)] shadow-[0_0_6px_var(--color-terminal)]"
                        : "bg-[var(--color-border-bright)] group-hover:bg-[var(--color-slate)]"
                    }`}
                  />
                  <div>
                    <span className="text-xs font-mono font-bold text-[var(--color-ink)] block">
                      {layer.title}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-slate-light)]">
                      {layer.protocol}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
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

        {/* Dynamic Detail Card */}
        <div className="lg:col-span-6 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 mb-4">
              <h4 className="text-sm font-bold font-mono text-[var(--color-ink)] flex items-center gap-2">
                <Layers size={14} className="text-[var(--color-terminal)]" />
                <span>{selected.title}</span>
              </h4>
              <span className="text-[10px] font-mono text-[var(--color-accent)] border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] rounded px-2 py-0.5">
                {selected.role}
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="mono-label text-[10px] text-[var(--color-slate-light)] block mb-1">
                  RESPONSIBILITY & WORKFLOW:
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed">
                  {selected.responsibility}
                </p>
              </div>

              <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-terminal)] font-mono font-semibold block mb-1 flex items-center gap-1.5">
                  <Zap size={12} />
                  <span>SYSTEM INVARIANT:</span>
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed font-mono text-[11px]">
                  {selected.invariant}
                </p>
              </div>

              <div className="rounded bg-[var(--color-surface)] p-3 border border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-accent)] font-mono font-semibold block mb-1 flex items-center gap-1.5">
                  <Shield size={12} />
                  <span>SECURITY & ACCESS CONTROL:</span>
                </span>
                <p className="text-[var(--color-slate)] leading-relaxed font-mono text-[11px]">
                  {selected.security}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex flex-wrap gap-1.5">
            <span className="mono-label text-[10px] text-[var(--color-slate-light)] mr-1 self-center">SOURCE:</span>
            {selected.files.map((f) => (
              <span
                key={f}
                className="text-[10px] font-mono text-[var(--color-slate)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-1.5 py-0.5"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
