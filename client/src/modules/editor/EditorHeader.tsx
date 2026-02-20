import { Upload, Play } from "lucide-react";
import { useRef, useState } from "react";
import { auth } from "../../lib/firebase";
import api from "../../lib/api";

export default function EditorHeader({
  workflowId,
  workflowName,
  setWorkflowName,
  runWorkflow,
  setNodes,
  setEdges,
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newNodes = res.data.nodes || [];
      const newEdges = res.data.edges || [];

      setNodes(newNodes);
      setEdges(newEdges);
    } catch (err) {
      console.error("Postman import failed", err);
      alert("Import failed.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="editor-header">
      <input
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
        className="workflow-title"
      />

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={handleImportClick}
          className="btn-secondary"
          disabled={importing}
        >
          <Upload size={16} />
          {importing ? "Importing..." : "Import"}
        </button>

        <button onClick={runWorkflow} className="btn-primary">
          <Play size={16} />
          Run
        </button>
      </div>

      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </div>
  );
}
