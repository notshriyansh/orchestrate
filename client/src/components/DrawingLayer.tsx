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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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

    let startX = 0;
    let startY = 0;

    const onMouseDown = (e: MouseEvent) => {
      const bounds = svg.getBoundingClientRect();

      const pos = project({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });

      startX = pos.x;
      startY = pos.y;

      setCurrent({
        id: Date.now().toString(),
        type: drawMode,
        x1: startX,
        y1: startY,
        x2: startX,
        y2: startY,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!current) return;

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
      if (current) {
        setShapes((prev) => [...prev, current]);
        setCurrent(null);
      }
      setDrawMode(null);
    };

    svg.addEventListener("mousedown", onMouseDown);
    svg.addEventListener("mousemove", onMouseMove);
    svg.addEventListener("mouseup", onMouseUp);

    return () => {
      svg.removeEventListener("mousedown", onMouseDown);
      svg.removeEventListener("mousemove", onMouseMove);
      svg.removeEventListener("mouseup", onMouseUp);
    };
  }, [drawMode, current]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 z-30"
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
        markerEnd="url(#arrowhead)"
      />
    );
  }

  return null;
}
