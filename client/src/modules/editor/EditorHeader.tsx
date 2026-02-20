import { Upload, Play } from "lucide-react";

export default function EditorHeader({
  workflowName,
  setWorkflowName,
  runWorkflow,
  isRunning,
}: any) {
  return (
    <div className="h-16 px-6 flex items-center justify-between backdrop-blur-xl bg-slate-900/70 border-b border-white/10">
      <input
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
        className="text-lg font-semibold bg-transparent text-white outline-none border-b border-transparent focus:border-blue-500 transition"
      />

      <button
        onClick={runWorkflow}
        disabled={isRunning}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition disabled:opacity-50"
      >
        <Play size={16} />
        {isRunning ? "Running..." : "Run"}
      </button>
    </div>
  );
}
