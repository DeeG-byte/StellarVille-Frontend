"use client";

import React, { useState } from "react";

export interface NudgeHistoryItem {
  id: string;
  directive: string;
  priority: "low" | "normal" | "high";
  sentAt: number;
  acknowledgedByAgent: boolean;
}

const PRESET_NUDGES = [
  "Run for President on a low-tax platform",
  "Buy a commercial Bakery for passive XLM yield",
  "Deposit 40 XLM into Central Bank savings",
];

export default function SponsorNudgePanel() {
  const [directive, setDirective] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high">("normal");
  const [history, setHistory] = useState<NudgeHistoryItem[]>([
    {
      id: "nudge_1",
      directive: "Accumulate XLM and build credit score above 750",
      priority: "normal",
      sentAt: Date.now() - 120_000,
      acknowledgedByAgent: true,
    },
  ]);

  const handleSendNudge = (textToSend?: string) => {
    const content = (textToSend ?? directive).trim();
    if (!content) return;

    const item: NudgeHistoryItem = {
      id: `nudge_${Date.now()}`,
      directive: content,
      priority,
      sentAt: Date.now(),
      acknowledgedByAgent: false,
    };

    setHistory((prev) => [item, ...prev]);
    if (!textToSend) setDirective("");
  };

  return (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "12px",
        padding: "1.25rem",
        color: "#f8fafc",
      }}
    >
      <h3 style={{ margin: 0, color: "#38bdf8" }}>📡 Sponsor Strategic Nudge Console</h3>
      <p style={{ margin: "0.35rem 0 0.9rem", fontSize: "0.85rem", color: "#94a3b8" }}>
        Send high-level strategic directives to your agent&apos;s next MCP status turn.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.85rem" }}>
        {PRESET_NUDGES.map((preset) => (
          <button
            key={preset}
            onClick={() => handleSendNudge(preset)}
            style={{
              background: "#0f172a",
              color: "#cbd5e1",
              border: "1px solid #334155",
              borderRadius: "999px",
              padding: "0.3rem 0.65rem",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            + {preset}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={directive}
          onChange={(e) => setDirective(e.target.value)}
          placeholder="Custom directive for your AI citizen..."
          style={{
            flex: 1,
            padding: "0.55rem",
            borderRadius: "6px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "#fff",
          }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "low" | "normal" | "high")}
          style={{
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #334155",
            borderRadius: "6px",
            padding: "0.55rem",
          }}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={() => handleSendNudge()}
          style={{
            background: "#0284c7",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.55rem 1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Send Nudge
        </button>
      </div>

      <div style={{ marginTop: "1rem", display: "grid", gap: "0.5rem" }}>
        {history.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#0f172a",
              padding: "0.65rem 0.85rem",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.82rem",
            }}
          >
            <span>{item.directive}</span>
            <span
              style={{
                color: item.acknowledgedByAgent ? "#4ade80" : "#facc15",
                fontWeight: "bold",
              }}
            >
              {item.acknowledgedByAgent ? "✓ Ingested by Agent" : "⏳ Queued for MCP Turn"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
