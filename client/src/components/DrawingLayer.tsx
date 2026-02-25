import { useEffect, useRef, useState } from "react";
import { useReactFlow } from "reactflow";

interface Shape {
  id: string;
  type: "rect" | "circle" | "arrow";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function DrawingLayer({
  drawMode,
  setDrawMode,
}: {
  drawMode: null | "rect" | "circle" | "arrow";
  setDrawMode: any;
}) {
  const { project } = useReactFlow();
  const svgRef = useRef<SVGSVGElement>(null);

  const [shapes, setShapes] = useState<Shape[]>([]);
  const [current, setCurrent] = useState<Shape | null>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        isDrawing.current = false;
        setCurrent(null);
        setDrawMode(null);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!drawMode) return;

    const svg = svgRef.current;
    if (!svg) return;

    const onMouseDown = (e: MouseEvent) => {
      isDrawing.current = true;

      const bounds = svg.getBoundingClientRect();
      const pos = project({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });

      setCurrent({
        id: Date.now().toString(),
        type: drawMode,
        x1: pos.x,
        y1: pos.y,
        x2: pos.x,
        y2: pos.y,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current) return;

      const bounds = svg.getBoundingClientRect();
      const pos = project({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });

      setCurrent((prev) =>
        prev
          ? {
              ...prev,
              x2: pos.x,
              y2: pos.y,
            }
          : null,
      );
    };

    const onMouseUp = () => {
      if (isDrawing.current && current) {
        setShapes((prev) => [...prev, current]);
      }

      isDrawing.current = false;
      setCurrent(null);
      setDrawMode(null);
    };

    svg.addEventListener("mousedown", onMouseDown);
    svg.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      svg.removeEventListener("mousedown", onMouseDown);
      svg.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [drawMode, project]);

  const clearDrawings = () => {
    setShapes([]);
    setCurrent(null);
  };

  return (
    <>
      <svg
        ref={svgRef}
        className="absolute inset-0 z-30"
        style={{ pointerEvents: drawMode ? "all" : "none" }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 6 3, 0 6" fill="#3b82f6" />
          </marker>
        </defs>

        {shapes.map(renderShape)}
        {current && renderShape(current)}
      </svg>

      {shapes.length > 0 && (
        <button
          onClick={clearDrawings}
          className="absolute bottom-20 right-6 z-40 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm border border-white/10"
        >
          Clear Drawings
        </button>
      )}
    </>
  );
}

function renderShape(shape: Shape) {
  const base = {
    stroke: "#3b82f6",
    strokeWidth: 2,
    fill: "transparent",
  };

  if (shape.type === "rect") {
    const x = Math.min(shape.x1, shape.x2);
    const y = Math.min(shape.y1, shape.y2);
    const w = Math.abs(shape.x2 - shape.x1);
    const h = Math.abs(shape.y2 - shape.y1);

    return <rect key={shape.id} x={x} y={y} width={w} height={h} {...base} />;
  }

  if (shape.type === "circle") {
    const dx = shape.x2 - shape.x1;
    const dy = shape.y2 - shape.y1;
    const r = Math.sqrt(dx * dx + dy * dy);

    return (
      <circle key={shape.id} cx={shape.x1} cy={shape.y1} r={r} {...base} />
    );
  }

  if (shape.type === "arrow") {
    return (
      <line
        key={shape.id}
        x1={shape.x1}
        y1={shape.y1}
        x2={shape.x2}
        y2={shape.y2}
        {...base}
        markerEnd="url(#arrowhead)"
      />
    );
  }

  return null;
}
