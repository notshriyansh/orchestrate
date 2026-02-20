import { useEffect } from "react";

export default function useExecutionSocket(setNodes: any) {
  useEffect(() => {
    let socket: WebSocket | null = null;

    try {
      socket = new WebSocket("ws://localhost:8080");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (!data.nodeId) return;

        setNodes((prev: any[]) =>
          prev.map((node) =>
            node.id === data.nodeId
              ? {
                  ...node,
                  data: { ...node.data, status: data.status },
                }
              : node,
          ),
        );
      };
    } catch (err) {
      console.warn("WebSocket not available");
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [setNodes]);
}
