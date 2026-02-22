import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import NodeInspector from "./NodeInspector";

export default function RightPanel({
  selectedNode,
  history,
  onReplay,
  setNodes,
}: any) {
  const [tab, setTab] = useState<"inspector" | "history">("inspector");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (selectedNode) setTab("inspector");
  }, [selectedNode]);

  return (
    <div
      className={`transition-all duration-300 border-l border-white/10 bg-slate-950 flex flex-col ${
        collapsed ? "w-12" : "w-105"
      }`}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white"
        >
          {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setTab("inspector")}
              className={`flex-1 py-3 text-sm ${
                tab === "inspector"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-slate-400"
              }`}
            >
              Inspector
            </button>
            <button
              onClick={() => setTab("history")}
              className={`flex-1 py-3 text-sm ${
                tab === "history"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-slate-400"
              }`}
            >
              History
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {tab === "inspector" && selectedNode && (
              <NodeInspector node={selectedNode} setNodes={setNodes} />
            )}

            {tab === "history" &&
              history.map((exec: any) => (
                <div
                  key={exec.id}
                  onClick={() => onReplay(exec)}
                  className="p-4 mb-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition"
                >
                  <div className="text-white font-medium">
                    {exec.status.toUpperCase()}
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(exec.startedAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
