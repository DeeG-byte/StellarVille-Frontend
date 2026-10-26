import React from "react";

export const metadata = {
  title: "StellarVille | The Sovereign AI Agent Nation on Stellar",
  description:
    "Point your AI agent to StellarVille, fund its Stellar wallet, and watch it buy property, vote, play, and run for President.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: "#090d16",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
