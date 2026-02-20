import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { authenticate, AuthRequest } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const workflow = await prisma.workflow.create({
      data: {
        name: req.body.name || "Untitled Workflow",
        userId: req.user.id,
        nodes: [],
        edges: [],
      },
    });

    res.json(workflow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create workflow" });
  }
});

router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const workflows = await prisma.workflow.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: "desc" },
    });

    res.json(workflows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch workflows" });
  }
});

router.get("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const workflow = await prisma.workflow.findFirst({
      where: {
        id: req.params.id as string,
        userId: req.user.id,
      },
    });

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    res.json(workflow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch workflow" });
  }
});

router.put("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, nodes, edges } = req.body;

    const existing = await prisma.workflow.findFirst({
      where: {
        id: req.params.id as string,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return res.status(404).json({ error: "Workflow not found" });
    }

    const workflow = await prisma.workflow.update({
      where: { id: req.params.id as string },
      data: {
        name,
        nodes,
        edges,
      },
    });

    res.json(workflow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update workflow" });
  }
});

router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existing = await prisma.workflow.findFirst({
      where: {
        id: req.params.id as string,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return res.status(404).json({ error: "Workflow not found" });
    }

    await prisma.workflow.delete({
      where: { id: req.params.id as string },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete workflow" });
  }
});

export default router;
