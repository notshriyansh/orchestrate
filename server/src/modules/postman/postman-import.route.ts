import { Router } from "express";
import { importPostmanCollection } from "./postman-import.service.js";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "@prisma/client";

const router = Router();

router.post("/:workflowId", async (req, res) => {
  const { workflowId } = req.params;
  const collection = req.body;

  const { nodes, edges } = importPostmanCollection(collection);

  await prisma.workflow.update({
    where: { id: workflowId },
    data: {
      nodes: nodes as unknown as Prisma.InputJsonValue,
      edges: edges as unknown as Prisma.InputJsonValue,
    },
  });

  res.json({ nodes, edges });
});

export default router;
