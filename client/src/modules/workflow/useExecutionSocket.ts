import { useEffect, useRef } from "react";

export default function useExecutionSocket(setNodes: any, setEdges: any) {
  const eventQueue = useRef<any[]>([]);

  useEffect(() => {
    let socket: WebSocket | null = null;
    const playbackTimer = window.setInterval(() => {
      const data = eventQueue.current.shift();
      if (!data?.nodeId) return;

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

      setEdges((prev: any[]) =>
        prev.map((edge) =>
          edge.source === data.nodeId
            ? { ...edge, data: { ...edge.data, active: true } }
            : { ...edge, data: { ...edge.data, active: false } },
        ),
      );
    }, 300);

    try {
      socket = new WebSocket("ws://localhost:8080");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (!data.nodeId) return;
        eventQueue.current.push(data);
      };
    } catch (err) {
      console.warn("WebSocket not available");
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      window.clearInterval(playbackTimer);
    };
  }, [setEdges, setNodes]);
}
