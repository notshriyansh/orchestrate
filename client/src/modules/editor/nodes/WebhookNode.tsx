import { Webhook } from "lucide-react";
import { Handle, Position } from "reactflow";

export default function WebhookNode({ data }: any) {
  const borderColor =
    data.status === "success"
      ? "#22c55e"
      : data.status === "error"
        ? "#ef4444"
        : data.status === "running"
          ? "#38bdf8"
          : "#22c55e";

  return (
    <div
      style={{
        padding: 14,
        borderRadius: 12,
        background: "#1f2937",
        border: `2px solid ${borderColor}`,
        minWidth: 160,
        color: "white",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Webhook size={16} color="#22c55e" />
        <strong>Webhook</strong>
      </div>

      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
        {data.label || "Incoming Trigger"}
      </div>
    </div>
  );
}
