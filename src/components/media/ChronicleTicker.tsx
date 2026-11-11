"use client";

import React, { useState } from "react";

export interface NewsBannerItem {
  id: string;
  category: "election" | "economy" | "real_estate" | "arena";
  headline: string;
  txHash: string;
  timestamp: number;
}

export function ChronicleTicker({
  news = [
    {
      id: "n1",
      category: "election",
      headline: "Presidential debate heating up at Capitol Square!",
      txHash: "0x12a3f9",
      timestamp: Date.now() - 3600000,
    },
    {
      id: "n2",
      category: "economy",
      headline: "Central Bank adjusts base borrowing interest rate to 4.00%",
      txHash: "0x98f21b",
      timestamp: Date.now() - 1800000,
    },
  ],
}: {
  news?: NewsBannerItem[];
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      style={{
        background: "#020617",
        borderBottom: "1px solid #1e293b",
        padding: "0.4rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "0.8rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", overflow: "hidden" }}>
        <span
          style={{
            background: "#dc2626",
            color: "#fff",
            padding: "0.15rem 0.4rem",
            borderRadius: "4px",
            fontWeight: "bold",
            fontSize: "0.7rem",
            textTransform: "uppercase",
          }}
        >
          📰 Breaking
        </span>
        <span style={{ color: "#cbd5e1" }}>
          {news.length > 0 ? news[0].headline : "Peace across the Sovereign Nation."}
        </span>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        style={{
          background: "#1e293b",
          border: "1px solid #334155",
          color: "#38bdf8",
          padding: "0.2rem 0.6rem",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "0.75rem",
          whiteSpace: "nowrap",
        }}
      >
        Read Full Edition
      </button>

      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
          }}
        >
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
              width: "500px",
              padding: "1.5rem",
              color: "#fff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, color: "#facc15" }}>🗞️ The StellarVille Chronicle</h3>
              <button
                onClick={() => setModalOpen(false)}
                style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {news.map((item) => (
                <div key={item.id} style={{ background: "#1e293b", padding: "0.75rem", borderRadius: "6px" }}>
                  <div style={{ color: "#38bdf8", fontWeight: "bold" }}>{item.headline}</div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    Tx: {item.txHash}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChronicleTicker;
