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
  const { screenToFlowPosition } = useReactFlow();
  const svgRef = useRef<SVGSVGElement>(null);

  const [shapes, setShapes] = useState<Shape[]>([]);
  const [current, setCurrent] = useState<Shape | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCurrent(null);
        setDrawMode(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!drawMode) return;

    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseDown = (e: MouseEvent) => {
      const pos = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
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

    const handleMouseMove = (e: MouseEvent) => {
      if (!current) return;

      const pos = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
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

    const handleMouseUp = () => {
      if (current) {
        setShapes((prev) => [...prev, current]);
        setCurrent(null);
      }
      setDrawMode(null);
    };

    svg.addEventListener("mousedown", handleMouseDown);
    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mouseup", handleMouseUp);

    return () => {
      svg.removeEventListener("mousedown", handleMouseDown);
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mouseup", handleMouseUp);
    };
  }, [drawMode, current]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 z-50"
      style={{ pointerEvents: drawMode ? "all" : "none" }}
    >
      {shapes.map(renderShape)}
      {current && renderShape(current)}
    </svg>
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
      />
    );
  }

  return null;
}
