import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import { authenticate } from "./middleware/auth.middleware.js";
import workflowRoutes from "./modules/workflow/workflow.routes.js";
import executionRoutes from "./modules/execution/execution.routes.js";
import postmanImportRoute from "./modules/postman/postman-import.route.js";
import templateRoutes from "./modules/template/template.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://orchestrate-sage.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  }),
);

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
app.use("/api/templates", templateRoutes);

export default app;
