import type { ReactNode } from "react";
import { Handle, Position } from "reactflow";

export default function BaseNode({
  icon,
  title,
  color,
  children,
}: {
  icon: ReactNode;
  title: string;
  color: string;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        width: 14,
        height: 14,
        background: "#38bdf8",
        border: "2px solid white",
        borderRadius: "50%",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
          color,
        }}
      >
        {icon}
        <strong>{title}</strong>
      </div>

      <div style={{ fontSize: 12, opacity: 0.7 }}>{children}</div>
    </div>
  );
}
