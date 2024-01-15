import express from "express";
import { logger } from "./utils/logger";
import { setupApp } from "./setup-app";

const app = express();
setupApp(app);
app.listen(3000, () =>
  logger.info("Server running on port 3000", { context: "APP" })
);
