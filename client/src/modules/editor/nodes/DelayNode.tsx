import { Timer } from "lucide-react";
import { Handle, Position } from "reactflow";

export default function DelayNode({ data }: any) {
  const borderColor =
    data.status === "success"
      ? "#22c55e"
      : data.status === "error"
        ? "#ef4444"
        : data.status === "running"
          ? "#38bdf8"
          : "#facc15";

  return (
    <div
      style={{
        padding: 14,
        borderRadius: 12,
        background: "#1f2937",
        border: `2px solid ${borderColor}`,
        minWidth: 140,
        color: "white",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Timer size={16} color="#facc15" />
        <strong>Delay</strong>
      </div>

      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
        {data.label || "Wait"}
      </div>
    </div>
  );
}
