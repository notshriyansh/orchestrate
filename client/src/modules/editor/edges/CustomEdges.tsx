import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "reactflow";
import { Trash2 } from "lucide-react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  style,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: "#3b82f6",
          strokeWidth: 2,
          strokeDasharray: "8 8",
          animation: "flow 3s linear infinite",
          ...style,
        }}
      />

      <circle r="4" fill="#60a5fa">
        <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
      </circle>

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <button
            onClick={() => data?.onDelete?.(id)}
            className="bg-red-500 hover:bg-red-600 w-6 h-6 rounded-full flex items-center justify-center transition shadow-lg"
          >
            <Trash2 size={12} color="white" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
