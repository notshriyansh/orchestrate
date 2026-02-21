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

  const [workflowId, setWorkflowId] = useState<string>();
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [workflowName, setWorkflowName] = useState("Untitled Workflow");
  const [history, setHistory] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedExecution, setSelectedExecution] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [replaySpeed, setReplaySpeed] = useState(600);

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
            { headers: { Authorization: `Bearer ${token}` } },
          );
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

    await loadHistory(workflowId, token);
    setIsRunning(false);
  };

  const replayExecution = async (execution: any) => {
    if (!execution?.logs?.length) return;

    setIsRunning(true);
    setProgress(0);

    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        data: { ...n.data, status: "idle" },
      })),
    );

    setEdges((prev) =>
      prev.map((e) => ({
        ...e,
        data: { ...e.data, active: false },
      })),
    );

    const total = execution.logs.length;

    for (let i = 0; i < total; i++) {
      const log = execution.logs[i];

      await new Promise((res) => setTimeout(res, replaySpeed));

      setNodes((prev) =>
        prev.map((n) =>
          n.id === log.nodeId
            ? { ...n, data: { ...n.data, status: log.status } }
            : n,
        ),
      );

      setEdges((prev) =>
        prev.map((e) =>
          e.source === log.nodeId
            ? { ...e, data: { ...e.data, active: true } }
            : { ...e, data: { ...e.data, active: false } },
        ),
      );

      setProgress(((i + 1) / total) * 100);
    }

    setIsRunning(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <EditorHeader
          workflowName={workflowName}
          setWorkflowName={setWorkflowName}
          runWorkflow={runWorkflow}
          isRunning={isRunning}
          replay={() => replayExecution(history[0])}
          replaySpeed={replaySpeed}
          setReplaySpeed={setReplaySpeed}
        />

        <div className="flex-1">
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            setSelectedNode={setSelectedNode}
          />
        </div>

        <SimulationBar progress={progress} isRunning={isRunning} />
      </div>

      <RightPanel
        selectedNode={selectedNode}
        history={history}
        setSelectedExecution={(exec: any) => {
          setSelectedExecution(exec);
          replayExecution(exec);
        }}
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
