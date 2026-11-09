"use client";

import React, { useCallback } from "react";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface MiniMapBlip {
  agentId: string;
  /** 0–100 percentage of map width */
  xPercent: number;
  /** 0–100 percentage of map height */
  yPercent: number;
  /** CSS colour string, e.g. "#38bdf8" */
  color: string;
  /** Renders a crown indicator when true */
  isPresident: boolean;
}

export interface ViewportRect {
  /** 0–100 percentage of map width, left edge of the visible camera window */
  xPercent: number;
  /** 0–100 percentage of map height, top edge of the visible camera window */
  yPercent: number;
  /** 0–100 percentage of map width, width of the visible camera window */
  widthPercent: number;
  /** 0–100 percentage of map height, height of the visible camera window */
  heightPercent: number;
}

export interface Landmark {
  id: string;
  label: string;
  icon: string;
  /** World-space X coordinate (pixels) used by the camera-snap callback */
  worldX: number;
  /** World-space Y coordinate (pixels) used by the camera-snap callback */
  worldY: number;
}

export interface MiniMapRadarProps {
  /** Live agent blips streamed from the backend */
  blips: MiniMapBlip[];
  /** Current camera / viewport rectangle expressed as percentages of the world map */
  viewport: ViewportRect;
  /**
   * Called when the user clicks a landmark quick-jump button.
   * The parent (Phaser host component) should scroll its camera to (worldX, worldY).
   */
  onLandmarkJump: (worldX: number, worldY: number) => void;
  /** Optional: override the default landmark definitions */
  landmarks?: Landmark[];
  /** Pixel size of the square radar canvas (default: 180) */
  size?: number;
}

// ---------------------------------------------------------------------------
// Default landmark definitions
// ---------------------------------------------------------------------------

