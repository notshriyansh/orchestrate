import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import { authenticate } from "./middleware/auth.middleware.js";
import workflowRoutes from "./modules/workflow/workflow.routes.js";
import executionRoutes from "./modules/execution/execution.routes.js";
import postmanImportRoute from "./modules/postman/postman-import.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/api/execute", executionRoutes);

app.use("/api/import/postman", postmanImportRoute);

app.get("/me", authenticate, (req: any, res) => {
  res.json({ user: req.user });
});

app.use("/api/workflows", workflowRoutes);

export default app;
