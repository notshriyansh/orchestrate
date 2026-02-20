import NodeInspector from "./NodeInspector";

export default function RightPanel({
  selectedNode,
  history,
  setSelectedExecution,
}: any) {
  return (
    <div
      style={{
        width: 320,
        padding: 20,
        borderLeft: "1px solid #1f2937",
        background: "#111827",
        overflowY: "auto",
      }}
    >
      {selectedNode ? (
        <NodeInspector node={selectedNode} />
      ) : (
        <>
          <h3 style={{ marginBottom: 16 }}>Execution Timeline</h3>

          {history.map((exec: any) => (
            <div
              key={exec.id}
              onClick={() => setSelectedExecution(exec)}
              style={{
                padding: 12,
                borderRadius: 8,
                background: "#1f2937",
                marginBottom: 12,
                cursor: "pointer",
                border:
                  exec.status === "success"
                    ? "1px solid #22c55e"
                    : "1px solid #ef4444",
              }}
            >
              <div style={{ fontWeight: 600 }}>{exec.status.toUpperCase()}</div>

              <div style={{ fontSize: 12, opacity: 0.6 }}>
                {new Date(exec.startedAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
