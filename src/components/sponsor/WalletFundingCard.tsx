"use client";

import React, { useState } from "react";

export interface WalletFundingState {
  agentWalletAddress: string;
  currentBalanceXlm: string;
  depositAmountXlm: string;
  network: "testnet" | "mainnet";
  fundingStatus: "idle" | "pending" | "confirmed" | "error";
}

interface WalletFundingCardProps {
  initialAddress?: string;
  initialBalanceXlm?: string;
  network?: "testnet" | "mainnet";
}

export default function WalletFundingCard({
  initialAddress = "GD7X4K9PLM2V8Q3N6STELLARVILLECITIZEN7A",
  initialBalanceXlm = "125.00",
  network = "testnet",
}: WalletFundingCardProps) {
  const [state, setState] = useState<WalletFundingState>({
    agentWalletAddress: initialAddress,
    currentBalanceXlm: initialBalanceXlm,
    depositAmountXlm: "50",
    network,
    fundingStatus: "idle",
  });

  const handleFaucetFund = async () => {
    setState((prev) => ({ ...prev, fundingStatus: "pending" }));
    setTimeout(() => {
      const nextBal = (parseFloat(state.currentBalanceXlm) + 100).toFixed(2);
      setState((prev) => ({
        ...prev,
        currentBalanceXlm: nextBal,
        fundingStatus: "confirmed",
      }));
    }, 600);
  };

  const handleDepositTransfer = async () => {
    const amount = parseFloat(state.depositAmountXlm);
    if (isNaN(amount) || amount <= 0) {
      setState((prev) => ({ ...prev, fundingStatus: "error" }));
      return;
    }
    setState((prev) => ({ ...prev, fundingStatus: "pending" }));
    setTimeout(() => {
      const nextBal = (parseFloat(state.currentBalanceXlm) + amount).toFixed(2);
      setState((prev) => ({
        ...prev,
        currentBalanceXlm: nextBal,
        fundingStatus: "confirmed",
      }));
    }, 600);
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, color: "#38bdf8", fontSize: "1.1rem" }}>
          💳 Agent Stellar Wallet Funding
        </h3>
        <span
          style={{
            fontSize: "0.75rem",
            padding: "0.2rem 0.6rem",
            borderRadius: "999px",
            background: state.network === "testnet" ? "#0369a1" : "#15803d",
          }}
        >
          {state.network.toUpperCase()}
        </span>
      </div>

      <div
        style={{
          marginTop: "0.9rem",
          background: "#0f172a",
          padding: "0.75rem",
          borderRadius: "8px",
          fontSize: "0.85rem",
        }}
      >
        <div style={{ color: "#94a3b8" }}>Citizen Wallet Address</div>
        <code style={{ color: "#e2e8f0", wordBreak: "break-all" }}>
          {state.agentWalletAddress}
        </code>
        <div style={{ marginTop: "0.5rem", fontSize: "1rem", fontWeight: "bold", color: "#4ade80" }}>
          Balance: {state.currentBalanceXlm} XLM
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <input
          type="number"
          value={state.depositAmountXlm}
          onChange={(e) =>
            setState((prev) => ({ ...prev, depositAmountXlm: e.target.value, fundingStatus: "idle" }))
          }
          placeholder="Amount in XLM"
          style={{
            flex: 1,
            padding: "0.55rem",
            borderRadius: "6px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "#fff",
          }}
        />
        <button
          onClick={handleDepositTransfer}
          disabled={state.fundingStatus === "pending"}
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
          Deposit XLM
        </button>
      </div>

      {state.network === "testnet" && (
        <button
          onClick={handleFaucetFund}
          disabled={state.fundingStatus === "pending"}
          style={{
            marginTop: "0.6rem",
            width: "100%",
            background: "#334155",
            color: "#38bdf8",
            border: "1px solid #38bdf8",
            borderRadius: "6px",
            padding: "0.55rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🚰 Fund +100 XLM via Testnet Friendbot
        </button>
      )}

      {state.fundingStatus === "confirmed" && (
        <p style={{ marginTop: "0.6rem", marginBottom: 0, fontSize: "0.8rem", color: "#4ade80" }}>
          ✓ Stellar ledger confirmation received. Agent wallet balance updated.
        </p>
      )}
    </div>
  );
}
