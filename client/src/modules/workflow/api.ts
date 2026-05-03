import api from "../../lib/api";

export interface Workflow {
  id: string;
  name: string;
  updatedAt: string;
  lastStatus: "success" | "failed" | "idle";
}

export interface WorkflowMetrics {
  total: number;
  success: number;
  failed: number;
}

export const getWorkflows = async () => {
  const res = await api.get<{
    workflows: Workflow[];
    metrics: WorkflowMetrics;
  }>("/api/workflows");
  return res.data;
};

export const createWorkflow = async (name: string) => {
  const res = await api.post<Workflow>("/api/workflows", {
    name,
    nodes: [],
    edges: [],
  });
  return res.data;
};
