import { useEffect } from "react";
import { X } from "lucide-react";

export default function ExecutionModal({ execution, onClose }: any) {
  if (!execution) return null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 720,
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#0f172a",
          borderRadius: 16,
          padding: 28,
          border: "1px solid #1e293b",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Execution Logs</h2>

          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {execution.logs?.map((log: any, index: number) => (
          <div
            key={index}
            style={{
              padding: 16,
              borderRadius: 12,
              marginBottom: 14,
              background:
                log.status === "error"
                  ? "rgba(239,68,68,0.08)"
                  : "rgba(34,197,94,0.08)",
              border:
                log.status === "error"
                  ? "1px solid rgba(239,68,68,0.4)"
                  : "1px solid rgba(34,197,94,0.4)",
            }}
          >
            <div style={{ fontWeight: 600 }}>Node: {log.nodeId}</div>

            <div
              style={{
                marginTop: 4,
                fontWeight: 500,
                color: log.status === "error" ? "#ef4444" : "#22c55e",
              }}
            >
              {log.status.toUpperCase()}
            </div>

            {log.duration && (
              <div style={{ fontSize: 13, opacity: 0.6 }}>
                Duration: {log.duration}ms
              </div>
            )}

            {log.error && (
              <div
                style={{
                  marginTop: 8,
                  padding: 10,
                  borderRadius: 8,
                  background: "#1e1b1b",
                  color: "#ef4444",
                  fontSize: 13,
                }}
              >
                {log.error}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
