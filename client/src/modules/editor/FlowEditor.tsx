import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import api from "../../lib/api";

import EditorHeader from "./EditorHeader";
import Sidebar from "./Sidebar";
import FlowCanvas from "./FlowCanvas";
import RightPanel from "./RightPanel";
import ExecutionModal from "./ExecutionModal";
import SimulationBar from "./SimulationBar";

import useExecutionSocket from "../workflow/useExecutionSocket";
import useWorkflowAutoSave from "../workflow/useWorkflowAutoSave";

export default function FlowEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workflowId, setWorkflowId] = useState<string | undefined>(undefined);
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [workflowName, setWorkflowName] = useState("Untitled Workflow");
  const [history, setHistory] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedExecution, setSelectedExecution] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  useExecutionSocket(setNodes);

  useWorkflowAutoSave(workflowId, nodes, edges, workflowName);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const token = await user.getIdToken();

      try {
        if (id === "new") {
          const res = await api.post(
            "/api/workflows",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          setWorkflowId(res.data.id);
          navigate(`/editor/${res.data.id}`, { replace: true });
          return;
        }

        if (!id) return;

        const res = await api.get(`/api/workflows/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWorkflowId(res.data.id);
        setNodes(res.data.nodes || []);
        setEdges(res.data.edges || []);
        setWorkflowName(res.data.name || "Untitled Workflow");

        await loadHistory(res.data.id, token);
      } catch (err) {
        console.error("Workflow load failed", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [id]);

  const loadHistory = async (wid: string, token: string) => {
    const res = await api.get(`/api/execute/history/${wid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setHistory(res.data);
  };

  const runWorkflow = async () => {
    if (!workflowId) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          data: { ...n.data, status: "idle" },
        })),
      );

      setIsRunning(true);

      await api.post(
        `/api/execute/${workflowId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setIsRunning(true);

      await loadHistory(workflowId, token);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  if (loading) {
    return <div className="editor-loading">Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        background: "#0f172a",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <EditorHeader
          workflowId={id!}
          workflowName={workflowName}
          setWorkflowName={setWorkflowName}
          runWorkflow={runWorkflow}
          setNodes={setNodes}
          setEdges={setEdges}
        />

        <div style={{ flex: 1, height: "100%" }}>
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            setSelectedNode={setSelectedNode}
          />
        </div>
        <SimulationBar nodes={nodes} isRunning={isRunning} />
      </div>

      <RightPanel
        selectedNode={selectedNode}
        history={history}
        setSelectedExecution={setSelectedExecution}
      />

      {selectedExecution && (
        <ExecutionModal
          execution={selectedExecution}
          onClose={() => setSelectedExecution(null)}
        />
      )}
    </div>
  );
}
