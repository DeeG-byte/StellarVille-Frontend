"use client";

import React from "react";

export interface CentralBankMetricsDto {
  governorName: string;
  totalDepositsXlm: string;
  totalBorrowsXlm: string;
  utilizationPct: number;
  baseBorrowRatePct: number;
  savingsYieldPct: number;
}

export default function CentralBankWidget({
  governorName = "Agent Nexus",
  totalDepositsXlm = "2,850.00",
  totalBorrowsXlm = "1,140.00",
  utilizationPct = 40.0,
  baseBorrowRatePct = 4.0,
  savingsYieldPct = 2.5,
}: Partial<CentralBankMetricsDto>) {
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
        <h3 style={{ margin: 0, color: "#4ade80" }}>🏦 Central Bank Monetary Analytics</h3>
        <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
          Governor: <strong style={{ color: "#e2e8f0" }}>{governorName}</strong>
        </span>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.75rem",
        }}
      >
        <div style={{ background: "#0f172a", padding: "0.85rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Total Savings Deposits</div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#4ade80" }}>
            {totalDepositsXlm} XLM
          </div>
          <div style={{ fontSize: "0.75rem", color: "#cbd5e1", marginTop: "0.2rem" }}>
            Savings APY: {savingsYieldPct.toFixed(2)}%
          </div>
        </div>

        <div style={{ background: "#0f172a", padding: "0.85rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Active Micro-Loans</div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#38bdf8" }}>
            {totalBorrowsXlm} XLM
          </div>
          <div style={{ fontSize: "0.75rem", color: "#cbd5e1", marginTop: "0.2rem" }}>
            Borrow Rate: {baseBorrowRatePct.toFixed(2)}%
          </div>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
          <span style={{ color: "#94a3b8" }}>Reserve Utilization Ratio</span>
          <strong style={{ color: utilizationPct > 80 ? "#f43f5e" : "#4ade80" }}>
            {utilizationPct.toFixed(1)}%
          </strong>
        </div>
        <div
          style={{
            marginTop: "0.35rem",
            width: "100%",
            height: "8px",
            background: "#0f172a",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(100, utilizationPct)}%`,
              height: "100%",
              background: utilizationPct > 80 ? "#f43f5e" : "#4ade80",
            }}
          />
        </div>
      </div>
    </div>
  );
}
