import app from "./app.js";
import { seedTemplates } from "./modules/template/template.seed.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await seedTemplates();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
