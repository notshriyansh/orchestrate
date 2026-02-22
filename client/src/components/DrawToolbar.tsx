import { Square, Circle, ArrowRight, MousePointer } from "lucide-react";

export default function DrawToolbar({ drawMode, setDrawMode }: any) {
  const tools = [
    { id: null, icon: MousePointer },
    { id: "rect", icon: Square },
    { id: "circle", icon: Circle },
    { id: "arrow", icon: ArrowRight },
  ];

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2 flex gap-2 shadow-2xl">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const active = drawMode === tool.id;

        return (
          <button
            key={String(tool.id)}
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
    </div>
  );
}
