import Navbar from "../../components/Navbar";
import DashboardHeader from "./DashBoardHeader";
import WorkflowGrid from "./WorkFlowGrid";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-24 pb-16">
        <DashboardHeader title="Workflows" />
        <WorkflowGrid />
      </main>
    </div>
  );
}
