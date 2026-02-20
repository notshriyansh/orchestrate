export default function Sidebar() {
  const itemStyle = {
    padding: "12px 14px",
    borderRadius: 8,
    background: "#1f2937",
    border: "1px solid #374151",
    cursor: "grab",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 12,
  };

  const onDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{
        width: 220,
        padding: 20,
        borderRight: "1px solid #1f2937",
        background: "#111827",
      }}
    >
      <h3 style={{ marginBottom: 20 }}>Nodes</h3>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "http")}
        style={itemStyle}
      >
        HTTP
      </div>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "delay")}
        style={itemStyle}
      >
        Delay
      </div>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "condition")}
        style={itemStyle}
      >
        Condition
      </div>
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "webhook")}
        style={itemStyle}
      >
        Webhook
      </div>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "transform")}
        style={itemStyle}
      >
        Transform
      </div>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "database")}
        style={itemStyle}
      >
        Database
      </div>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "parallel")}
        style={itemStyle}
      >
        Parallel
      </div>
    </div>
  );
}
