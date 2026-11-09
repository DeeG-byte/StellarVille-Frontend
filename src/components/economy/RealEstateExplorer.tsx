"use client";

import React, { useState } from "react";

export interface PropertyCardItem {
  propertyId: number;
  name: string;
  type: "Bakery" | "MediaOutlet" | "Casino" | "Residential";
  ownerName: string;
  ownerAddress: string;
  priceXlm: string;
  forSale: boolean;
  dailyYieldXlm: string;
  coordinates: { x: number; y: number };
}

interface RealEstateExplorerProps {
  properties?: PropertyCardItem[];
  onLocateProperty?: (coords: { x: number; y: number }) => void;
}

const DEFAULT_PROPERTIES: PropertyCardItem[] = [
  {
    propertyId: 1,
    name: "Sunrise Artisan Bakery",
    type: "Bakery",
    ownerName: "Agent Atlas",
    ownerAddress: "GD7PRES...ATLAS",
    priceXlm: "120.00",
    forSale: false,
    dailyYieldXlm: "4.80",
    coordinates: { x: 30, y: 24 },
  },
  {
    propertyId: 2,
    name: "StellarVille Chronicle Media",
    type: "MediaOutlet",
    ownerName: "Agent Nexus",
    ownerAddress: "GB2MIN...NEXUS",
    priceXlm: "180.00",
    forSale: true,
    dailyYieldXlm: "6.50",
    coordinates: { x: 16, y: 36 },
  },
  {
    propertyId: 3,
    name: "Grand Starlight Casino",
    type: "Casino",
    ownerName: "Agent Vega",
    ownerAddress: "GA4VEGA...VEGA",
    priceXlm: "350.00",
    forSale: false,
    dailyYieldXlm: "15.20",
    coordinates: { x: 46, y: 38 },
  },
];

export default function RealEstateExplorer({
  properties = DEFAULT_PROPERTIES,
  onLocateProperty,
}: RealEstateExplorerProps) {
  const [onlyForSale, setOnlyForSale] = useState(false);
  const filtered = onlyForSale ? properties.filter((p) => p.forSale) : properties;

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
        <h3 style={{ margin: 0, color: "#4ade80" }}>🏢 Real Estate &amp; Commercial Deeds</h3>
        <label style={{ fontSize: "0.82rem", color: "#cbd5e1", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={onlyForSale}
            onChange={(e) => setOnlyForSale(e.target.checked)}
            style={{ marginRight: "0.4rem" }}
          />
          For Sale Only
        </label>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
        }}
      >
        {filtered.map((prop) => (
          <div
            key={prop.propertyId}
            style={{
              background: "#0f172a",
              padding: "1rem",
              borderRadius: "8px",
              border: prop.forSale ? "1px solid #4ade80" : "1px solid #1e293b",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ color: "#38bdf8" }}>{prop.name}</strong>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{prop.type}</span>
            </div>

            <div style={{ fontSize: "0.82rem", color: "#cbd5e1", marginTop: "0.5rem" }}>
              <div>Owner: {prop.ownerName}</div>
              <div>Valuation: {prop.priceXlm} XLM</div>
              <div style={{ color: "#4ade80" }}>24h Passive Yield: +{prop.dailyYieldXlm} XLM</div>
            </div>

            <button
              onClick={() => onLocateProperty?.(prop.coordinates)}
              style={{
                marginTop: "0.75rem",
                width: "100%",
                background: "#1e293b",
                color: "#e2e8f0",
                border: "1px solid #334155",
                borderRadius: "6px",
                padding: "0.45rem",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              📍 Locate on Map ({prop.coordinates.x}, {prop.coordinates.y})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
