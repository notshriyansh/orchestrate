import {
  Server,
  Database,
  Cloud,
  Shield,
  Layers,
  Cpu,
  HardDrive,
  Globe,
  Activity,
  Network,
  Box,
  Lock,
  GitBranch,
  Radio,
  Timer,
} from "lucide-react";

export type InfraCategory =
  | "network"
  | "compute"
  | "storage"
  | "processing"
  | "security"
  | "observability"
  | "ai";

export interface InfraNodeDefinition {
  type: string;
  label: string;
  icon: any;
  category: InfraCategory;
  color: string;
}

export const INFRA_NODE_REGISTRY: InfraNodeDefinition[] = [
  {
    type: "loadbalancer",
    label: "Load Balancer",
    icon: Globe,
    category: "network",
    color: "#3b82f6",
  },
  {
    type: "apigateway",
    label: "API Gateway",
    icon: Network,
    category: "network",
    color: "#2563eb",
  },
  {
    type: "reverseproxy",
    label: "Reverse Proxy",
    icon: Radio,
    category: "network",
    color: "#1d4ed8",
  },
  {
    type: "cdn",
    label: "CDN",
    icon: Cloud,
    category: "network",
    color: "#0ea5e9",
  },

  {
    type: "appserver",
    label: "App Server",
    icon: Server,
    category: "compute",
    color: "#22c55e",
  },
  {
    type: "worker",
    label: "Worker",
    icon: Cpu,
    category: "compute",
    color: "#16a34a",
  },
  {
    type: "scheduler",
    label: "Scheduler",
    icon: Timer,
    category: "compute",
    color: "#15803d",
  },
  {
    type: "container",
    label: "Container",
    icon: Box,
    category: "compute",
    color: "#10b981",
  },

  {
    type: "sqldb",
    label: "SQL Database",
    icon: Database,
    category: "storage",
    color: "#f59e0b",
  },
  {
    type: "redis",
    label: "Redis Cache",
    icon: HardDrive,
    category: "storage",
    color: "#f97316",
  },
  {
    type: "vector",
    label: "Vector DB",
    icon: Layers,
    category: "storage",
    color: "#fb923c",
  },

  {
    type: "queue",
    label: "Message Queue",
    icon: GitBranch,
    category: "processing",
    color: "#a855f7",
  },
  {
    type: "eventbus",
    label: "Event Bus",
    icon: Activity,
    category: "processing",
    color: "#9333ea",
  },

  {
    type: "auth",
    label: "Auth Service",
    icon: Shield,
    category: "security",
    color: "#ef4444",
  },
  {
    type: "firewall",
    label: "Firewall",
    icon: Lock,
    category: "security",
    color: "#dc2626",
  },

  {
    type: "monitoring",
    label: "Monitoring",
    icon: Activity,
    category: "observability",
    color: "#64748b",
  },

  {
    type: "llm",
    label: "LLM Service",
    icon: Cpu,
    category: "ai",
    color: "#8b5cf6",
  },
  {
    type: "embedding",
    label: "Embedding Service",
    icon: Layers,
    category: "ai",
    color: "#7c3aed",
  },
];
