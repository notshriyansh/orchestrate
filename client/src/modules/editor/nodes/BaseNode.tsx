import { Handle, Position } from "reactflow";
import type { ReactNode } from "react";

export default function BaseNode({
  icon,
  title,
  accentColor,
  data,
  children,
}: {
  icon: ReactNode;
  title: string;
  accentColor: string;
  data: any;
  children?: ReactNode;
}) {
  const statusClass =
    data.status === "running"
      ? "node-running"
      : data.status === "success"
        ? "node-success"
        : data.status === "error"
          ? "node-error"
          : "";

  return (
    <div
      className={`min-w-40 rounded-xl bg-slate-800 border border-white/10 p-4 text-white transition-all duration-300 ${statusClass}`}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: accentColor }}>{icon}</span>
        <strong>{title}</strong>
      </div>

      <div className="text-xs opacity-70">{children}</div>
    </div>
  );
}
