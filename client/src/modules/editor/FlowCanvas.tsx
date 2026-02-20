import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import HttpNode from "./nodes/HttpNode";
import DelayNode from "./nodes/DelayNode";
import ConditionNode from "./nodes/ConditionNode";
import WebhookNode from "./nodes/WebhookNode";
import TransformNode from "./nodes/TransformNode";
import DatabaseNode from "./nodes/DatabaseNode";
import ParallelNode from "./nodes/ParallelNode";
import CustomEdge from "./edges/CustomEdges";

export default function FlowCanvas({
  nodes,
  edges,
  setNodes,
  setEdges,
  setSelectedNode,
}: any) {
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

      const newNode = {
        id: `${Date.now()}`,
        type,
        position,
        data: {
          label: `${type.toUpperCase()} Node`,
          status: "idle",
        },
      };

      setNodes((nds: any[]) => nds.concat(newNode));
    },
    [project, setNodes],
  );

  const styledNodes = useMemo(
    () =>
      nodes.map((node: any) => ({
        ...node,
        className: node.data?.status === "running" ? "node-running" : "",
      })),
    [nodes],
  );

  return (
    <div className="flex-1 h-full w-full">
      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(changes) =>
          setNodes((nds: any) => applyNodeChanges(changes, nds))
        }
        onEdgesChange={(changes) =>
          setEdges((eds: any) => applyEdgeChanges(changes, eds))
        }
        onConnect={(params) =>
          setEdges((eds: any[]) =>
            addEdge(
              {
                ...params,
                type: "custom",
                data: {
                  onDelete: (id: string) =>
                    setEdges((prev: any[]) => prev.filter((e) => e.id !== id)),
                },
              },
              eds,
            ),
          )
        }
        deleteKeyCode={["Backspace", "Delete"]}
        onNodeClick={(_, node) => setSelectedNode(node)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <MiniMap />
        <Background gap={28} color="#1f2937" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
