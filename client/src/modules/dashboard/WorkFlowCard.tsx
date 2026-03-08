import { Link } from "react-router-dom";
import { Workflow, Trash2 } from "lucide-react";
import { useState } from "react";
import api from "../../lib/api";
import { auth } from "../../lib/firebase";

export default function WorkflowCard({ workflow }: any) {
  const [hovered, setHovered] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm("Delete this workflow permanently?");
    if (!confirmDelete) return;

    const token = await auth.currentUser?.getIdToken(false);
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
      className="
        relative
        p-6
        rounded-2xl
        bg-[#0f172a]
        border border-blue-500/20
        transition-all
        duration-300
        group
        overflow-hidden
        hover:-translate-y-1
        hover:border-blue-500/50
        hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]
        "
    >
      <button
        onClick={handleDelete}
        className={`
          absolute 
          top-4 
          right-4 
          text-white/40 
          hover:text-red-400 
          transition-all 
          duration-200
          ${hovered ? "opacity-100" : "opacity-0"}
        `}
      >
        <Trash2 size={16} />
      </button>

      <div className="flex items-center gap-2 mb-3">
        <Workflow className="h-4 w-4 text-blue-400" />
        <span className="font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">
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
      ? "bg-green-500/15 text-green-400 border border-green-500/30"
      : status === "failed"
        ? "bg-red-500/15 text-red-400 border border-red-500/30"
        : "bg-gray-500/15 text-gray-400 border border-gray-500/20";

  return (
    <span
      className={`
        px-3 
        py-1 
        text-xs 
        rounded-full 
        font-medium 
        tracking-wide 
        ${styles}
      `}
    >
      {status}
    </span>
  );
}
