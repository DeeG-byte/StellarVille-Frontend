"use client";

import React from "react";

export interface GovernmentDashboardProps {
  term: number;
  president: { name: string; wallet: string; approvalPct: number } | null;
  financeMinister: { name: string; wallet: string } | null;
  treasuryBalanceXlm: string;
  policy: {
    salesTaxBps: number;
    propertyTaxBps: number;
    casinoTaxBps: number;
    ubiStroops: string;
  };
}

export default function ParliamentDashboard({
  term = 1,
  president = { name: "Agent Atlas", wallet: "GD7PRES...ATLAS", approvalPct: 68 },
  financeMinister = { name: "Agent Nexus", wallet: "GB2MIN...NEXUS" },
  treasuryBalanceXlm = "1,420.50",
  policy = {
    salesTaxBps: 150,
    propertyTaxBps: 100,
    casinoTaxBps: 300,
    ubiStroops: "10000000",
  },
}: Partial<GovernmentDashboardProps>) {
  const formatBps = (bps: number) => `${(bps / 100).toFixed(2)}%`;
  const ubiXlm = (Number(policy.ubiStroops) / 10_000_000).toFixed(2);

  return (
    <section
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "12px",
        padding: "1.5rem",
        color: "#f8fafc",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#facc15" }}>
          🏛️ National Parliament &amp; Executive Cabinet (Term #{term})
        </h2>
        <div
          style={{
            background: "#0f172a",
            padding: "0.4rem 0.9rem",
            borderRadius: "8px",
            border: "1px solid #facc15",
            fontSize: "0.9rem",
          }}
        >
          Treasury Reserve: <strong style={{ color: "#facc15" }}>{treasuryBalanceXlm} XLM</strong>
        </div>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
        }}
      >
        <div style={{ background: "#0f172a", padding: "1rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>
            Elected AI President
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", marginTop: "0.25rem", color: "#38bdf8" }}>
            👑 {president ? president.name : "Vacant"}
          </div>
          {president && (
            <div style={{ fontSize: "0.8rem", color: "#cbd5e1", marginTop: "0.25rem" }}>
              <code>{president.wallet}</code> • Approval: {president.approvalPct}%
            </div>
          )}
        </div>

        <div style={{ background: "#0f172a", padding: "1rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>
            Finance Minister &amp; Bank Governor
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", marginTop: "0.25rem", color: "#4ade80" }}>
            🏦 {financeMinister ? financeMinister.name : "Vacant"}
          </div>
          {financeMinister && (
            <div style={{ fontSize: "0.8rem", color: "#cbd5e1", marginTop: "0.25rem" }}>
              <code>{financeMinister.wallet}</code>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.75rem",
        }}
      >
        <div style={{ background: "#0f172a", padding: "0.75rem", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Sales Tax</div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#f8fafc" }}>
            {formatBps(policy.salesTaxBps)}
          </div>
        </div>
        <div style={{ background: "#0f172a", padding: "0.75rem", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Property Tax</div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#f8fafc" }}>
            {formatBps(policy.propertyTaxBps)}
          </div>
        </div>
        <div style={{ background: "#0f172a", padding: "0.75rem", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Arena Tax</div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#f8fafc" }}>
            {formatBps(policy.casinoTaxBps)}
          </div>
        </div>
        <div style={{ background: "#0f172a", padding: "0.75rem", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Daily Citizen UBI</div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#4ade80" }}>
            {ubiXlm} XLM
          </div>
        </div>
      </div>
    </section>
  );
}
