import { useEffect, useState } from "react";
import DashboardHeader from "./DashBoardHeader";
import WorkflowGrid from "./WorkFlowGrid";
import MetricsBar from "./MetricsBar";
import { getWorkflows } from "../workflow/api";
import type { Workflow, WorkflowMetrics } from "../workflow/api";

const emptyMetrics = {
  total: 0,
  success: 0,
  failed: 0,
};

export default function DashboardPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [metrics, setMetrics] = useState<WorkflowMetrics>(emptyMetrics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getWorkflows();
        setWorkflows(data.workflows);
        setMetrics(data.metrics);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const removeWorkflow = (workflowId: string) => {
    setWorkflows((prev) =>
      prev.filter((workflow) => workflow.id !== workflowId),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 px-10 py-10 text-white">
      <DashboardHeader title="Workflows" />
      <MetricsBar metrics={metrics} />
      <WorkflowGrid
        workflows={workflows}
        loading={loading}
        onDelete={removeWorkflow}
      />
    </div>
  );
}
