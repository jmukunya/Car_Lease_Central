import React from "react";

interface MetricProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function MetricCard({
  title,
  value,
  color = "#0366d6",
}: MetricProps) {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        borderLeft: `5px solid ${color}`,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          color: "#6a737d",
          marginBottom: "8px",
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#24292e" }}>
        {value}
      </div>
    </div>
  );
}
