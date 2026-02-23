import { Handle, Position } from "reactflow";
import { INFRA_NODE_REGISTRY } from "./infraNodeRegistry";

export default function InfraNode({ data, type }: any) {
  const def = INFRA_NODE_REGISTRY.find((n) => n.type === type);
  if (!def) return null;

  const Icon = def.icon;

  const health = data?.health ?? "healthy";

  const healthColor =
    health === "healthy"
      ? "#22c55e"
      : health === "warning"
        ? "#facc15"
        : "#ef4444";

  return (
    <div className="relative group">
      <div
        className="absolute -inset-1 rounded-2xl opacity-70 blur-md"
        style={{
          background: `radial-gradient(circle, ${healthColor}33, transparent 70%)`,
        }}
      />

      <div
        className="relative px-4 py-3 rounded-2xl backdrop-blur-xl border shadow-xl min-w-47.5"
        style={{
          background: "linear-gradient(145deg, #0f172a, #0b1220)",
          borderColor: def.color,
        }}
      >
        <Handle type="target" position={Position.Left} />

        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: `${def.color}20`,
              border: `1px solid ${def.color}`,
            }}
          >
            <Icon size={16} color={def.color} />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">
              {data?.label || def.label}
            </span>
            <span className="text-xs text-slate-400 capitalize">
              {def.category}
            </span>
          </div>
        </div>

        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
}
