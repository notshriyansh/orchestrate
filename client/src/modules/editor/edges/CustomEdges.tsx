import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "reactflow";
import type { EdgeProps } from "reactflow";
import { Trash2 } from "lucide-react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style,
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const isActive = data?.active;

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: isActive ? "#3b82f6" : "#64748b",
          strokeWidth: isActive ? 3 : 2,
          strokeDasharray: isActive ? "6" : "0",
          animation: isActive ? "dash 1s linear infinite" : "none",
          ...style,
        }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%)`,
            pointerEvents: "all",
          }}
        >
          <button
            onClick={() => data?.onDelete?.(id)}
            className="bg-red-500 hover:bg-red-600 w-6 h-6 rounded-full flex items-center justify-center transition"
          >
            <Trash2 size={12} color="white" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
