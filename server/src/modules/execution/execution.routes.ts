import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { authenticate, AuthRequest } from "../../middleware/auth.middleware.js";
import { executeWorkflow } from "./execution.service.js";
import { Prisma } from "@prisma/client";

const router = Router();

router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, nodes, edges } = req.body;

    const workflow = await prisma.workflow.create({
      data: {
        name: name || "Untitled Workflow",
        userId: req.user.id,
        nodes: (nodes ?? []) as Prisma.InputJsonValue,
        edges: (edges ?? []) as Prisma.InputJsonValue,
      },
    });

    res.json(workflow);
  } catch (err) {
    console.error("Create workflow error:", err);
    res.status(500).json({ error: "Failed to create workflow" });
  }
});

router.get("/history/:workflowId", authenticate, async (req, res) => {
  const workflowId = Array.isArray(req.params.workflowId)
    ? req.params.workflowId[0]
    : req.params.workflowId;

  const executions = await prisma.execution.findMany({
    where: { workflowId },
    orderBy: { startedAt: "desc" },
  });

  res.json(executions);
});

export default router;
