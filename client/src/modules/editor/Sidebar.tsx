import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import { INFRA_NODE_REGISTRY } from "./nodes/infraNodeRegistry";

interface PaletteItem {
  type: string;
  label: string;
  icon: any;
  color: string;
  category:
    | "network"
    | "compute"
    | "storage"
    | "processing"
    | "security"
    | "observability"
    | "ai";
}

const ITEMS: PaletteItem[] = INFRA_NODE_REGISTRY.map((node) => ({
  type: node.type,
  label: node.label,
  icon: node.icon,
  color: node.color,
  category: node.category,
}));

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  const onDragStart = useCallback((event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  }, []);

  const filtered = useMemo(() => {
    return ITEMS.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const grouped = useMemo(() => {
    const categories: PaletteItem["category"][] = [
      "network",
      "compute",
      "storage",
      "processing",
      "security",
      "observability",
      "ai",
    ];

    return categories.map((cat) => ({
      category: cat,
      items: filtered.filter((i) => i.category === cat),
    }));
  }, [filtered]);

  return (
    <div
      className={`h-full bg-slate-950 border-r border-white/5 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
        {!collapsed && (
          <span className="text-sm font-semibold tracking-wide text-white/80">
            Components
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
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-white/5">
            <Search size={14} className="text-white/40" />
            <input
              placeholder="Search components"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-white w-full"
            />
          </div>
        </div>
      )}

      <div className="px-4 py-4 overflow-y-auto h-[calc(100%-120px)] space-y-6 hover:scrollbar-thumb-slate-600 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
        {grouped.map(({ category, items }) =>
          items.length ? (
            <div key={category}>
              {!collapsed && (
                <div className="text-xs text-white/30 uppercase tracking-wider mb-3">
                  {category}
                </div>
              )}

              <div
                className={
                  collapsed
                    ? "flex flex-col items-center gap-4"
                    : "grid grid-cols-2 gap-3"
                }
              >
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.type}
                      draggable
                      onDragStart={(e) => onDragStart(e, item.type)}
                      className={`group flex items-center justify-center transition cursor-grab active:cursor-grabbing ${
                        collapsed
                          ? "h-14 w-14 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800"
                          : "flex-col h-20 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500/40 hover:bg-slate-800"
                      }`}
                    >
                      <Icon
                        size={collapsed ? 22 : 20}
                        className="transition group-hover:scale-110"
                        style={{ color: item.color }}
                      />

                      {!collapsed && (
                        <span className="text-xs mt-2 text-center text-white/70 group-hover:text-white">
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
