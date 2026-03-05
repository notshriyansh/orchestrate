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
    id: "chat-system",
    name: "Realtime Chat System",
    description: "Scalable websocket chat architecture with pub/sub",

    nodes: [
      {
        id: "1",
        type: "http",
        position: { x: 0, y: 260 },
        data: { label: "User Client", status: "idle", health: "healthy" },
      },

      {
        id: "2",
        type: "cdn",
        position: { x: 320, y: 260 },
        data: { label: "CDN", status: "idle", health: "healthy" },
      },

      {
        id: "3",
        type: "apigateway",
        position: { x: 650, y: 260 },
        data: { label: "Gateway", status: "idle", health: "healthy" },
      },

      {
        id: "4",
        type: "loadbalancer",
        position: { x: 980, y: 260 },
        data: { label: "Load Balancer", status: "idle", health: "healthy" },
      },

      {
        id: "5",
        type: "appserver",
        position: { x: 1320, y: 80 },
        data: { label: "Chat Server 1", status: "idle", health: "healthy" },
      },
      {
        id: "6",
        type: "appserver",
        position: { x: 1320, y: 260 },
        data: { label: "Chat Server 2", status: "idle", health: "healthy" },
      },
      {
        id: "7",
        type: "appserver",
        position: { x: 1320, y: 440 },
        data: { label: "Chat Server 3", status: "idle", health: "healthy" },
      },

      {
        id: "8",
        type: "redis",
        position: { x: 1650, y: 260 },
        data: { label: "Redis Pub/Sub", status: "idle", health: "healthy" },
      },

      {
        id: "9",
        type: "sqldb",
        position: { x: 2000, y: 260 },
        data: { label: "Message Store", status: "idle", health: "healthy" },
      },

      {
        id: "10",
        type: "queue",
        position: { x: 1650, y: 480 },
        data: {
          label: "Notification Queue",
          status: "idle",
          health: "healthy",
        },
      },

      {
        id: "11",
        type: "worker",
        position: { x: 2000, y: 480 },
        data: { label: "Push Worker", status: "idle", health: "healthy" },
      },

      {
        id: "12",
        type: "auth",
        position: { x: 650, y: 480 },
        data: { label: "Auth Service", status: "idle", health: "healthy" },
      },

      {
        id: "13",
        type: "monitoring",
        position: { x: 980, y: 650 },
        data: { label: "Monitoring", status: "idle", health: "healthy" },
      },
    ],

    edges: [
      { id: "e1", source: "1", target: "2", type: "custom" },
      { id: "e2", source: "2", target: "3", type: "custom" },
      { id: "e3", source: "3", target: "4", type: "custom" },

      { id: "e4", source: "4", target: "5", type: "custom" },
      { id: "e5", source: "4", target: "6", type: "custom" },
      { id: "e6", source: "4", target: "7", type: "custom" },

      { id: "e7", source: "5", target: "8", type: "custom" },
      { id: "e8", source: "6", target: "8", type: "custom" },
      { id: "e9", source: "7", target: "8", type: "custom" },

      { id: "e10", source: "8", target: "9", type: "custom" },

      { id: "e11", source: "8", target: "10", type: "custom" },

      { id: "e12", source: "10", target: "11", type: "custom" },

      { id: "e13", source: "3", target: "12", type: "custom" },

      { id: "e14", source: "5", target: "13", type: "custom" },
      { id: "e15", source: "6", target: "13", type: "custom" },
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
    id: "ecommerce-platform",
    name: "E-Commerce Platform",
    description: "Large scale microservice architecture for an online store",

    nodes: [
      {
        id: "1",
        type: "http",
        position: { x: 0, y: 260 },
        data: { label: "User Request", status: "idle", health: "healthy" },
      },

      {
        id: "2",
        type: "cdn",
        position: { x: 320, y: 260 },
        data: { label: "CDN", status: "idle", health: "healthy" },
      },

      {
        id: "3",
        type: "apigateway",
        position: { x: 650, y: 260 },
        data: { label: "API Gateway", status: "idle", health: "healthy" },
      },

      {
        id: "4",
        type: "loadbalancer",
        position: { x: 980, y: 260 },
        data: { label: "Load Balancer", status: "idle", health: "healthy" },
      },

      {
        id: "5",
        type: "appserver",
        position: { x: 1320, y: 40 },
        data: { label: "Auth Service", status: "idle", health: "healthy" },
      },
      {
        id: "6",
        type: "appserver",
        position: { x: 1320, y: 260 },
        data: { label: "Product Service", status: "idle", health: "healthy" },
      },
      {
        id: "7",
        type: "appserver",
        position: { x: 1320, y: 480 },
        data: { label: "Order Service", status: "idle", health: "healthy" },
      },
      {
        id: "8",
        type: "appserver",
        position: { x: 1320, y: 700 },
        data: { label: "Payment Service", status: "idle", health: "healthy" },
      },

      {
        id: "9",
        type: "sqldb",
        position: { x: 1700, y: 40 },
        data: { label: "Auth DB", status: "idle", health: "healthy" },
      },
      {
        id: "10",
        type: "sqldb",
        position: { x: 1700, y: 260 },
        data: { label: "Product DB", status: "idle", health: "healthy" },
      },
      {
        id: "11",
        type: "sqldb",
        position: { x: 1700, y: 480 },
        data: { label: "Order DB", status: "idle", health: "healthy" },
      },

      {
        id: "12",
        type: "queue",
        position: { x: 1700, y: 700 },
        data: { label: "Order Queue", status: "idle", health: "healthy" },
      },

      {
        id: "13",
        type: "worker",
        position: { x: 2050, y: 700 },
        data: { label: "Email Worker", status: "idle", health: "healthy" },
      },

      {
        id: "14",
        type: "redis",
        position: { x: 1000, y: 520 },
        data: { label: "Redis Cache", status: "idle", health: "healthy" },
      },

      {
        id: "15",
        type: "monitoring",
        position: { x: 980, y: 820 },
        data: { label: "Observability", status: "idle", health: "healthy" },
      },
    ],

    edges: [
      { id: "e1", source: "1", target: "2", type: "custom" },
      { id: "e2", source: "2", target: "3", type: "custom" },
      { id: "e3", source: "3", target: "4", type: "custom" },

      { id: "e4", source: "4", target: "5", type: "custom" },
      { id: "e5", source: "4", target: "6", type: "custom" },
      { id: "e6", source: "4", target: "7", type: "custom" },
      { id: "e7", source: "4", target: "8", type: "custom" },

      { id: "e8", source: "5", target: "9", type: "custom" },
      { id: "e9", source: "6", target: "10", type: "custom" },
      { id: "e10", source: "7", target: "11", type: "custom" },

      { id: "e11", source: "7", target: "12", type: "custom" },

      { id: "e12", source: "12", target: "13", type: "custom" },

      { id: "e13", source: "6", target: "14", type: "custom" },

      { id: "e14", source: "6", target: "15", type: "custom" },
      { id: "e15", source: "7", target: "15", type: "custom" },
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
