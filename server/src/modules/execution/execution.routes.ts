import { Router } from "express";
import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma.js";
import { authenticate, AuthRequest } from "../../middleware/auth.middleware.js";
import { executeWorkflow } from "./execution.service.js";

const router = Router();

router.post("/:workflowId", authenticate, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const workflowIdParam = req.params.workflowId;
    const workflowId = Array.isArray(workflowIdParam)
      ? workflowIdParam[0]
      : workflowIdParam;

    if (!workflowId) {
      return res.status(400).json({ message: "Invalid workflow id" });
    }

    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
    });

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    const startedAt = new Date();
    const executionId = randomUUID();

    const logs = await executeWorkflow(
      workflow.nodes as any[],
      workflow.edges as any[],
      { executionId },
    );

    const execution = await prisma.execution.create({
      data: {
        id: executionId,
        workflowId: workflowId,
        logs,
        status: logs.some((l: any) => l.status === "error")
          ? "failed"
          : "success",
        startedAt,
      },
    });

    res.json(execution);
  } catch (error) {
    console.error("Execution failed:", error);
    res.status(500).json({ error: "Execution failed" });
  }
});

router.get("/history/:workflowId", authenticate, async (req, res) => {
  const workflowIdParam = req.params.workflowId;
  const workflowId = Array.isArray(workflowIdParam)
    ? workflowIdParam[0]
    : workflowIdParam;

  if (!workflowId) {
    return res.status(400).json({ message: "Invalid workflow id" });
  }

  const executions = await prisma.execution.findMany({
    where: { workflowId: workflowId },
    orderBy: { startedAt: "desc" },
  });

  res.json(executions);
});

export default router;
