import { Upload, Play, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import { auth } from "../../lib/firebase";
import api from "../../lib/api";

export default function EditorHeader({
  workflowId,
  workflowName,
  setWorkflowName,
  runWorkflow,
  isRunning,
  replay,
  replaySpeed,
  setReplaySpeed,
  setNodes,
  setEdges,
  onReset,
}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file || !workflowId) return;

    setImporting(true);

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const res = await api.post(`/api/import/postman/${workflowId}`, parsed, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNodes(res.data.nodes || []);
      setEdges(res.data.edges || []);
    } catch (err) {
      console.error("Postman import failed", err);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="h-16 px-6 flex items-center justify-between backdrop-blur-xl bg-slate-900/70 border-b border-white/10">
      <input
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
        className="text-lg font-semibold bg-transparent text-white outline-none border-b border-transparent focus:border-blue-500 transition"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={handleImportClick}
          disabled={importing}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-sm"
        >
          <Upload size={14} />
          {importing ? "Importing..." : "Import"}
        </button>

        <div className="w-px h-6 bg-white/10" />

        <select
          value={replaySpeed}
          onChange={(e) => setReplaySpeed(Number(e.target.value))}
          className="bg-slate-800 text-white text-sm px-2 py-1 rounded border border-white/10"
        >
          <option value={300}>2x</option>
          <option value={600}>1x</option>
          <option value={1000}>0.5x</option>
        </select>

        <button
          onClick={replay}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-sm"
        >
          <RotateCcw size={14} />
          Replay
        </button>

        <button
          onClick={runWorkflow}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition disabled:opacity-50 font-medium"
        >
          <Play size={16} />
          {isRunning ? "Running..." : "Run"}
        </button>
        <button
          onClick={onReset}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>

      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
}
