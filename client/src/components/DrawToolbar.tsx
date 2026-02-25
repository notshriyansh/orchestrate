import {
  Square,
  Circle,
  ArrowRight,
  MousePointer,
  Minus,
  Type,
  Eraser,
  Hand,
  Trash2,
  Grid,
} from "lucide-react";

export default function DrawToolbar({
  drawMode,
  setDrawMode,
  clearDrawings,
}: any) {
  const tools = [
    { id: null, icon: MousePointer, label: "Select" },
    { id: "rect", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "arrow", icon: ArrowRight, label: "Arrow" },
    { id: "line", icon: Minus, label: "Line" },
    { id: "text", icon: Type, label: "Text" },
    { id: "erase", icon: Eraser, label: "Eraser" },
    { id: "pan", icon: Hand, label: "Pan" },
  ];

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 flex gap-2 shadow-2xl">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const active = drawMode === tool.id;

        return (
          <button
            key={String(tool.id)}
            title={tool.label}
            onClick={() => setDrawMode(tool.id)}
            className={`p-2 rounded-lg transition ${
              active
                ? "bg-blue-600 text-white"
                : "text-white/60 hover:bg-white/10"
            }`}
          >
            <Icon size={18} />
          </button>
        );
      })}

      <div className="w-px bg-white/10 mx-2" />

      <button
        title="Clear Drawings"
        onClick={clearDrawings}
        className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
