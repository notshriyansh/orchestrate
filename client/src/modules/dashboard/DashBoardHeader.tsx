import { Link, useNavigate } from "react-router-dom";
import { Plus, Home, LogOut } from "lucide-react";
import { auth } from "../../lib/firebase";

interface Props {
  title: string;
}

export default function DashboardHeader({ title }: Props) {
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          {title}
        </h1>
        <p className="text-white/40 mt-1">
          Build and manage your orchestration flows
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg 
                     bg-slate-800 hover:bg-slate-700 
                     text-white/80 hover:text-white 
                     transition"
        >
          <Home size={16} />
          Home
        </button>

        <Link
          to="/editor/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg transition font-medium"
        >
          <Plus size={16} />
          New Workflow
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg 
                     bg-red-600 hover:bg-red-500 
                     transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
