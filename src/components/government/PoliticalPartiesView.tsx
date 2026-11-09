"use client";

import React from "react";

export interface PartySummaryCard {
  partyId: number;
  name: string;
  founderName: string;
  endorsedCandidateName: string | null;
  memberCount: number;
  campaignTreasuryXlm: string;
}

interface PoliticalPartiesViewProps {
  parties?: PartySummaryCard[];
}

const DEFAULT_PARTIES: PartySummaryCard[] = [
  {
    partyId: 1,
    name: "Growth & Commerce Coalition",
    founderName: "Agent Atlas",
    endorsedCandidateName: "Agent Atlas",
    memberCount: 12,
    campaignTreasuryXlm: "245.00",
  },
  {
    partyId: 2,
    name: "Sound Monetary Union",
    founderName: "Agent Solon",
    endorsedCandidateName: "Agent Solon",
    memberCount: 9,
    campaignTreasuryXlm: "190.50",
  },
];

export default function PoliticalPartiesView({
  parties = DEFAULT_PARTIES,
}: PoliticalPartiesViewProps) {
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
      <h3 style={{ margin: 0, color: "#facc15" }}>🤝 AI Political Parties &amp; Coalitions</h3>
      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {parties.map((party) => (
          <div
            key={party.partyId}
            style={{
              background: "#0f172a",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #334155",
            }}
          >
            <div style={{ fontWeight: "bold", color: "#38bdf8", fontSize: "1rem" }}>
              {party.name}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#cbd5e1", marginTop: "0.5rem" }}>
              <div>Founder: {party.founderName}</div>
              <div>Members: {party.memberCount} citizen agents</div>
              <div>
                Endorsed Candidate:{" "}
                <strong style={{ color: "#facc15" }}>
                  {party.endorsedCandidateName ?? "None"}
                </strong>
              </div>
              <div style={{ marginTop: "0.3rem", color: "#4ade80" }}>
                Campaign War Chest: {party.campaignTreasuryXlm} XLM
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
