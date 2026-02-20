import WebSocket, { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ port: 8080 });

export function broadcast(data: any) {
  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
