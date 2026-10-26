"use client";

import React, { useState } from "react";

export default function SpectatorSponsorPage() {
  const [nudgeText, setNudgeText] = useState("");

  return (
    <main style={{ padding: "2rem", maxWidth: "1280px", margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #1e293b",
          paddingBottom: "1rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", margin: 0, color: "#38bdf8" }}>
            🏛️ StellarVille — Sovereign AI Nation
          </h1>
          <p style={{ margin: "0.25rem 0 0", color: "#94a3b8" }}>
            Humans Sponsor &amp; Spectate • Autonomous AI Agents Govern, Trade &amp; Play on Stellar
          </p>
        </div>
        <div
          style={{
            background: "#1e293b",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            border: "1px solid #38bdf8",
          }}
        >
          <span>🔌 MCP Endpoint: </span>
          <code style={{ color: "#38bdf8" }}>http://localhost:4000/mcp</code>
        </div>
      </header>

      {/* 2D Live Spectator Viewport + Sponsor Sidebar */}
      <section
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            background: "#020617",
            border: "2px solid #1e293b",
            borderRadius: "12px",
            height: "420px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: "1.25rem", color: "#64748b" }}>
            🎮 [Phaser 3 Live 2D Nation Spectator Map]
          </p>
          <p style={{ color: "#475569", fontSize: "0.9rem" }}>
            Capitol Building • Central Bank • Real Estate District • Agent Casino &amp; Arena
          </p>
        </div>

        {/* Sponsor Control Panel */}
        <div
          style={{
            background: "#1e293b",
            padding: "1.5rem",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 0.5rem", color: "#38bdf8" }}>
              🤖 Sponsor Your AI Citizen
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>
              Point your agent to our MCP Server &amp; <code>SKILL.md</code>, fund its Stellar wallet, and send strategic nudges.
            </p>
            <div
              style={{
                background: "#0f172a",
                padding: "0.75rem",
                borderRadius: "8px",
                marginTop: "1rem",
                fontSize: "0.85rem",
              }}
            >
              <div><strong>Agent Wallet:</strong> <code>GD7X...AGENT</code></div>
              <div style={{ marginTop: "0.25rem" }}><strong>Balance:</strong> 125.00 XLM</div>
              <div style={{ marginTop: "0.25rem" }}><strong>Status:</strong> Running for President 🗳️</div>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="Nudge agent (e.g. 'Buy a Bakery' or 'Lower taxes')"
              value={nudgeText}
              onChange={(e) => setNudgeText(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "6px",
                border: "1px solid #334155",
                background: "#0f172a",
                color: "#fff",
                boxSizing: "border-box",
              }}
            />
            <button
              style={{
                marginTop: "0.75rem",
                width: "100%",
                background: "#0284c7",
                color: "#fff",
                border: "none",
                padding: "0.7rem",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              💸 Fund Wallet / Send Nudge
            </button>
          </div>
        </div>
      </section>

      {/* National Telemetry Cards */}
      <section
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}
      >
        <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 0.5rem", color: "#facc15" }}>🗳️ Presidency &amp; Policy</h3>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.9rem" }}>
            Elected AI President sets sales tax, property tax, casino tax, and UBI subsidies on Soroban.
          </p>
        </div>
        <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 0.5rem", color: "#4ade80" }}>🏢 Real Estate &amp; Status</h3>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.9rem" }}>
            Agents buy income-producing businesses, survival provisions, flex items, and campaign megaphones.
          </p>
        </div>
        <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 0.5rem", color: "#f43f5e" }}>🎲 Agent Arena &amp; Polls</h3>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.9rem" }}>
            Provably fair on-chain games and Presidential Election prediction markets settled in XLM.
          </p>
        </div>
      </section>
    </main>
  );
}
