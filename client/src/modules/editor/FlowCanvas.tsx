import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  type Node,
  type Edge,
  Background,
  BackgroundVariant,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import HttpNode from "./nodes/HttpNode";
import DelayNode from "./nodes/DelayNode";
import ConditionNode from "./nodes/ConditionNode";
import WebhookNode from "./nodes/WebhookNode";
import TransformNode from "./nodes/TransformNode";
import DatabaseNode from "./nodes/DatabaseNode";
import ParallelNode from "./nodes/ParallelNode";
import InfraNode from "./nodes/InfraNode";
import CustomEdge from "./edges/CustomEdges";

interface Props {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setSelectedNode: (node: Node | null) => void;
}

export default function FlowCanvas({
  nodes,
  edges,
  setNodes,
  setEdges,
  setSelectedNode,
}: Props) {
  const { project } = useReactFlow();

  const nodeTypes = useMemo(
    () => ({
      http: HttpNode,
      delay: DelayNode,
      condition: ConditionNode,
      webhook: WebhookNode,
      transform: TransformNode,
      database: DatabaseNode,
      parallel: ParallelNode,

      loadbalancer: InfraNode,
      apigateway: InfraNode,
      cache: InfraNode,
      kvstore: InfraNode,
      graphdb: InfraNode,
      vectordb: InfraNode,
      objectstore: InfraNode,
      scheduler: InfraNode,
      appserver: InfraNode,
      reverseproxy: InfraNode,
      cdn: InfraNode,
      queue: InfraNode,
      eventbus: InfraNode,
      worker: InfraNode,
      container: InfraNode,
      auth: InfraNode,
      firewall: InfraNode,
    }),
    [],
  );

  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    [],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = project({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${Date.now()}`,
        type,
        position,
        data: {
          label: type.toUpperCase(),
          status: "idle",
          health: "healthy",
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [project, setNodes],
  );

  const styledNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        className:
          node.data?.status === "running"
            ? "node-running"
            : node.data?.status === "success"
              ? "node-success"
              : node.data?.status === "error"
                ? "node-error"
                : "",
      })),
    [nodes],
  );

  const handleNodesDelete = useCallback(
    (deleted: Node[]) => {
      const deletedIds = new Set(deleted.map((n) => n.id));

      setEdges((eds) =>
        eds.filter(
          (e) => !deletedIds.has(e.source) && !deletedIds.has(e.target),
        ),
      );

      setSelectedNode(null);
    },
    [setEdges, setSelectedNode],
  );

  return (
    <div className="flex-1 h-full w-full relative">
      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(changes) =>
          setNodes((nds) => applyNodeChanges(changes, nds))
        }
        onEdgesChange={(changes) =>
          setEdges((eds) => applyEdgeChanges(changes, eds))
        }
        onNodesDelete={handleNodesDelete}
        onConnect={(params) =>
          setEdges((eds) =>
            addEdge(
              {
                ...params,
                type: "custom",
                markerEnd: { type: MarkerType.ArrowClosed },
                data: {
                  active: true,
                  onDelete: (id: string) =>
                    setEdges((prev) => prev.filter((edge) => edge.id !== id)),
                },
              },
              eds,
            ),
          )
        }
        deleteKeyCode={["Backspace", "Delete"]}
        onNodeClick={(_, node) => setSelectedNode(node)}
        onPaneClick={() => setSelectedNode(null)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        panOnDrag
        zoomOnScroll
        nodesDraggable
        elementsSelectable
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1.2}
          color="#1f2a44"
        />

        <Background
          variant={BackgroundVariant.Lines}
          gap={110}
          size={1}
          color="#1e293b"
        />

        <Controls />
      </ReactFlow>
    </div>
  );
}
