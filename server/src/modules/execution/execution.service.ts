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
  } = options;

  const results: any[] = [];
  const context: Record<string, any> = {};
  const visited = new Set<string>();

  const adjacency = new Map<string, ExecutionEdge[]>();

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

  async function executeNode(node: ExecutionNode) {
    const start = Date.now();

    if (node.type === "http") {
      const resolvedData = resolveVariables(node.data, {
        ...collectionVariables,
        ...context,
      });

      const timeout = resolvedData.timeout ?? 10000;
      const retries = resolvedData.retries ?? 0;
      const continueOnFailure = resolvedData.continueOnFailure ?? true;

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

      let attempt = 0;
      let lastError: any;

      while (attempt <= retries) {
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
            response.status >= 200 && response.status < 300
              ? "success"
              : "error";

          if (status === "success") {
            context[node.id] = response.data;
          }

          return {
            status,
            response: response.data,
            httpStatus: response.status,
            duration,
            attempt: attempt + 1,
          };
        } catch (error: any) {
          lastError = error;
          attempt++;
        }
      }

      return {
        status: "error",
        error: lastError?.message || "Request failed",
        duration: Date.now() - start,
        attempt,
        continueOnFailure,
      };
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

  async function dfs(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const result = await executeNode(node);

    const log = { nodeId, ...result };
    results.push(log);
    broadcast(log);

    const nextEdges = adjacency.get(nodeId) || [];

    if (node.type === "condition" && typeof result.result === "boolean") {
      const filtered = nextEdges.filter(
        (edge) =>
          (result.result && edge.sourceHandle === "true") ||
          (!result.result && edge.sourceHandle === "false"),
      );

      await Promise.all(filtered.map((e) => dfs(e.target)));
    } else if (
      result.status === "error" &&
      result.continueOnFailure === false
    ) {
      return;
    } else {
      await Promise.all(nextEdges.map((e) => dfs(e.target)));
    }
  }

  const targets = new Set(edges.map((e) => e.target));
  const roots = nodes.filter((n) => !targets.has(n.id));

  for (const root of roots) {
    await dfs(root.id);
  }

  return results;
}
