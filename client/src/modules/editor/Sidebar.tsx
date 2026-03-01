import {
  Globe,
  Shuffle,
  Webhook,
  Database,
  Timer,
  GitBranch,
  Layers,
  Server,
  HardDrive,
  Cpu,
  Cloud,
  Shield,
  Search,
  ChevronLeft,
  Network,
  Box,
  Activity,
  Lock,
  Radio,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface PaletteItem {
  type: string;
  label: string;
  icon: any;
  color: string;
  category:
    | "API"
    | "Logic"
    | "Storage"
    | "Infrastructure"
    | "Security"
    | "Compute";
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
    type: "apigateway",
    label: "API Gateway",
    icon: Network,
    color: "#2563eb",
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
    type: "scheduler",
    label: "Scheduler",
    icon: Timer,
    color: "#eab308",
    category: "Logic",
  },

  {
    type: "database",
    label: "Database",
    icon: Database,
    color: "#14b8a6",
    category: "Storage",
  },
  {
    type: "cache",
    label: "Cache",
    icon: HardDrive,
    color: "#ef4444",
    category: "Storage",
  },
  {
    type: "kvstore",
    label: "KV Store",
    icon: Layers,
    color: "#22c55e",
    category: "Storage",
  },
  {
    type: "graphdb",
    label: "Graph DB",
    icon: Activity,
    color: "#06b6d4",
    category: "Storage",
  },
  {
    type: "vectordb",
    label: "Vector DB",
    icon: Layers,
    color: "#8b5cf6",
    category: "Storage",
  },
  {
    type: "objectstore",
    label: "Object Store",
    icon: Box,
    color: "#f97316",
    category: "Storage",
  },

  {
    type: "loadbalancer",
    label: "Load Balancer",
    icon: Cloud,
    color: "#0ea5e9",
    category: "Infrastructure",
  },
  {
    type: "reverseproxy",
    label: "Reverse Proxy",
    icon: Radio,
    color: "#0284c7",
    category: "Infrastructure",
  },
  {
    type: "cdn",
    label: "CDN",
    icon: Globe,
    color: "#06b6d4",
    category: "Infrastructure",
  },
  {
    type: "queue",
    label: "Queue",
    icon: GitBranch,
    color: "#9333ea",
    category: "Infrastructure",
  },
  {
    type: "eventbus",
    label: "Event Bus",
    icon: Activity,
    color: "#a855f7",
    category: "Infrastructure",
  },

  {
    type: "appserver",
    label: "App Server",
    icon: Server,
    color: "#22c55e",
    category: "Compute",
  },
  {
    type: "worker",
    label: "Worker",
    icon: Cpu,
    color: "#16a34a",
    category: "Compute",
  },
  {
    type: "container",
    label: "Container",
    icon: Box,
    color: "#10b981",
    category: "Compute",
  },

  {
    type: "auth",
    label: "Auth Service",
    icon: Shield,
    color: "#ef4444",
    category: "Security",
  },
  {
    type: "firewall",
    label: "Firewall",
    icon: Lock,
    color: "#dc2626",
    category: "Security",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  const onDragStart = useCallback((event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";

    const ghost = document.createElement("div");
    ghost.style.padding = "8px 14px";
    ghost.style.background = "#0f172a";
    ghost.style.border = "1px solid #334155";
    ghost.style.borderRadius = "8px";
    ghost.style.color = "white";
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
    const categories = [
      "API",
      "Logic",
      "Storage",
      "Infrastructure",
      "Compute",
      "Security",
    ];
    return categories.map((cat) => ({
      category: cat,
      items: filtered.filter((i) => i.category === cat),
    }));
  }, [filtered]);

  return (
    <div
      className={`h-full bg-slate-950 border-r border-white/5 transition-all duration-300 ${
        collapsed ? "w-20" : "w-65"
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

      <div className="px-4 py-4 scroll-area h-[calc(100%-120px)] space-y-6">
        {grouped.map(({ category, items }) =>
          items.length ? (
            <div key={category}>
              {!collapsed && (
                <div className="text-xs text-white/30 uppercase tracking-wider mb-3">
                  {category}
                </div>
              )}

              <div
                className={`${
                  collapsed
                    ? "flex flex-col items-center gap-4"
                    : "grid grid-cols-2 gap-3"
                }`}
              >
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.type}
                      draggable
                      onDragStart={(e) => onDragStart(e, item.type)}
                      className={`
                          group
                          flex
                          items-center
                          justify-center
                          transition
                          cursor-grab
                          active:cursor-grabbing
                          ${
                            collapsed
                              ? "h-14 w-14 mx-auto rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800"
                              : "flex-col h-20 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500/40 hover:bg-slate-800"
                          }
                        `}
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
