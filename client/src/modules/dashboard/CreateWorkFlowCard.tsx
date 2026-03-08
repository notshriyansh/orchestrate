import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateWorkflowCard() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/editor/new");
  };

  return (
    <div
      onClick={handleCreate}
      className="group flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 p-8 bg-slate-900/40 hover:bg-slate-900/70 hover:border-blue-500/50 cursor-pointer transition-all duration-300"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 group-hover:bg-blue-600/20 transition">
        <Plus size={24} className="text-white/60 group-hover:text-blue-400" />
      </div>

      <p className="mt-4 text-sm text-white/60 group-hover:text-blue-400 transition">
        Create Workflow
      </p>
    </div>
  );
}
