import { useState } from "react";

interface Step {
  num: string;
  title: string;
  actor: "CLIENT" | "BACKEND" | "DATABASE" | "SOCKET" | "PEERS";
  desc: string;
  codeSnippet: string;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Optimistic Local Insertion",
    actor: "CLIENT",
    desc: "User submits a note. Client generates a temporary ID ('temp-' + Date.now()), renders it immediately in local React state with { isOptimistic: true }, and closes the modal with 0ms perceived latency.",
    codeSnippet: "const tempId = 'temp-' + Date.now();\nsetNotes(prev => [{ _id: tempId, title, content, isOptimistic: true }, ...prev]);",
  },
  {
    num: "02",
    title: "Authenticated REST Mutation",
    actor: "CLIENT",
    desc: "Axios client dispatches POST /api/notes/add with Bearer JWT token attached via request interceptor.",
    codeSnippet: "await api.post('/notes/add', { title, content, roomId });",
  },
  {
    num: "03",
    title: "Room Authorization Verification",
    actor: "BACKEND",
    desc: "Express authMiddleware extracts req.userId and checks token timestamp. Handler queries Room collection to verify user is in room.members.",
    codeSnippet: "const room = await Room.findOne({ _id: roomId, members: req.userId });\nif (!room) return res.status(403).json({ message: 'Access denied' });",
  },
  {
    num: "04",
    title: "Durable MongoDB Persistence",
    actor: "DATABASE",
    desc: "Backend persists Note document in MongoDB, associates it with room and user, and populates the author's username for presentation.",
    codeSnippet: "const note = await Note.create({ title, content, user: req.userId, room: roomId });\nconst populatedNote = await note.populate('user', 'username');",
  },
  {
    num: "05",
    title: "Room-Scoped Socket.io Broadcast",
    actor: "SOCKET",
    desc: "Backend retrieves Socket.io singleton (getIO()) and emits 'note_created' strictly to the room's WebSocket channel (io.to(roomId)).",
    codeSnippet: "const io = getIO();\nio.to(roomId.toString()).emit('note_created', populatedNote);",
  },
  {
    num: "06",
    title: "Reconciliation & Deduplication",
    actor: "PEERS",
    desc: "Author client replaces temporary note with real server note. Peer clients in the room receive the socket event and prepend the new note. If the REST call fails, author client rolls back state.",
    codeSnippet: "socket.on('note_created', (note) => {\n  setNotes(prev => prev.some(n => n._id === note._id) ? prev : [note, ...prev]);\n});",
  },
];

export default function RealtimeSyncFlow() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const cur = steps[activeStep];

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // LIFECYCLE::MUTATION_PIPELINE
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            End-to-End Real-Time Sync & Reconciliation
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
            [ZERO PERCEIVED LATENCY + RECONCILIATION]
          </span>
        </div>
      </div>

      {/* Interactive Step Navigator */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((s, idx) => {
          const isSelected = idx === activeStep;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded border text-left transition-all duration-150 flex flex-col justify-between ${
                isSelected
                  ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)] shadow-[0_0_10px_rgba(126,231,135,0.15)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-bright)]"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isSelected ? "text-[var(--color-terminal)]" : "text-[var(--color-slate-light)]"
                  }`}
                >
                  STEP {s.num}
                </span>
                <span className="text-[9px] font-mono text-[var(--color-accent)] border border-[var(--color-accent)]/20 px-1 rounded">
                  {s.actor}
                </span>
              </div>
              <span className="text-xs font-bold text-[var(--color-ink)] line-clamp-1">
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Step Display */}
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold text-[var(--color-terminal)]">
              // STAGE {cur.num}:
            </span>
            <h4 className="text-base font-bold text-[var(--color-ink)]">
              {cur.title}
            </h4>
          </div>
          <span className="text-xs font-mono text-[var(--color-slate)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2 py-0.5">
            EXECUTING ACTOR: <strong className="text-[var(--color-accent)]">{cur.actor}</strong>
          </span>
        </div>

        <p className="text-sm text-[var(--color-slate)] leading-relaxed">
          {cur.desc}
        </p>

        <div className="rounded bg-[#0B0D0F] p-4 border border-[var(--color-border-subtle)] overflow-x-auto">
          <span className="mono-label text-[10px] text-[var(--color-slate-light)] block mb-2 font-mono">
            VERIFIED SOURCE IMPLEMENTATION:
          </span>
          <pre className="text-xs font-mono text-[var(--color-terminal)] whitespace-pre-wrap leading-relaxed">
            {cur.codeSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}
