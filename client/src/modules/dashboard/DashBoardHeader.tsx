import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

interface Props {
  title: string;
}

export default function DashboardHeader({ title }: Props) {
  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-white/40 mt-1">
          Build and manage your orchestration flows
        </p>
      </div>

      <Link
        to="/editor/new"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg transition font-medium"
      >
        <Plus size={16} />
        New Workflow
      </Link>
    </div>
  );
}
