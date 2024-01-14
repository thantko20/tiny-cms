import express from "express";
import path from "node:path";
import { logger } from "./utils/logger";

const app = express();

app.use((req, res, next) => {
  logger.info(req.path, { context: "HTTP" });
  next();
});

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "react-client")));

app.get("*", async (_req, res) => {
  const filePath = path.join(__dirname, "react-client", "index.html");
  return res.sendFile(filePath);
});

app.listen(3000, () =>
  logger.info("Server running on port 3000", { context: "APP" })
);
