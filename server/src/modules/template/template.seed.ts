import { prisma } from "../../lib/prisma.js";

export async function seedTemplates() {
  const existing = await prisma.template.count();
  if (existing > 0) return;

  await prisma.template.createMany({
    data: [
      {
        name: "API Gateway + Load Balanced Service",
        description:
          "Simulates API Gateway routing to Load Balancer and App Servers.",
        category: "Architecture",
        nodes: [
          {
            id: "gateway",
            type: "http",
            position: { x: 0, y: 0 },
            data: {
              label: "API Gateway",
              method: "GET",
              url: "https://api.example.com",
            },
          },
          {
            id: "lb",
            type: "delay",
            position: { x: 300, y: 0 },
            data: { label: "Load Balancer", duration: 200 },
          },
        ],
        edges: [
          {
            id: "e1",
            source: "gateway",
            target: "lb",
            type: "smoothstep",
          },
        ],
      },
      {
        name: "Payment Processing System",
        description: "Client → Payment API → Fraud Check → Database",
        category: "Fintech",
        nodes: [],
        edges: [],
      },
    ],
  });

  console.log("Templates seeded");
}
