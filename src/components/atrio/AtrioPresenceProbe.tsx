import { useState } from "react";
import { Users, Plus, Minus, RefreshCw, Terminal } from "lucide-react";

interface ConnectedUser {
  id: string;
  name: string;
  tabs: number;
}

export default function AtrioPresenceProbe() {
  const [users, setUsers] = useState<ConnectedUser[]>([
    { id: "u1", name: "Sumedh (You)", tabs: 2 },
    { id: "u2", name: "Alex (Staff Eng)", tabs: 1 },
    { id: "u3", name: "Priya (Designer)", tabs: 1 },
  ]);

  const updateTabs = (delta: number) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === "u1") {
          const newTabs = Math.max(0, Math.min(5, u.tabs + delta));
          return { ...u, tabs: newTabs };
        }
        return u;
      })
    );
  };

  const resetUsers = () => {
    setUsers([
      { id: "u1", name: "Sumedh (You)", tabs: 2 },
      { id: "u2", name: "Alex (Staff Eng)", tabs: 1 },
      { id: "u3", name: "Priya (Designer)", tabs: 1 },
    ]);
  };

  const sumedh = users.find((u) => u.id === "u1") || users[0];
  const totalSockets = users.reduce((acc, u) => acc + u.tabs, 0);
  const totalOnline = users.filter((u) => u.tabs > 0).length;

  return (
    <div className="rounded border border-[var(--color-border)] bg-[#0B0D0F] p-4 sm:p-5 font-mono text-xs space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-2.5">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-[var(--color-terminal)]" />
          <span className="font-bold text-[var(--color-ink)]">MULTI-CONNECTION PRESENCE STATE INSPECTOR</span>
        </div>
        <span className="text-[10px] text-[var(--color-slate-light)] border border-[var(--color-border)] bg-[var(--color-surface)] rounded px-2 py-0.5">
          SOCKET.IO IN-MEMORY SIMULATION
        </span>
      </div>

      {/* Main Grid: Left: Active Users in Room, Right: Map Data Structure */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left column: Room Users & Controls */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-[var(--color-slate)] border-b border-[var(--color-border-subtle)] pb-1.5">
            <span className="flex items-center gap-1.5 text-[var(--color-ink)] font-bold">
              <Users size={12} className="text-[var(--color-terminal)]" />
              <span>ROOM::WORKSPACE_ALPHA</span>
            </span>
            <span className="text-[10px] text-[var(--color-terminal)]">
              {totalOnline} USERS &bull; {totalSockets} ACTIVE SOCKETS
            </span>
          </div>

          <div className="space-y-2">
            {users.map((user) => {
              const isOnline = user.tabs > 0;
              const isCurrentUser = user.id === "u1";

              return (
                <div
                  key={user.id}
                  className={`p-2.5 rounded border transition-all duration-150 flex items-center justify-between ${
                    isOnline
                      ? isCurrentUser
                        ? "border-[var(--color-terminal)] bg-[var(--color-surface-elevated)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)]"
                      : "border-red-500/40 bg-red-500/5 text-[var(--color-slate-light)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-[var(--color-terminal)] animate-pulse" : "bg-red-500"}`} />
                    <div>
                      <span className={`font-bold block text-[11px] ${isOnline ? "text-[var(--color-ink)]" : "text-[var(--color-slate)]"}`}>
                        {user.name}
                      </span>
                      <span className="text-[10px] text-[var(--color-slate-light)]">
                        {isOnline ? `Status: ONLINE (${user.tabs} ${user.tabs === 1 ? "socket" : "sockets"})` : "Status: OFFLINE (0 sockets)"}
                      </span>
                    </div>
                  </div>

                  {isCurrentUser && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateTabs(-1)}
                        disabled={user.tabs === 0}
                        aria-label="Close one tab"
                        className="px-2 py-1 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:text-[var(--color-terminal)] hover:border-[var(--color-border-bright)] disabled:opacity-40 disabled:hover:text-inherit text-[10px] transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateTabs(1)}
                        disabled={user.tabs >= 5}
                        aria-label="Open one tab"
                        className="px-2 py-1 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:text-[var(--color-terminal)] hover:border-[var(--color-border-bright)] disabled:opacity-40 text-[10px] transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive controls for Sumedh */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => updateTabs(1)}
              className="px-2.5 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-terminal)] text-[11px] transition-colors flex items-center gap-1"
            >
              <Plus size={11} className="text-[var(--color-terminal)]" />
              <span>Open Another Tab (+1 Socket)</span>
            </button>

            <button
              type="button"
              onClick={() => updateTabs(-1)}
              disabled={sumedh.tabs === 0}
              className="px-2.5 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-bright)] disabled:opacity-40 text-[11px] transition-colors flex items-center gap-1"
            >
              <Minus size={11} />
              <span>Close Tab (-1 Socket)</span>
            </button>

            <button
              type="button"
              onClick={resetUsers}
              className="px-2 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] hover:text-[var(--color-ink)] text-[10px] ml-auto transition-colors"
            >
              <RefreshCw size={10} />
            </button>
          </div>
        </div>

        {/* Right column: In-Memory Data Structure & Insight */}
        <div className="md:col-span-5 space-y-2.5">
          <div className="text-[10px] text-[var(--color-slate-light)] border-b border-[var(--color-border-subtle)] pb-1">
            // IN-MEMORY HIERARCHY TRACE
          </div>

          <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[10px] space-y-1">
            <p className="text-[var(--color-terminal)] font-bold">
              Map&lt;roomId, Map&lt;userId, socketCount&gt;&gt;
            </p>
            <div className="pl-2 border-l border-[var(--color-border)] space-y-1 text-[var(--color-slate)]">
              <p className="text-[var(--color-ink)]">"WORKSPACE_ALPHA": &#123;</p>
              {users.map((u) => (
                <p key={u.id} className={`pl-2 ${u.tabs > 0 ? "text-[var(--color-terminal)]" : "text-red-400"}`}>
                  "{u.id}": {u.tabs} <span className="text-[var(--color-slate-light)]">// {u.tabs > 0 ? "ONLINE" : "DISCONNECTED"}</span>
                </p>
              ))}
              <p className="text-[var(--color-ink)]">&#125;</p>
            </div>
          </div>

          <div className="p-2.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[10px] text-[var(--color-slate)] leading-relaxed space-y-1">
            <span className="text-[var(--color-ink)] font-bold block">
              Architectural Invariant:
            </span>
            <p>
              {sumedh.tabs > 1 ? (
                <span>
                  Closing 1 of your {sumedh.tabs} tabs reduces your connection count to {sumedh.tabs - 1} without broadcasting a disconnect event to peers.
                </span>
              ) : sumedh.tabs === 1 ? (
                <span>
                  You have 1 active socket. Closing this tab will drop socket count to 0, triggering the official user-offline broadcast.
                </span>
              ) : (
                <span className="text-red-400 font-semibold">
                  Socket count reached 0. User is officially marked OFFLINE across the cluster.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
