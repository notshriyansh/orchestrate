import {
  Globe,
  Shuffle,
  Webhook,
  Database,
  Timer,
  GitBranch,
  ChevronLeft,
  Search,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface PaletteItem {
  type: string;
  label: string;
  icon: any;
  color: string;
  category: "API" | "Logic" | "Storage";
}

const ITEMS: PaletteItem[] = [
  {
    type: "http",
    label: "HTTP Request",
    icon: Globe,
    color: "#3b82f6",
    category: "API",
  },
  {
    type: "webhook",
    label: "Webhook",
    icon: Webhook,
    color: "#22c55e",
    category: "API",
  },

  {
    type: "transform",
    label: "Transform",
    icon: Shuffle,
    color: "#f97316",
    category: "Logic",
  },
  {
    type: "condition",
    label: "Condition",
    icon: GitBranch,
    color: "#a78bfa",
    category: "Logic",
  },
  {
    type: "delay",
    label: "Delay",
    icon: Timer,
    color: "#facc15",
    category: "Logic",
  },

  {
    type: "database",
    label: "Database",
    icon: Database,
    color: "#14b8a6",
    category: "Storage",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  const onDragStart = useCallback((event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";

    const ghost = document.createElement("div");
    ghost.style.padding = "8px 12px";
    ghost.style.background = "#0f172a";
    ghost.style.color = "white";
    ghost.style.border = "1px solid #334155";
    ghost.style.borderRadius = "6px";
    ghost.innerText = type.toUpperCase();
    document.body.appendChild(ghost);
    event.dataTransfer.setDragImage(ghost, 50, 20);

    setTimeout(() => document.body.removeChild(ghost), 0);
  }, []);

  const filtered = useMemo(() => {
    return ITEMS.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const grouped = useMemo(() => {
    return {
      API: filtered.filter((i) => i.category === "API"),
      Logic: filtered.filter((i) => i.category === "Logic"),
      Storage: filtered.filter((i) => i.category === "Storage"),
    };
  }, [filtered]);

  return (
    <div
      className={`h-full bg-slate-950 border-r border-white/5 transition-all duration-300 ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
        {!collapsed && (
          <span className="text-xs tracking-widest text-white/40">
            COMPONENTS
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/50 hover:text-white transition"
        >
          <ChevronLeft
            size={18}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-white/5">
            <Search size={14} className="text-white/40" />
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-white w-full"
            />
          </div>
        </div>
      )}

      <div className="px-3 py-4 space-y-6 overflow-y-auto h-[calc(100%-120px)]">
        {Object.entries(grouped).map(([category, items]) =>
          items.length ? (
            <div key={category}>
              {!collapsed && (
                <div className="text-xs text-white/30 px-2 mb-3 uppercase tracking-wider">
                  {category}
                </div>
              )}

              <div className="flex flex-col gap-2">
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.type}
                      draggable
                      onDragStart={(e) => onDragStart(e, item.type)}
                      className="group flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/5 hover:border-white/10 hover:scale-[1.03] transition-all duration-200 cursor-grab active:cursor-grabbing"
                    >
                      <Icon size={18} color={item.color} />

                      {!collapsed && (
                        <span className="text-sm text-white/80 group-hover:text-white">
                          {item.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
