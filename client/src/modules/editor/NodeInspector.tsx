export default function NodeInspector({ node, setNodes }: any) {
  const updateNode = (field: string, value: any) => {
    setNodes((prev: any[]) =>
      prev.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, [field]: value } } : n,
      ),
    );
  };

  const inputStyle = {
    width: "100%",
    padding: 8,
    marginTop: 4,
    background: "#1f2937",
    border: "1px solid #374151",
    borderRadius: 6,
    color: "white",
  };

  return (
    <div>
      <h3 style={{ marginBottom: 20 }}>Node Config</h3>

      <div style={{ marginBottom: 15 }}>
        <label>Label</label>
        <input
          value={node.data.label || ""}
          onChange={(e) => updateNode("label", e.target.value)}
          style={inputStyle}
        />
      </div>

      {node.type === "http" && (
        <>
          <div style={{ marginBottom: 15 }}>
            <label>Method</label>
            <select
              value={node.data.method || "GET"}
              onChange={(e) => updateNode("method", e.target.value)}
              style={inputStyle}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>

          <div style={{ marginBottom: 15 }}>
            <label>URL</label>
            <input
              value={node.data.url || ""}
              onChange={(e) => updateNode("url", e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <label>Timeout (ms)</label>
            <input
              type="number"
              value={node.data.timeout ?? 10000}
              onChange={(e) => updateNode("timeout", Number(e.target.value))}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <label>Retries</label>
            <input
              type="number"
              value={node.data.retries ?? 0}
              onChange={(e) => updateNode("retries", Number(e.target.value))}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <label>
              <input
                type="checkbox"
                checked={node.data.continueOnFailure ?? true}
                onChange={(e) =>
                  updateNode("continueOnFailure", e.target.checked)
                }
              />
              Continue on failure
            </label>
          </div>
        </>
      )}
    </div>
  );
}
