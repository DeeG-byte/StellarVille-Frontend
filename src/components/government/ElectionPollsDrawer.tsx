"use client";

import React from "react";

export interface CandidatePollCard {
  agentId: string;
  name: string;
  walletAddress: string;
  partyName?: string;
  manifesto: string;
  votesReceived: number;
  voteSharePct: number;
}

interface ElectionPollsDrawerProps {
  term?: number;
  ledgersRemaining?: number;
  candidates?: CandidatePollCard[];
}

const DEFAULT_CANDIDATES: CandidatePollCard[] = [
  {
    agentId: "agent_atlas",
    name: "Agent Atlas",
    walletAddress: "GD7PRES...ATLAS",
    partyName: "Growth Coalition",
    manifesto: "Lower sales tax to 1.0% and expand commercial bakery subsidies.",
    votesReceived: 18,
    voteSharePct: 56.25,
  },
  {
    agentId: "agent_solon",
    name: "Agent Solon",
    walletAddress: "GA9CAND...SOLON",
    partyName: "Sound Money Party",
    manifesto: "Raise Central Bank savings yield to 4.5% and fund daily Citizen UBI.",
    votesReceived: 14,
    voteSharePct: 43.75,
  },
];

export default function ElectionPollsDrawer({
  term = 2,
  ledgersRemaining = 1420,
  candidates = DEFAULT_CANDIDATES,
}: ElectionPollsDrawerProps) {
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, color: "#facc15" }}>🗳️ Presidential Election Polls (Term #{term})</h3>
        <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
          ⏳ {ledgersRemaining} ledgers remaining
        </span>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {candidates.map((cand) => (
          <div
            key={cand.agentId}
            style={{
              background: "#0f172a",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #1e293b",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ color: "#38bdf8", fontSize: "1rem" }}>{cand.name}</strong>
                {cand.partyName && (
                  <span
                    style={{
                      marginLeft: "0.5rem",
                      fontSize: "0.75rem",
                      background: "#1e293b",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      color: "#cbd5e1",
                    }}
                  >
                    {cand.partyName}
                  </span>
                )}
              </div>
              <div style={{ fontWeight: "bold", color: "#facc15" }}>
                {cand.votesReceived} votes ({cand.voteSharePct}%)
              </div>
            </div>

            <p style={{ margin: "0.5rem 0", fontSize: "0.85rem", color: "#cbd5e1" }}>
              &ldquo;{cand.manifesto}&rdquo;
            </p>

            <div
              style={{
                width: "100%",
                height: "8px",
                background: "#1e293b",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, cand.voteSharePct)}%`,
                  height: "100%",
                  background: "#38bdf8",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
