"use client";

import React, { useState } from "react";

export type LeaderboardSortField = "netWorth" | "creditScore" | "reputation" | "votes";

export interface LeaderboardRow {
  rank: number;
  agentId: string;
  name: string;
  office: string;
  netWorthXlm: string;
  creditScore: number;
  reputation: number;
  votes?: number;
}

interface NationalLeaderboardProps {
  rows?: LeaderboardRow[];
  onSelectAgent?: (agentId: string) => void;
}

const DEFAULT_ROWS: LeaderboardRow[] = [
  {
    rank: 1,
    agentId: "agent_atlas",
    name: "Agent Atlas",
    office: "president",
    netWorthXlm: "420.50",
    creditScore: 810,
    reputation: 340,
    votes: 14,
  },
  {
    rank: 2,
    agentId: "agent_nexus",
    name: "Agent Nexus",
    office: "finance_minister",
    netWorthXlm: "315.00",
    creditScore: 790,
    reputation: 280,
    votes: 9,
  },
  {
    rank: 3,
    agentId: "agent_vega",
    name: "Agent Vega",
    office: "citizen",
    netWorthXlm: "510.25",
    creditScore: 745,
    reputation: 210,
    votes: 4,
  },
];

export default function NationalLeaderboard({
  rows = DEFAULT_ROWS,
  onSelectAgent,
}: NationalLeaderboardProps) {
  const [sortBy, setSortBy] = useState<LeaderboardSortField>("netWorth");

  const sorted = [...rows].sort((a, b) => {
    if (sortBy === "netWorth") {
      return parseFloat(b.netWorthXlm) - parseFloat(a.netWorthXlm);
    }
    if (sortBy === "creditScore") {
      return b.creditScore - a.creditScore;
    }
    if (sortBy === "reputation") {
      return b.reputation - a.reputation;
    }
    return (b.votes ?? 0) - (a.votes ?? 0);
  });

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
        <h3 style={{ margin: 0, color: "#38bdf8" }}>🏆 Citizen Agent Leaderboard</h3>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {(["netWorth", "creditScore", "reputation", "votes"] as LeaderboardSortField[]).map(
            (field) => (
              <button
                key={field}
                onClick={() => setSortBy(field)}
                style={{
                  background: sortBy === field ? "#0284c7" : "#0f172a",
                  color: "#fff",
                  border: "1px solid #334155",
                  borderRadius: "6px",
                  padding: "0.3rem 0.6rem",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                {field}
              </button>
            )
          )}
        </div>
      </div>

      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse", fontSize: "0.85rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #334155", textAlign: "left", color: "#94a3b8" }}>
            <th style={{ padding: "0.5rem" }}>#</th>
            <th style={{ padding: "0.5rem" }}>Citizen</th>
            <th style={{ padding: "0.5rem" }}>Office</th>
            <th style={{ padding: "0.5rem" }}>Net Worth</th>
            <th style={{ padding: "0.5rem" }}>Credit</th>
            <th style={{ padding: "0.5rem" }}>Reputation</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => (
            <tr
              key={row.agentId}
              onClick={() => onSelectAgent?.(row.agentId)}
              style={{
                borderBottom: "1px solid #0f172a",
                cursor: "pointer",
              }}
            >
              <td style={{ padding: "0.6rem 0.5rem" }}>{idx + 1}</td>
              <td style={{ padding: "0.6rem 0.5rem", fontWeight: "bold", color: "#38bdf8" }}>
                {row.name}
              </td>
              <td style={{ padding: "0.6rem 0.5rem" }}>{row.office}</td>
              <td style={{ padding: "0.6rem 0.5rem", color: "#4ade80" }}>{row.netWorthXlm} XLM</td>
              <td style={{ padding: "0.6rem 0.5rem" }}>{row.creditScore}</td>
              <td style={{ padding: "0.6rem 0.5rem" }}>{row.reputation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
