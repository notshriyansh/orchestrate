import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import api from "../../lib/api";
import WorkflowCard from "./WorkFlowCard";

export default function WorkflowGrid() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkflows = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();

      const res = await api.get("/api/workflows", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWorkflows(res.data);
      setLoading(false);
    };

    fetchWorkflows();
  }, []);

  if (loading) {
    return <div>Loading workflows...</div>;
  }

  if (!workflows.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-2xl font-semibold mb-4">No workflows yet</div>
        <p className="text-muted-foreground mb-6">
          Create your first API orchestration flow.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workflows.map((w) => (
        <WorkflowCard key={w.id} workflow={w} />
      ))}
    </div>
  );
}
