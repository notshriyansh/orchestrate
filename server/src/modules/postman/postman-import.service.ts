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
  data?: {
    active?: boolean;
  };
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
            type: "custom",
          });
        }

        if (item.item) {
          extractItems(item.item, nodeId);
        }
      }
    });
  }

  extractItems(collection.item);

  const positionedNodes = layoutNodes(nodes, edges);

  return { nodes: positionedNodes, edges };
}

function layoutNodes(nodes: FlowNode[], edges: FlowEdge[]) {
  const childrenMap = new Map<string, string[]>();
  const parentCount = new Map<string, number>();

  nodes.forEach((n) => {
    childrenMap.set(n.id, []);
    parentCount.set(n.id, 0);
  });

  edges.forEach((e) => {
    childrenMap.get(e.source)?.push(e.target);
    parentCount.set(e.target, (parentCount.get(e.target) || 0) + 1);
  });

  const roots = nodes.filter((n) => parentCount.get(n.id) === 0);

  const levelMap = new Map<string, number>();

  function assignLevels(nodeId: string, level: number) {
    levelMap.set(nodeId, level);
    childrenMap.get(nodeId)?.forEach((child) => assignLevels(child, level + 1));
  }

  roots.forEach((root) => assignLevels(root.id, 0));

  const grouped: Record<number, FlowNode[]> = {};

  nodes.forEach((node) => {
    const level = levelMap.get(node.id) ?? 0;
    if (!grouped[level]) grouped[level] = [];
    grouped[level].push(node);
  });

  const horizontalSpacing = 320;
  const verticalSpacing = 160;

  Object.entries(grouped).forEach(([levelStr, levelNodes]) => {
    const level = Number(levelStr);

    const totalHeight = (levelNodes.length - 1) * verticalSpacing;
    const startY = -totalHeight / 2;

    levelNodes.forEach((node, index) => {
      node.position = {
        x: level * horizontalSpacing,
        y: startY + index * verticalSpacing,
      };
    });
  });

  return nodes;
}
