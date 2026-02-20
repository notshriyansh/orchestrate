import { useEffect } from "react";
import api from "../../lib/api";

export default function useWorkflowAutoSave(
  id: string | undefined,
  nodes: any[],
  edges: any[],
  workflowName: string,
) {
  useEffect(() => {
    if (!id) return;

    const timeout = setTimeout(() => {
      api.put(`/api/workflows/${id}`, {
        name: workflowName,
        nodes,
        edges,
      });
    }, 700);

    return () => clearTimeout(timeout);
  }, [id, nodes, edges, workflowName]);
}
