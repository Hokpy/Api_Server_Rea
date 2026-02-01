import { config } from "dotenv";
import express from "express";
import routerhealth from "./routes/health.routes";
import router from "./routes/todos.routes";

config();

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/health", routerhealth);
  app.use("/todos", router);

  app.use((req, res) => {
    res.status(404).json({ status: "Not found" });
  });

  app.use((err: unknown, req: express.Request, res: express.Response) => {
    if (err instanceof Error) {
      return res.status(500).json({
        status: "Internal Server Error",
        message: err.message,
      });
    } else if (typeof err == "string") {
      return res.status(500).json({
        status: "Internal Server Error",
        message: err,
      });
    } else {
      return res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
      });
    }
  });
  return app;
}

export default buildApp;
