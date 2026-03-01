import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Trash2, Copy, Lock } from "lucide-react";
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
    if (selectedNode) {
      setCollapsed(false);
      setTab("inspector");
    }
  }, [selectedNode]);

  const deleteNode = () => {
    if (!selectedNode) return;
    setNodes((prev: any[]) => prev.filter((n) => n.id !== selectedNode.id));
  };

  const duplicateNode = () => {
    if (!selectedNode) return;

    const clone = {
      ...selectedNode,
      id: Date.now().toString(),
      position: {
        x: selectedNode.position.x + 40,
        y: selectedNode.position.y + 40,
      },
    };

    setNodes((prev: any[]) => [...prev, clone]);
  };

  return (
    <div
      className={`relative transition-all duration-500 ease-in-out border-l border-white/10 bg-slate-950 flex flex-col ${
        collapsed
          ? "w-0 opacity-0 pointer-events-none"
          : "w-[320px] opacity-100"
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-6 top-1/2 -translate-y-1/2 
             bg-linear-to-b from-slate-800 to-slate-900
             border border-white/10 
             p-3 rounded-full shadow-lg
             hover:scale-110 transition-all duration-300
             hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
      >
        {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

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

          <div className="flex-1 overflow-y-auto p-6 scroll-area">
            {tab === "inspector" && selectedNode && (
              <>
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={duplicateNode}
                    className="bg-slate-800 hover:bg-slate-700 p-2 rounded"
                  >
                    <Copy size={16} />
                  </button>

                  <button
                    onClick={deleteNode}
                    className="bg-red-600 hover:bg-red-700 p-2 rounded"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded">
                    <Lock size={16} />
                  </button>
                </div>

                <NodeInspector node={selectedNode} setNodes={setNodes} />
              </>
            )}

            {tab === "history" &&
              history.map((exec: any) => (
                <div
                  key={exec.id}
                  onClick={() => onReplay(exec)}
                  className="p-4 mb-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition"
                >
                  <div className="text-white font-medium flex justify-between">
                    {exec.status.toUpperCase()}
                    <span className="text-xs text-slate-400">
                      {exec.logs?.length || 0} steps
                    </span>
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
