import { v4 as uuid } from "uuid";

interface PostmanCollection {
  item: any[];
  variable?: { key: string; value: string }[];
}

interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  style?: any;
}

export function importPostmanCollection(collection: PostmanCollection) {
  const nodes: FlowNode[] = [];
  const edges: FlowEdge[] = [];

  const variables: Record<string, string> = {};

  collection.variable?.forEach((v) => {
    variables[v.key] = v.value;
  });

  function resolveVars(value: string): string {
    if (!value) return value;

    return value.replace(/{{(.*?)}}/g, (_, key) => {
      return variables[key.trim()] ?? `{{${key}}}`;
    });
  }

  function createNodeFromRequest(request: any, name: string): string {
    const id = uuid();

    let url = "";

    if (typeof request.url === "string") {
      url = resolveVars(request.url);
    } else if (request.url?.raw) {
      url = resolveVars(request.url.raw);
    }

    const method = request.method || "GET";

    const headers: Record<string, string> = {};
    request.header?.forEach((h: any) => {
      headers[h.key] = resolveVars(h.value || "");
    });

    let body: any = null;

    if (request.body) {
      switch (request.body.mode) {
        case "raw":
          body = resolveVars(request.body.raw);
          break;

        case "formdata":
          body = {};
          request.body.formdata?.forEach((f: any) => {
            body[f.key] =
              f.type === "file" ? "[FILE]" : resolveVars(f.value || "");
          });
          break;

        case "graphql":
          body = {
            query: request.body.graphql?.query,
            variables: request.body.graphql?.variables,
          };
          break;
      }
    }

    nodes.push({
      id,
      type: "http",
      position: { x: 0, y: 0 },
      data: {
        label: name,
        method,
        url,
        headers,
        body,
        status: "idle",
      },
    });

    return id;
  }

  function extractItems(items: any[], parentId?: string) {
    items.forEach((item) => {
      if (item.item && Array.isArray(item.item)) {
        extractItems(item.item, parentId);
      } else if (item.request) {
        const nodeId = createNodeFromRequest(item.request, item.name);

        if (parentId) {
          edges.push({
            id: uuid(),
            source: parentId,
            target: nodeId,
            type: "smoothstep",
            style: {
              stroke: "#64748b",
              strokeWidth: 3,
            },
          });
        }

        parentId = nodeId;
      }
    });
  }

  extractItems(collection.item);

  const positionedNodes = layoutNodes(nodes, edges);

  return { nodes: positionedNodes, edges };
}

function layoutNodes(nodes: FlowNode[], edges: FlowEdge[]) {
  const adjacency = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  nodes.forEach((node) => {
    adjacency.set(node.id, []);
    inDegree.set(node.id, 0);
  });

  edges.forEach((edge) => {
    adjacency.get(edge.source)?.push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  });

  const levels: Record<string, number> = {};
  const queue: string[] = [];

  nodes.forEach((node) => {
    if (inDegree.get(node.id) === 0) {
      levels[node.id] = 0;
      queue.push(node.id);
    }
  });

  while (queue.length) {
    const current = queue.shift()!;
    const children = adjacency.get(current) || [];

    children.forEach((child) => {
      const newLevel = (levels[current] ?? 0) + 1;
      levels[child] = Math.max(levels[child] ?? 0, newLevel);

      inDegree.set(child, (inDegree.get(child) || 1) - 1);

      if (inDegree.get(child) === 0) {
        queue.push(child);
      }
    });
  }

  const grouped: Record<number, FlowNode[]> = {};

  Object.entries(levels).forEach(([id, level]) => {
    if (!grouped[level]) grouped[level] = [];
    const node = nodes.find((n) => n.id === id);
    if (node) grouped[level].push(node);
  });

  const horizontalSpacing = 380;
  const verticalSpacing = 180;

  Object.entries(grouped).forEach(([levelStr, levelNodes]) => {
    const level = Number(levelStr);

    const totalHeight = levelNodes.length * verticalSpacing;
    const offsetY = -totalHeight / 2;

    levelNodes.forEach((node, index) => {
      node.position = {
        x: level * horizontalSpacing,
        y: offsetY + index * verticalSpacing,
      };
    });
  });

  return nodes;
}
