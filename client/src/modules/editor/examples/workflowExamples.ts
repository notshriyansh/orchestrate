import type { Node, Edge } from "reactflow";

export interface WorkflowExample {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

export const WORKFLOW_EXAMPLES: WorkflowExample[] = [
  {
    id: "api-pipeline",
    name: "API Processing Pipeline",
    description: "Gateway → Transform → Cache → Database",

    nodes: [
      {
        id: "1",
        type: "http",
        position: { x: 0, y: 200 },
        data: { label: "HTTP Request", status: "idle", health: "healthy" },
      },
      {
        id: "2",
        type: "apigateway",
        position: { x: 300, y: 200 },
        data: { label: "API Gateway", status: "idle", health: "healthy" },
      },
      {
        id: "3",
        type: "transform",
        position: { x: 600, y: 200 },
        data: { label: "Transform", status: "idle", health: "healthy" },
      },

      {
        id: "4",
        type: "redis",
        position: { x: 900, y: 80 },
        data: { label: "Cache", status: "idle", health: "healthy" },
      },
      {
        id: "5",
        type: "sqldb",
        position: { x: 900, y: 320 },
        data: { label: "SQL DB", status: "idle", health: "healthy" },
      },

      {
        id: "6",
        type: "monitoring",
        position: { x: 600, y: 420 },
        data: { label: "Monitoring", status: "idle", health: "healthy" },
      },
    ],

    edges: [
      { id: "e1", source: "1", target: "2", type: "custom" },
      { id: "e2", source: "2", target: "3", type: "custom" },
      { id: "e3", source: "3", target: "4", type: "custom" },
      { id: "e4", source: "3", target: "5", type: "custom" },
      { id: "e5", source: "3", target: "6", type: "custom" },
    ],
  },

  {
    id: "event-system",
    name: "Event Driven System",
    description: "API → Queue → Worker → Event Bus",

    nodes: [
      {
        id: "1",
        type: "http",
        position: { x: 0, y: 200 },
        data: { label: "API", status: "idle", health: "healthy" },
      },
      {
        id: "2",
        type: "queue",
        position: { x: 300, y: 200 },
        data: { label: "Queue", status: "idle", health: "healthy" },
      },
      {
        id: "3",
        type: "worker",
        position: { x: 600, y: 200 },
        data: { label: "Worker", status: "idle", health: "healthy" },
      },
      {
        id: "4",
        type: "eventbus",
        position: { x: 900, y: 200 },
        data: { label: "Event Bus", status: "idle", health: "healthy" },
      },

      {
        id: "5",
        type: "appserver",
        position: { x: 1200, y: 80 },
        data: {
          label: "Notification Service",
          status: "idle",
          health: "healthy",
        },
      },
      {
        id: "6",
        type: "appserver",
        position: { x: 1200, y: 320 },
        data: { label: "Analytics Service", status: "idle", health: "healthy" },
      },
    ],

    edges: [
      { id: "e1", source: "1", target: "2", type: "custom" },
      { id: "e2", source: "2", target: "3", type: "custom" },
      { id: "e3", source: "3", target: "4", type: "custom" },
      { id: "e4", source: "4", target: "5", type: "custom" },
      { id: "e5", source: "4", target: "6", type: "custom" },
    ],
  },

  {
    id: "microservices",
    name: "Microservice Architecture",
    description: "Gateway → Load Balancer → Services",

    nodes: [
      {
        id: "1",
        type: "apigateway",
        position: { x: 0, y: 200 },
        data: { label: "API Gateway", status: "idle", health: "healthy" },
      },
      {
        id: "2",
        type: "loadbalancer",
        position: { x: 320, y: 200 },
        data: { label: "Load Balancer", status: "idle", health: "healthy" },
      },

      {
        id: "3",
        type: "appserver",
        position: { x: 650, y: 80 },
        data: { label: "User Service", status: "idle", health: "healthy" },
      },
      {
        id: "4",
        type: "appserver",
        position: { x: 650, y: 320 },
        data: { label: "Order Service", status: "idle", health: "healthy" },
      },

      {
        id: "5",
        type: "sqldb",
        position: { x: 1000, y: 80 },
        data: { label: "User DB", status: "idle", health: "healthy" },
      },
      {
        id: "6",
        type: "sqldb",
        position: { x: 1000, y: 320 },
        data: { label: "Order DB", status: "idle", health: "healthy" },
      },

      {
        id: "7",
        type: "monitoring",
        position: { x: 650, y: 500 },
        data: { label: "Observability", status: "idle", health: "healthy" },
      },
    ],

    edges: [
      { id: "e1", source: "1", target: "2", type: "custom" },
      { id: "e2", source: "2", target: "3", type: "custom" },
      { id: "e3", source: "2", target: "4", type: "custom" },
      { id: "e4", source: "3", target: "5", type: "custom" },
      { id: "e5", source: "4", target: "6", type: "custom" },
      { id: "e6", source: "3", target: "7", type: "custom" },
      { id: "e7", source: "4", target: "7", type: "custom" },
    ],
  },

  {
    id: "rag-system",
    name: "AI RAG Pipeline",
    description: "Embeddings → Vector DB → LLM",

    nodes: [
      {
        id: "1",
        type: "http",
        position: { x: 0, y: 200 },
        data: { label: "User Query", status: "idle", health: "healthy" },
      },
      {
        id: "2",
        type: "embedding",
        position: { x: 320, y: 200 },
        data: { label: "Embedding", status: "idle", health: "healthy" },
      },
      {
        id: "3",
        type: "vector",
        position: { x: 640, y: 200 },
        data: { label: "Vector DB", status: "idle", health: "healthy" },
      },
      {
        id: "4",
        type: "llm",
        position: { x: 960, y: 200 },
        data: { label: "LLM", status: "idle", health: "healthy" },
      },

      {
        id: "5",
        type: "monitoring",
        position: { x: 640, y: 420 },
        data: { label: "AI Monitoring", status: "idle", health: "healthy" },
      },
    ],

    edges: [
      { id: "e1", source: "1", target: "2", type: "custom" },
      { id: "e2", source: "2", target: "3", type: "custom" },
      { id: "e3", source: "3", target: "4", type: "custom" },
      { id: "e4", source: "4", target: "5", type: "custom" },
    ],
  },

  {
    id: "kafka-stream",
    name: "Streaming Data Pipeline",
    description: "API → Queue → Stream Processor → Storage",

    nodes: [
      {
        id: "1",
        type: "http",
        position: { x: 0, y: 200 },
        data: { label: "API Producer", status: "idle", health: "healthy" },
      },
      {
        id: "2",
        type: "queue",
        position: { x: 300, y: 200 },
        data: { label: "Kafka Topic", status: "idle", health: "healthy" },
      },
      {
        id: "3",
        type: "worker",
        position: { x: 650, y: 200 },
        data: { label: "Stream Processor", status: "idle", health: "healthy" },
      },
      {
        id: "4",
        type: "sqldb",
        position: { x: 1000, y: 200 },
        data: { label: "Analytics DB", status: "idle", health: "healthy" },
      },

      {
        id: "5",
        type: "monitoring",
        position: { x: 650, y: 420 },
        data: { label: "Metrics", status: "idle", health: "healthy" },
      },
    ],

    edges: [
      { id: "e1", source: "1", target: "2", type: "custom" },
      { id: "e2", source: "2", target: "3", type: "custom" },
      { id: "e3", source: "3", target: "4", type: "custom" },
      { id: "e4", source: "3", target: "5", type: "custom" },
    ],
  },
];
