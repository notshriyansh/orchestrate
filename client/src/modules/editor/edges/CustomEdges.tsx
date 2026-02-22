import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "reactflow";
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
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 12,
  });

  const isActive = data?.active;

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: isActive ? "#3b82f6" : "#475569",
          strokeWidth: isActive ? 3 : 2,
          strokeDasharray: isActive ? "6 6" : "0",
          animation: isActive ? "dash 1s linear infinite" : "none",
          transition: "all 0.2s ease",
          ...style,
        }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="group"
        >
          <button
            onClick={() => data?.onDelete?.(id)}
            className="
              opacity-0 group-hover:opacity-100
              transition
              bg-red-500 hover:bg-red-600
              w-7 h-7 rounded-full
              flex items-center justify-center
              shadow-lg
              scale-90 hover:scale-100
            "
          >
            <Trash2 size={12} color="white" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