const DEFAULT_LANDMARKS: Landmark[] = [
  { id: "capitol",     label: "Capitol",     icon: "🏛️",  worldX: 2400, worldY: 1200 },
  { id: "bank",        label: "Bank",        icon: "🏦",  worldX: 1800, worldY: 900  },
  { id: "realestate",  label: "Real Estate", icon: "🏢",  worldX: 3200, worldY: 1600 },
  { id: "bakery",      label: "Bakery",      icon: "🥐",  worldX: 1200, worldY: 2000 },
  { id: "arena",       label: "Arena",       icon: "🎲",  worldX: 3800, worldY: 2400 },
  { id: "commons",     label: "Commons",     icon: "🌳",  worldX: 2000, worldY: 2800 },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface BlipDotProps {
  blip: MiniMapBlip;
  radarSize: number;
}

function BlipDot({ blip, radarSize }: BlipDotProps): React.ReactElement {
  const DOT_RADIUS = blip.isPresident ? 5 : 3.5;
  const cx = (blip.xPercent / 100) * radarSize;
  const cy = (blip.yPercent / 100) * radarSize;

  return (
    <g key={blip.agentId}>
      {/* Glow ring for president */}
      {blip.isPresident && (
        <circle
          cx={cx}
          cy={cy}
          r={DOT_RADIUS + 3}
          fill="none"
          stroke={blip.color}
          strokeWidth={1.2}
          opacity={0.55}
        />
      )}
      {/* Main dot */}
      <circle cx={cx} cy={cy} r={DOT_RADIUS} fill={blip.color} />
      {/* Crown icon above president blip */}
      {blip.isPresident && (
        <text
          x={cx}
          y={cy - DOT_RADIUS - 3}
          textAnchor="middle"
          fontSize={7}
          fill="#facc15"
          style={{ userSelect: "none" }}
        >
          👑
        </text>
      )}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function MiniMapRadar({
  blips,
  viewport,
  onLandmarkJump,
  landmarks = DEFAULT_LANDMARKS,
  size = 180,
}: MiniMapRadarProps): React.ReactElement {
  const handleJump = useCallback(
    (landmark: Landmark) => () => {
      onLandmarkJump(landmark.worldX, landmark.worldY);
    },
    [onLandmarkJump]
  );

  // Viewport rect in SVG-pixel space
  const vpX = (viewport.xPercent / 100) * size;
  const vpY = (viewport.yPercent / 100) * size;
  const vpW = (viewport.widthPercent / 100) * size;
  const vpH = (viewport.heightPercent / 100) * size;

  return (
    <div style={styles.wrapper}>
      {/* ── Radar canvas ─────────────────────────────────────────── */}
      <div style={styles.radarLabel}>RADAR</div>

      <div style={{ ...styles.radarContainer, width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-label="Mini-map radar showing agent positions"
          role="img"
          style={styles.svg}
        >
          {/* Background grid lines */}
          <defs>
            <pattern
              id="minimap-grid"
              width={size / 6}
              height={size / 6}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${size / 6} 0 L 0 0 0 ${size / 6}`}
                fill="none"
                stroke="#1e293b"
                strokeWidth={0.5}
              />
            </pattern>
          </defs>
          <rect width={size} height={size} fill="url(#minimap-grid)" />

          {/* Subtle radial scan sweep (cosmetic) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size * 0.42}
            fill="none"
            stroke="#0ea5e920"
            strokeWidth={size * 0.42}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size * 0.28}
            fill="none"
            stroke="#0ea5e910"
            strokeWidth={size * 0.28}
          />

          {/* Viewport rectangle */}
          <rect
            x={vpX}
            y={vpY}
            width={Math.max(vpW, 4)}
            height={Math.max(vpH, 4)}
            fill="rgba(56,189,248,0.07)"
            stroke="#38bdf8"
            strokeWidth={1}
            strokeDasharray="3 2"
            rx={1}
          />

          {/* Agent blips */}
          {blips.map((blip) => (
            <BlipDot key={blip.agentId} blip={blip} radarSize={size} />
          ))}
        </svg>

        {/* Scan line animation (CSS, no JS needed) */}
        <div style={styles.scanLine} aria-hidden="true" />
      </div>

      {/* ── Landmark quick-jump panel ─────────────────────────────── */}
      <div style={styles.landmarkPanel} role="navigation" aria-label="Landmark quick-jump buttons">
        {landmarks.map((lm) => (
          <button
            key={lm.id}
            onClick={handleJump(lm)}
            style={styles.landmarkButton}
            title={`Jump to ${lm.label}`}
            aria-label={`Jump camera to ${lm.label}`}
          >
            <span style={styles.landmarkIcon}>{lm.icon}</span>
            <span style={styles.landmarkText}>{lm.label}</span>
          </button>
        ))}
      </div>

      {/* Inline keyframes injected once via a style tag */}
      <style>{KEYFRAMES_CSS}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Styles (inline — no external CSS dependency)
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "0.5rem",
    zIndex: 100,
    // Prevent layout interference
    pointerEvents: "auto",
  },

  radarLabel: {
    fontSize: "0.6rem",
    letterSpacing: "0.18em",
    color: "#38bdf8",
    textAlign: "right",
    opacity: 0.7,
    userSelect: "none",
  },

  radarContainer: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #1e293b",
    background: "#020617",
    boxShadow: "0 0 12px rgba(14,165,233,0.15), inset 0 0 16px rgba(0,0,0,0.6)",
    flexShrink: 0,
  },

  svg: {
    display: "block",
  },

  scanLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background:
      "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.6) 50%, transparent 100%)",
    animation: "minimap-scan 2.4s linear infinite",
    pointerEvents: "none",
  },

  landmarkPanel: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.35rem",
  },

  landmarkButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.35rem 0.5rem",
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#cbd5e1",
    fontSize: "0.72rem",
    fontFamily: "system-ui, -apple-system, sans-serif",
    lineHeight: 1,
    transition: "background 0.15s, border-color 0.15s",
    // Hover handled via CSS below
  } as React.CSSProperties,

  landmarkIcon: {
    fontSize: "0.9rem",
    lineHeight: 1,
  },

  landmarkText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

const KEYFRAMES_CSS = `
  @keyframes minimap-scan {
    0%   { top: 0%; opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  .minimap-landmark-btn:hover {
    background: #1e293b !important;
    border-color: #38bdf8 !important;
    color: #f8fafc !important;
  }
`;
