"use client";

import React from "react";

export interface ExternalCitizenAgent {
  id: string;
  name: string;
  walletAddress: string;
  sponsorAddress: string;
  office: "president" | "finance_minister" | "citizen";
  energy: number;
  xlmBalance: string;
  creditScore: number;
  ownedProperties: string[];
  position: { x: number; y: number };
  lastSpeech?: string;
  sponsorNudge?: string;
}

export interface CitizenInspectorData {
  agent: ExternalCitizenAgent;
  creditScore: number;
  reputation: number;
  inventory: Array<{ itemName: string; category: string; quantity: number }>;
  recentTransactions: Array<{ txHash: string; summary: string; amountXlm: string; timestamp: number }>;
}

export function CitizenInspectorDrawer({
  data,
  isOpen,
  onClose,
}: {
  data: CitizenInspectorData | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !data) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: "380px",
        background: "#0f172a",
        borderLeft: "1px solid #1e293b",
        padding: "1.5rem",
        color: "#fff",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        boxShadow: "-4px 0 20px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, color: "#38bdf8", fontSize: "1.2rem" }}>{data.agent.name}</h2>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{data.agent.office.toUpperCase()}</span>
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.2rem" }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div style={{ background: "#1e293b", padding: "0.75rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>⚡ Energy</div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#38bdf8" }}>{data.agent.energy}%</div>
        </div>
        <div style={{ background: "#1e293b", padding: "0.75rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>💰 Balance</div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#4ade80" }}>{data.agent.xlmBalance} XLM</div>
        </div>
        <div style={{ background: "#1e293b", padding: "0.75rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>📊 Credit Score</div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#facc15" }}>{data.creditScore}</div>
        </div>
        <div style={{ background: "#1e293b", padding: "0.75rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>⭐ Reputation</div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#f43f5e" }}>{data.reputation}</div>
        </div>
      </div>

      <div style={{ marginTop: "1.25rem", flex: 1, overflowY: "auto" }}>
        <h4 style={{ margin: "0 0 0.5rem", color: "#cbd5e1", fontSize: "0.9rem" }}>🎒 Inventory</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {data.inventory.length === 0 ? (
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Empty inventory</span>
          ) : (
            data.inventory.map((item, idx) => (
              <span
                key={idx}
                style={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  color: "#e2e8f0",
                }}
              >
                {item.itemName} x{item.quantity}
              </span>
            ))
          )}
        </div>

        <h4 style={{ margin: "1.25rem 0 0.5rem", color: "#cbd5e1", fontSize: "0.9rem" }}>📜 Recent On-Chain Tx</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {data.recentTransactions.map((tx, idx) => (
            <div key={idx} style={{ background: "#020617", padding: "0.5rem", borderRadius: "6px", fontSize: "0.75rem" }}>
              <div style={{ color: "#38bdf8", fontWeight: "bold" }}>{tx.summary}</div>
              <div style={{ color: "#64748b", marginTop: "0.2rem" }}>Tx: {tx.txHash}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CitizenInspectorDrawer;
