import api from "../../lib/api";

export interface Workflow {
  id: string;
  name: string;
  nodes: any;
  edges: any;
  createdAt: string;
}

export const getWorkflows = async () => {
  const res = await api.get<Workflow[]>("/api/workflows");
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
