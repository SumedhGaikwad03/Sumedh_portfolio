import { useState } from "react";
import { Wifi, CheckCircle2, RefreshCw } from "lucide-react";

export default function PresenceSystem() {
  const [tabCount, setTabCount] = useState<number>(2);

  const isOnline = tabCount > 0;

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="mono-label text-[10px] text-[var(--color-terminal)] block mb-1">
            // PRESENCE::MULTI_CONNECTION_DEDUPLICATION
          </span>
          <h3 className="text-lg font-bold text-[var(--color-ink)]">
            In-Memory Presence State Engine
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono-label text-[10px] text-[var(--color-terminal)] border border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)] rounded px-2 py-0.5 font-mono">
            [Map&lt;roomId, Map&lt;userId, socketCount&gt;&gt;]
          </span>
        </div>
      </div>

      <p className="text-sm text-[var(--color-slate)] leading-relaxed">
        In real-time workspaces, users frequently open multiple tabs, refresh pages, or use split-screen windows. Naive tracking ties presence 1:1 to a raw socket ID: when one tab disconnects or refreshes, the user is prematurely broadcasted as offline. Atrio solves this using a <strong>connection-counted nested map</strong> in server memory.
      </p>

      {/* Interactive Simulation & Code View */}
      <div className="grid lg:grid-cols-12 gap-6 pt-2">
        {/* Left: Interactive Multi-Tab Simulator */}
        <div className="lg:col-span-6 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 mb-4">
              <h4 className="text-sm font-bold font-mono text-[var(--color-ink)] flex items-center gap-2">
                <Wifi size={14} className={isOnline ? "text-[var(--color-terminal)]" : "text-[var(--color-slate)]"} />
                <span>Interactive Multi-Tab Simulator</span>
              </h4>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isOnline
                    ? "text-[var(--color-terminal)] border-[var(--color-terminal)]/30 bg-[var(--color-terminal-soft)]"
                    : "text-[var(--color-slate-light)] border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                USER STATE: {isOnline ? "ONLINE" : "OFFLINE"}
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
                <div>
                  <span className="text-[var(--color-ink)] font-semibold block">
                    User: "sumedh_dev"
                  </span>
                  <span className="text-[11px] text-[var(--color-slate)]">
                    Active browser tabs in Room "Engineering":
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-[var(--color-terminal)] block">
                    {tabCount}
                  </span>
                  <span className="text-[10px] text-[var(--color-slate-light)]">
                    socketCount
                  </span>
                </div>
              </div>

              {/* Tab Controls */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTabCount((prev) => Math.min(prev + 1, 4))}
                  className="flex-1 py-2 px-3 rounded border border-[var(--color-terminal)]/40 bg-[var(--color-terminal-soft)] text-[var(--color-terminal)] text-xs font-mono font-semibold hover:bg-[var(--color-terminal)]/20 transition-colors"
                >
                  + Open New Tab
                </button>
                <button
                  type="button"
                  onClick={() => setTabCount((prev) => Math.max(prev - 1, 0))}
                  disabled={tabCount === 0}
                  className="flex-1 py-2 px-3 rounded border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-xs font-mono font-semibold hover:bg-[var(--color-accent)]/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  - Close One Tab
                </button>
                <button
                  type="button"
                  onClick={() => setTabCount(2)}
                  className="py-2 px-3 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)] text-xs font-mono hover:text-[var(--color-ink)]"
                  title="Reset to 2 tabs"
                >
                  <RefreshCw size={12} />
                </button>
              </div>

              {/* Real-Time Outcome Box */}
              <div className="p-3 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[11px] leading-relaxed">
                {tabCount > 1 && (
                  <p className="text-[var(--color-terminal)]">
                    &bull; User has {tabCount} active WebSocket connections. Closing 1 tab decrements socketCount to {tabCount - 1} without broadcasting a disconnect.
                  </p>
                )}
                {tabCount === 1 && (
                  <p className="text-[var(--color-terminal)]">
                    &bull; Exactly 1 connection remains active. Closing this final tab will reduce socketCount to 0 and trigger the offline broadcast.
                  </p>
                )}
                {tabCount === 0 && (
                  <p className="text-[var(--color-accent)]">
                    &bull; All sockets disconnected. User removed from roomOnlineUsers Map and offline state broadcasted via online_users_update.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[var(--color-slate-light)] border-t border-[var(--color-border-subtle)] pt-2 flex items-center gap-1">
            <CheckCircle2 size={12} className="text-[var(--color-terminal)]" />
            <span>Eliminates presence flicker on page refresh or multi-tab usage.</span>
          </div>
        </div>

        {/* Right: Server Memory Data Structure */}
        <div className="lg:col-span-6 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between space-y-4">
          <div>
            <span className="mono-label text-[10px] text-[var(--color-slate-light)] block mb-2 font-mono">
              SERVER-SIDE MEMORY STRUCTURE:
            </span>

            <div className="rounded bg-[#0B0D0F] p-4 border border-[var(--color-border-subtle)] font-mono text-xs text-[var(--color-ink)] space-y-1 overflow-x-auto">
              <span className="text-[var(--color-slate-light)]">// backend/socket.js presence state</span>
              <div><span className="text-[var(--color-accent)]">const</span> roomOnlineUsers = <span className="text-[var(--color-terminal)]">new Map()</span>;</div>
              <div className="pt-2 text-[var(--color-slate-light)]">// Current RAM Snapshot:</div>
              <div>Map &#123;</div>
              <div className="pl-4 text-[var(--color-slate)]">
                <span className="text-[var(--color-terminal)]">"66a01b2f91"</span> =&gt; Map &#123;
              </div>
              <div className="pl-8 text-[var(--color-ink)]">
                <span className="text-[var(--color-accent)]">"user_sumedh"</span> =&gt; <span className="text-[var(--color-terminal)] font-bold">{tabCount}</span>,
              </div>
              <div className="pl-8 text-[var(--color-slate)]">
                <span className="text-[var(--color-accent)]">"user_alex"</span> =&gt; <span className="text-[var(--color-terminal)]">1</span>
              </div>
              <div className="pl-4 text-[var(--color-slate)]">&#125;</div>
              <div>&#125;</div>
            </div>

            <div className="mt-3 text-xs text-[var(--color-slate)] space-y-1.5 font-mono text-[11px]">
              <div><strong className="text-[var(--color-ink)]">Disconnect Logic:</strong></div>
              <div>if (currentCount &lt;= 1) &#123; userMap.delete(userId); &#125;</div>
              <div>else &#123; userMap.set(userId, currentCount - 1); &#125;</div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[var(--color-slate-light)] border-t border-[var(--color-border-subtle)] pt-2">
            Broadcast: io.to(roomKey).emit("online_users_update", Array.from(userMap.keys()))
          </div>
        </div>
      </div>
    </div>
  );
}
