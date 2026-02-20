import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { authenticate, AuthRequest } from "../../middleware/auth.middleware.js";
import { executeWorkflow } from "./execution.service.js";

const router = Router();

router.post("/:workflowId", authenticate, async (req, res) => {
  try {
    const workflowId = req.params.workflowId as string;

    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
    });

    if (!workflow) {
      return res.status(404).json({ error: "Workflow not found" });
    }

    const nodes = workflow.nodes as any[];
    const edges = workflow.edges as any[];

    const logs = await executeWorkflow(nodes, edges);

    const execution = await prisma.execution.create({
      data: {
        workflowId,
        status: "completed",
        startedAt: new Date(),
        finishedAt: new Date(),
        logs,
      },
    });

    return res.json(execution);
  } catch (error: any) {
    console.error("Execution error:", error);

    return res.status(500).json({
      error: "Execution failed",
      message: error.message,
    });
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
