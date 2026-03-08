import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import api from "../../lib/api";
import WorkflowCard from "./WorkFlowCard";
import CreateWorkflowCard from "./CreateWorkFlowCard";

export default function WorkflowGrid() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchWorkflows = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const token = await user.getIdToken(false);

        const res = await api.get("/api/workflows", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWorkflows(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  if (loading) {
    return (
      <div className="text-white/40 text-center py-20">
        Loading workflows...
      </div>
    );
  }

  if (!workflows.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-xl">
        <div className="text-2xl font-semibold mb-4">No workflows yet</div>
        <p className="text-white/40 mb-6">
          Create your first orchestration flow.
        </p>
      </div>
    );
  }

  const filtered = workflows.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="mb-8">
        <input
          placeholder="Search workflows..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-white/40"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateWorkflowCard />
        {filtered.map((w) => (
          <WorkflowCard key={w.id} workflow={w} />
        ))}
      </div>
    </>
  );
}
