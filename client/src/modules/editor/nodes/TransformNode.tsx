import { Shuffle } from "lucide-react";
import { Handle, Position } from "reactflow";

export default function TransformNode({ data }: any) {
  const borderColor =
    data.status === "success"
      ? "#22c55e"
      : data.status === "error"
        ? "#ef4444"
        : data.status === "running"
          ? "#38bdf8"
          : "#f97316";

  return (
    <div
      style={{
        padding: 14,
        borderRadius: 12,
        background: "#1f2937",
        border: `2px solid ${borderColor}`,
        minWidth: 150,
        color: "white",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Shuffle size={16} color="#f97316" />
        <strong>Transform</strong>
      </div>

      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
        {data.label || "Modify Data"}
      </div>
    </div>
  );
}
