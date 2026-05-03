import axios from "axios";
import https from "https";
import { resolveVariables } from "./variable-resolver.js";
import { broadcast } from "../../websocket.js";

export interface ExecutionNode {
  id: string;
  type: string;
  data: any;
}

export interface ExecutionEdge {
  source: string;
  target: string;
  sourceHandle?: string;
}

export interface ExecutionOptions {
  mockMode?: boolean;
  allowInsecureSSL?: boolean;
  collectionVariables?: Record<string, any>;
  executionId?: string;
}

export async function executeWorkflow(
  nodes: ExecutionNode[],
  edges: ExecutionEdge[],
  options: ExecutionOptions = {},
) {
  const {
    mockMode = false,
    allowInsecureSSL = false,
    collectionVariables = {},
    executionId,
  } = options;

  const results: any[] = [];
  const context: Record<string, any> = {};
  const visited = new Set<string>();

  const adjacency = new Map<string, ExecutionEdge[]>();
  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  edges.forEach((edge) => {
    if (!adjacency.has(edge.source)) {
      adjacency.set(edge.source, []);
    }
    adjacency.get(edge.source)!.push(edge);
  });

  function validateUrl(url: string) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }

  function randomDelay() {
    return Math.floor(Math.random() * 601) + 200;
  }

  function getNodeSettings(node: ExecutionNode) {
    return {
      delay: Number(node.data?.delay) || randomDelay(),
      retries: Number(node.data?.retries) || 0,
      continueOnFailure: node.data?.continueOnFailure ?? true,
    };
  }

  async function executeNodeOnce(node: ExecutionNode) {
    const start = Date.now();

    if (node.type === "http") {
      const resolvedData = resolveVariables(node.data, {
        ...collectionVariables,
        ...context,
      });

      const timeout = resolvedData.timeout ?? 10000;

      if (!resolvedData?.url) {
        return {
          status: "error",
          error: "Missing URL",
          duration: Date.now() - start,
        };
      }

      if (!validateUrl(resolvedData.url)) {
        return {
          status: "error",
          error: "Invalid URL",
          duration: Date.now() - start,
        };
      }

      if (mockMode) {
        return {
          status: "success",
          mock: true,
          response: { mocked: true },
          duration: Date.now() - start,
        };
      }

      try {
        const response = await axios({
          method: resolvedData.method || "GET",
          url: resolvedData.url,
          headers: resolvedData.headers,
          data: resolvedData.body,
          timeout,
          validateStatus: () => true,
          httpsAgent: allowInsecureSSL
            ? new https.Agent({ rejectUnauthorized: false })
            : undefined,
        });

        const duration = Date.now() - start;

        const status =
          response.status >= 200 && response.status < 300 ? "success" : "error";

        if (status === "success") {
          context[node.id] = response.data;
        }

        return {
          status,
          response: response.data,
          httpStatus: response.status,
          duration,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error?.message || "Request failed",
          duration: Date.now() - start,
        };
      }
    }

    if (node.type === "condition") {
      try {
        const expression = node.data?.expression || "false";
        const result = eval(expression);

        return {
          status: "success",
          result,
          duration: Date.now() - start,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.message,
          duration: Date.now() - start,
        };
      }
    }

    return {
      status: "success",
      duration: Date.now() - start,
    };
  }

  async function executeNode(node: ExecutionNode) {
    const { delay, retries, continueOnFailure } = getNodeSettings(node);

    await new Promise((res) => setTimeout(res, delay));

    let attempt = 0;
    let result: any = null;

    while (attempt <= retries) {
      attempt++;
      result = await executeNodeOnce(node);

      if (result.status !== "error") {
        break;
      }
    }

    return {
      ...result,
      attempt,
      delay,
      continueOnFailure,
    };
  }

  const targets = new Set(edges.map((e) => e.target));
  const roots = nodes.filter((n) => !targets.has(n.id));
  const queue = roots.map((node) => node.id);

  while (queue.length) {
    const nodeId = queue.shift()!;

    if (visited.has(nodeId)) continue;
    visited.add(nodeId);

    const node = nodeById.get(nodeId);
    if (!node) continue;

    const result = await executeNode(node);

    const log = { executionId, nodeId, ...result };
    results.push(log);
    broadcast(log);

    const nextEdges = adjacency.get(nodeId) || [];

    if (node.type === "condition" && typeof result.result === "boolean") {
      const filtered = nextEdges.filter(
        (edge) =>
          (result.result && edge.sourceHandle === "true") ||
          (!result.result && edge.sourceHandle === "false"),
      );

      queue.push(...filtered.map((edge) => edge.target));
    } else if (
      result.status === "error" &&
      result.continueOnFailure === false
    ) {
      continue;
    } else {
      queue.push(...nextEdges.map((edge) => edge.target));
    }
  }

  return results;
}
