interface Props {
  nodes: any[];
  isRunning: boolean;
}

export default function SimulationBar({ nodes, isRunning }: Props) {
  const runningNode = nodes.find((n) => n.data?.status === "running");

  return (
    <div
      style={{
        height: 60,
        borderTop: "1px solid #1f2937",
        background: "#0b1220",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        justifyContent: "space-between",
      }}
    >
      <div>
        {isRunning ? (
          runningNode ? (
            <span style={{ color: "#38bdf8" }}>
              Executing: {runningNode.data?.label}
            </span>
          ) : (
            <span style={{ opacity: 0.6 }}>Starting execution...</span>
          )
        ) : (
          <span style={{ opacity: 0.6 }}>Idle</span>
        )}
      </div>

      <div style={{ fontSize: 13, opacity: 0.6 }}>{nodes.length} nodes</div>
    </div>
  );
}
