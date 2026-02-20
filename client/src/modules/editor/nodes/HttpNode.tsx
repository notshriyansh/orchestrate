import { Globe } from "lucide-react";
import { Handle, Position } from "reactflow";

export default function HttpNode({ data }: any) {
  const borderColor =
    data.status === "success"
      ? "#22c55e"
      : data.status === "error"
        ? "#ef4444"
        : data.status === "running"
          ? "#38bdf8"
          : "#38bdf8";

  return (
    <div
      style={{
        padding: 14,
        borderRadius: 12,
        background: "#1f2937",
        border: `2px solid ${borderColor}`,
        minWidth: 160,
        color: "white",
        position: "relative",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Globe size={16} color="#38bdf8" />
        <strong>HTTP</strong>
      </div>

      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
        {data.label || "HTTP Request"}
      </div>
    </div>
  );
}
