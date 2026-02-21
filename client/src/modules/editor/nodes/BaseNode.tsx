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

      <div className="flex items-center gap-3 mb-2 relative">
        <div className="relative w-6 h-6 flex items-center justify-center">
          <svg className="absolute inset-0 w-6 h-6">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#1e293b"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={
                data.status === "success"
                  ? "#22c55e"
                  : data.status === "error"
                    ? "#ef4444"
                    : data.status === "running"
                      ? "#3b82f6"
                      : "#334155"
              }
              strokeWidth="2"
              fill="none"
              strokeDasharray="63"
              strokeDashoffset={data.status === "running" ? "20" : "0"}
              className="transition-all duration-300"
            />
          </svg>

          <span style={{ color: accentColor }} className="z-10">
            {icon}
          </span>
        </div>

        <strong>{title}</strong>
      </div>

      <div className="text-xs opacity-70">{children}</div>
    </div>
  );
}
