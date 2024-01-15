import express, { type Express } from "express";
import path from "node:path";
import { logger } from "./utils/logger";

export const setupApp = (app: Express) => {
  app.use(function (req, res, next) {
    const start = Date.now();
    res.on("finish", function () {
      const end = Date.now();
      const ms = end - start;
      logger.info(`${req.method} ${req.path} - ${ms}ms`);
    });
    next();
  });

  app.use("/public", express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, "react-client")));

  app.get("/api", function (_req, res) {
    res.send("Hello from tiny-cms api");
  });

  app.get("*", async (_req, res, next) => {
    try {
      const filePath = path.join(__dirname, "react-client", "index.html");
      return res.sendFile(filePath);
    } catch (error) {
      next(error);
    }
  });
};
