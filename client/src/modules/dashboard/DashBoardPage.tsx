import Navbar from "../../components/Navbar";
import DashboardHeader from "./DashBoardHeader";
import WorkflowGrid from "./WorkFlowGrid";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto pt-28 px-6 pb-20">
        <DashboardHeader title="Workflows" />
        <WorkflowGrid />
      </main>
    </div>
  );
}
