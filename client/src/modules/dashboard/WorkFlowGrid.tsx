import { useState } from "react";
import WorkflowCard from "./WorkFlowCard";
import CreateWorkflowCard from "./CreateWorkFlowCard";
import type { Workflow } from "../workflow/api";

export default function WorkflowGrid({
  workflows,
  loading,
  onDelete,
}: {
  workflows: Workflow[];
  loading: boolean;
  onDelete: (workflowId: string) => void;
}) {
  const [search, setSearch] = useState("");

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6 p-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-xl bg-slate-900 border border-white/10 animate-pulse"
          >
            <div className="p-6 space-y-3">
              <div className="h-4 w-2/3 bg-slate-700 rounded"></div>
              <div className="h-3 w-1/2 bg-slate-700 rounded"></div>
            </div>
          </div>
        ))}
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
          <WorkflowCard key={w.id} workflow={w} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}
