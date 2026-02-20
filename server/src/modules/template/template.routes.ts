import { Router } from "express";
import { prisma } from "../../lib/prisma.js";

const router = Router();

router.get("/", async (_, res) => {
  const templates = await prisma.template.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(templates);
});

router.get("/:id", async (req, res) => {
  const template = await prisma.template.findUnique({
    where: { id: req.params.id },
  });

  if (!template) {
    return res.status(404).json({ message: "Template not found" });
  }

  res.json(template);
});

export default router;
