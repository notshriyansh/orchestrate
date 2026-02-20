import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "reactflow";
import { Trash2 } from "lucide-react";

export default function CustomEdge(props: any) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    data,
  } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          strokeWidth: 3,
          strokeDasharray: data?.active ? "5 5" : undefined,
          animation: data?.active ? "dash 1s linear infinite" : undefined,
        }}
      />

      <EdgeLabelRenderer>
        <div
          className="absolute pointer-events-auto"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button
            onClick={() => data?.onDelete?.(id)}
            className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-400 transition flex items-center justify-center shadow-md"
          >
            <Trash2 size={14} color="white" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
