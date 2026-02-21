import { useState } from "react";
import NodeInspector from "./NodeInspector";

export default function RightPanel({ selectedNode, history, onReplay }: any) {
  const [tab, setTab] = useState<"inspector" | "history">("history");

  return (
    <div className="w-80 border-l border-white/10 bg-slate-900/70 backdrop-blur-xl flex flex-col">
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setTab("history")}
          className={`flex-1 py-3 text-sm ${
            tab === "history"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-muted-foreground"
          }`}
        >
          History
        </button>
        <button
          onClick={() => setTab("inspector")}
          className={`flex-1 py-3 text-sm ${
            tab === "inspector"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-muted-foreground"
          }`}
        >
          Inspector
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {tab === "inspector" && selectedNode && (
          <NodeInspector node={selectedNode} />
        )}

        {tab === "history" &&
          history.map((exec: any) => (
            <div
              key={exec.id}
              onClick={() => onReplay(exec)}
              className="p-4 mb-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer border border-white/5"
            >
              <div className="font-medium">{exec.status.toUpperCase()}</div>
              <div className="text-xs opacity-60">
                {new Date(exec.startedAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
