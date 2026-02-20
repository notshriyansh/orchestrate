import { Handle, Position } from "reactflow";
import { GitBranch } from "lucide-react";

export default function ConditionNode({ data }: any) {
  const borderColor =
    data.status === "success"
      ? "#22c55e"
      : data.status === "error"
        ? "#ef4444"
        : data.status === "running"
          ? "#38bdf8"
          : "#a78bfa";

  return (
    <div
      style={{
        padding: 14,
        borderRadius: 12,
        background: "#1f2937",
        border: `2px solid ${borderColor}`,
        minWidth: 140,
        color: "white",
        position: "relative",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <GitBranch size={16} color="#a78bfa" />
        <strong>Condition</strong>
      </div>

      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
        {data.label || "If / Else"}
      </div>
    </div>
  );
}
