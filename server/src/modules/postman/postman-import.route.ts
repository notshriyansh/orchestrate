import { Router } from "express";
import { importPostmanCollection } from "./postman-import.service.js";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "@prisma/client";
import { authenticate, AuthRequest } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/:workflowId", authenticate, async (req: AuthRequest, res) => {
  try {
    const workflowId =
      typeof req.params.workflowId === "string"
        ? req.params.workflowId
        : req.params.workflowId?.[0];

    if (!workflowId) {
      return res.status(400).json({ message: "Workflow ID required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const collection = req.body;

    const { nodes, edges } = importPostmanCollection(collection);

    const existing = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    await prisma.workflow.update({
      where: { id: workflowId },
      data: {
        nodes: nodes as unknown as Prisma.InputJsonValue,
        edges: edges as unknown as Prisma.InputJsonValue,
      },
    });

    return res.json({ nodes, edges });
  } catch (err) {
    console.error("Postman import error:", err);
    return res.status(500).json({ message: "Import failed" });
  }
});

export default router;
