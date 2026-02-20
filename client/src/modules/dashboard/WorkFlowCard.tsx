import { Link } from "react-router-dom";
import { Workflow } from "lucide-react";

export default function WorkflowCard({ workflow }: any) {
  return (
    <Link
      to={`/editor/${workflow.id}`}
      className="p-5 rounded-xl border border-gray-800 bg-[#111827] hover:border-blue-500 transition"
    >
      <div className="flex items-center gap-2 mb-2">
        <Workflow className="h-4 w-4 text-blue-400" />
        <span className="font-semibold text-white">{workflow.name}</span>
      </div>

      <p className="text-sm text-gray-400">
        {workflow.nodes?.length || 0} nodes
      </p>
    </Link>
  );
}
