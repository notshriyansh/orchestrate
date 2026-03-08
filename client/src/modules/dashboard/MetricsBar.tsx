import { useEffect, useState } from "react";
import api from "../../lib/api";
import { auth } from "../../lib/firebase";

export default function MetricsBar() {
  const [metrics, setMetrics] = useState({
    total: 0,
    success: 0,
    failed: 0,
  });

  useEffect(() => {
    const load = async () => {
      const token = await auth.currentUser?.getIdToken(false);
      if (!token) return;

      const res = await api.get("/api/workflows", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const workflows = res.data;

      const success = workflows.filter(
        (w: any) => w.lastStatus === "success",
      ).length;

      const failed = workflows.filter(
        (w: any) => w.lastStatus === "failed",
      ).length;

      setMetrics({
        total: workflows.length,
        success,
        failed,
      });
    };

    load();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 mb-10">
      <MetricCard label="Total Workflows" value={metrics.total} />
      <MetricCard label="Successful Runs" value={metrics.success} green />
      <MetricCard label="Failed Runs" value={metrics.failed} red />
    </div>
  );
}

function MetricCard({
  label,
  value,
  green,
  red,
}: {
  label: string;
  value: number;
  green?: boolean;
  red?: boolean;
}) {
  const color = green
    ? "text-green-400"
    : red
      ? "text-red-400"
      : "text-blue-400";

  return (
    <div className="bg-slate-900/70 border border-white/10 rounded-xl p-6 backdrop-blur-xl hover:border-white/20 transition">
      <p className="text-sm text-white/40 mb-2">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
