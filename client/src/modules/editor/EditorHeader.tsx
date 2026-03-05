import { Upload, RotateCcw, Film, ArrowLeft, Layers } from "lucide-react";
import { useRef, useState } from "react";
import { auth } from "../../lib/firebase";
import api from "../../lib/api";
import {
  exportAsImage,
  exportAsGIF,
  exportAsMP4,
} from "../../utils/exportCanvas";
import { useNavigate } from "react-router-dom";

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
  openTemplates,
}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [importing, setImporting] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [exporting, setExporting] = useState<null | "png" | "gif" | "mp4">(
    null,
  );

  const navigate = useNavigate();

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
    <div className="relative z-50 h-16 px-8 flex items-center justify-between bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/10 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/70 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          <ArrowLeft size={16} />
          Dashboard
        </button>

        <input
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          className="text-xl font-semibold bg-transparent text-white outline-none border-b border-transparent focus:border-blue-500 transition w-60"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={openTemplates}
          className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          <Layers size={16} />
          Templates
        </button>

        <button
          onClick={handleImportClick}
          disabled={importing}
          className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 transition-all flex items-center gap-2"
        >
          <Upload size={16} />
          {importing ? "Importing..." : "Import"}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowExport((prev) => !prev)}
            className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <Film size={16} />
            Export
          </button>

          {showExport && (
            <div className="absolute right-0 mt-3 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
              {["png", "gif", "mp4"].map((type) => (
                <button
                  key={type}
                  disabled={!!exporting}
                  onClick={async () => {
                    setExporting(type as any);

                    if (type === "png") await exportAsImage();
                    if (type === "gif") await exportAsGIF();
                    if (type === "mp4") await exportAsMP4();

                    setExporting(null);
                    setShowExport(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-slate-800 transition"
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        <select
          value={replaySpeed}
          onChange={(e) => setReplaySpeed(Number(e.target.value))}
          className="appearance-none bg-slate-800/60 hover:bg-slate-700 px-4 py-2 rounded-xl text-white pr-8 transition-all"
        >
          <option value={300}>2x</option>
          <option value={600}>1x</option>
          <option value={1000}>0.5x</option>
        </select>

        <button
          onClick={replay}
          className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          <RotateCcw size={16} />
          Replay
        </button>

        <button
          onClick={runWorkflow}
          disabled={isRunning}
          className="px-5 py-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all font-medium shadow-lg"
        >
          {isRunning ? "Running..." : "Run"}
        </button>

        <button
          onClick={onReset}
          className="px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-500 transition-all shadow-md"
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
