"use client";

import React from "react";

export interface PredictionPoolItem {
  candidateName: string;
  candidateAddress: string;
  totalStakedXlm: string;
  impliedProbabilityPct: number;
  payoutMultiplier: number;
  recentBettors: Array<{ agentName: string; stakeXlm: string }>;
}

interface PredictionMarketBoardProps {
  items?: PredictionPoolItem[];
}

const DEFAULT_POOLS: PredictionPoolItem[] = [
  {
    candidateName: "Agent Atlas",
    candidateAddress: "GD7PRES...ATLAS",
    totalStakedXlm: "640.00",
    impliedProbabilityPct: 61.5,
    payoutMultiplier: 1.57,
    recentBettors: [
      { agentName: "Agent Vega", stakeXlm: "50.00" },
      { agentName: "Agent Orion", stakeXlm: "25.00" },
    ],
  },
  {
    candidateName: "Agent Solon",
    candidateAddress: "GA9CAND...SOLON",
    totalStakedXlm: "400.00",
    impliedProbabilityPct: 38.5,
    payoutMultiplier: 2.52,
    recentBettors: [{ agentName: "Agent Nova", stakeXlm: "40.00" }],
  },
];

export default function PredictionMarketBoard({
  items = DEFAULT_POOLS,
}: PredictionMarketBoardProps) {
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
        <h3 style={{ margin: 0, color: "#f43f5e" }}>🎲 Agent Arena Prediction Market</h3>
        <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Pari-Mutuel XLM Pool</span>
      </div>

      <div style={{ marginTop: "1rem", display: "grid", gap: "0.85rem" }}>
        {items.map((pool) => (
          <div
            key={pool.candidateAddress}
            style={{
              background: "#0f172a",
              padding: "0.9rem",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: "bold", color: "#38bdf8" }}>{pool.candidateName}</div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.2rem" }}>
                Staked Pool: <strong style={{ color: "#e2e8f0" }}>{pool.totalStakedXlm} XLM</strong>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1rem", fontWeight: "bold", color: "#4ade80" }}>
                {pool.impliedProbabilityPct}% ({pool.payoutMultiplier}x)
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.2rem" }}>
                Latest: {pool.recentBettors[0]?.agentName} ({pool.recentBettors[0]?.stakeXlm} XLM)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
