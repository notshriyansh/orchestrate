import { Link } from "react-router-dom";
import { Workflow, Trash2 } from "lucide-react";
import { useState } from "react";
import api from "../../lib/api";
import { auth } from "../../lib/firebase";

export default function WorkflowCard({ workflow }: any) {
  const [hovered, setHovered] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    const confirm = window.confirm("Delete this workflow permanently?");
    if (!confirm) return;

    const token = await auth.currentUser?.getIdToken();
    if (!token) return;

    await api.delete(`/api/workflows/${workflow.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    window.location.reload();
  };

  const status =
    workflow.lastStatus === "success"
      ? "success"
      : workflow.lastStatus === "failed"
        ? "failed"
        : "idle";

  return (
    <Link
      to={`/editor/${workflow.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-6 rounded-xl bg-slate-900/70 border border-white/10 hover:border-blue-500/40 transition backdrop-blur-xl group"
    >
      {hovered && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 text-white/40 hover:text-red-400 transition"
        >
          <Trash2 size={16} />
        </button>
      )}

      <div className="flex items-center gap-2 mb-3">
        <Workflow className="h-4 w-4 text-blue-400" />
        <span className="font-semibold text-white group-hover:text-blue-400 transition">
          {workflow.name}
        </span>
      </div>

      <p className="text-sm text-white/40 mb-4">
        {workflow.nodes?.length || 0} nodes
      </p>

      <StatusPill status={status} />
    </Link>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles =
    status === "success"
      ? "bg-green-500/20 text-green-400"
      : status === "failed"
        ? "bg-red-500/20 text-red-400"
        : "bg-gray-500/20 text-gray-400";

  return (
    <span className={`px-3 py-1 text-xs rounded-full ${styles}`}>{status}</span>
  );
}
