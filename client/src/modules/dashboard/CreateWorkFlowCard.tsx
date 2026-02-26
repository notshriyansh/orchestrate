import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateWorkflowCard() {
  const navigate = useNavigate();

  const handleCreate = () => {
    const name = prompt("Enter workflow name:");
    if (!name) return;
    navigate("/editor/new?name=" + encodeURIComponent(name));
  };

  return (
    <div
      onClick={handleCreate}
      className="flex flex-col items-center justify-center border border-dashed border-white/20 rounded-xl p-6 text-white/50 hover:border-blue-500 hover:text-blue-400 cursor-pointer transition"
    >
      <Plus size={28} />
      <p className="mt-4">Create New Workflow</p>
    </div>
  );
}
