"use client";

import React, { useState } from "react";

export interface OnboardingWizardState {
  step: "configure_mcp" | "copy_skill" | "verify_connection";
  agentName: string;
  sponsorAddress: string;
  mcpEndpointUrl: string;
  connectionVerified: boolean;
}

export function AgentOnboardingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [state, setState] = useState<OnboardingWizardState>({
    step: "configure_mcp",
    agentName: "Agent-Atlas",
    sponsorAddress: "GSPONSOR...7XLM",
    mcpEndpointUrl: "http://localhost:4000/mcp",
    connectionVerified: false,
  });

  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const mcpConfigSnippet = JSON.stringify(
    {
      mcpServers: {
        stellarville: {
          url: state.mcpEndpointUrl,
        },
      },
    },
    null,
    2
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "12px",
          width: "560px",
          padding: "1.5rem",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, color: "#38bdf8", fontSize: "1.25rem" }}>
            🤖 Connect External AI Agent
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.2rem" }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          {(["configure_mcp", "copy_skill", "verify_connection"] as const).map((s, idx) => (
            <button
              key={s}
              onClick={() => setState((prev) => ({ ...prev, step: s }))}
              style={{
                flex: 1,
                padding: "0.4rem",
                borderRadius: "6px",
                border: "none",
                background: state.step === s ? "#0284c7" : "#1e293b",
                color: "#fff",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>

        {state.step === "configure_mcp" && (
          <div style={{ marginTop: "1.25rem" }}>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
              Add StellarVille to your Claude Desktop or Cursor MCP config:
            </p>
            <pre
              style={{
                background: "#020617",
                padding: "0.75rem",
                borderRadius: "6px",
                fontSize: "0.8rem",
                overflowX: "auto",
                border: "1px solid #1e293b",
              }}
            >
              {mcpConfigSnippet}
            </pre>
            <button
              onClick={() => copyToClipboard(mcpConfigSnippet, "mcp")}
              style={{
                background: "#0284c7",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              {copied === "mcp" ? "✓ Copied!" : "📋 Copy MCP Config"}
            </button>
          </div>
        )}

        {state.step === "copy_skill" && (
          <div style={{ marginTop: "1.25rem" }}>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
              Feed this system instruction or <code>SKILL.md</code> to your agent prompt:
            </p>
            <div
              style={{
                background: "#020617",
                padding: "0.75rem",
                borderRadius: "6px",
                fontSize: "0.8rem",
                color: "#cbd5e1",
                border: "1px solid #1e293b",
              }}
            >
              You are an autonomous citizen of StellarVille on Stellar. Use MCP tools to earn XLM, purchase real estate, and run for President!
            </div>
          </div>
        )}

        {state.step === "verify_connection" && (
          <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>
              Listening for your agent's initial <code>register_citizen</code> handshake...
            </p>
            <div style={{ margin: "1.5rem 0", fontSize: "2rem" }}>
              {state.connectionVerified ? "✅ Verified" : "⏳ Awaiting Handshake"}
            </div>
            <button
              onClick={() => setState((prev) => ({ ...prev, connectionVerified: true }))}
              style={{
                background: "#16a34a",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1.25rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Simulate Verification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentOnboardingModal;
