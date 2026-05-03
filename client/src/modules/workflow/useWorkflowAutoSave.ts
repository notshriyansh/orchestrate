import { useEffect, useRef } from "react";
import api from "../../lib/api";

export default function useWorkflowAutoSave(
  id: string | undefined,
  nodes: any[],
  edges: any[],
  workflowName: string,
) {
  const lastSaved = useRef("");

  useEffect(() => {
    if (!id) return;

    const nextSnapshot = JSON.stringify({ workflowName, nodes, edges });
    if (nextSnapshot === lastSaved.current) return;

    const timeout = setTimeout(() => {
      api.put(`/api/workflows/${id}`, {
        name: workflowName,
        nodes,
        edges,
      });
      lastSaved.current = nextSnapshot;
    }, 1500);

    return () => clearTimeout(timeout);
  }, [id, nodes, edges, workflowName]);
}
