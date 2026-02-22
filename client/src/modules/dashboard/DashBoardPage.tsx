import DashboardHeader from "./DashBoardHeader";
import WorkflowGrid from "./WorkFlowGrid";
import MetricsBar from "./MetricsBar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-10 py-10 text-white">
      <DashboardHeader title="Workflows" />
      <MetricsBar />
      <WorkflowGrid />
    </div>
  );
}
