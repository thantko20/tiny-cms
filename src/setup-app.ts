import express, { type Express } from "express";
import { Container } from "typedi";
import path from "node:path";
import { addCollectionSchema } from "./validations/collections";
import { validate } from "./middlewares/validator.middleware";
import { loadContainer } from "./load-container";
import { httpMiddlewareToken } from "./middlewares/http-logger.middleware";
import { createCollectionHandler } from "./modules/collections/collections-controller";
import { spaHandler } from "./spa-handler";

export const setupApp = async (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  loadContainer();

  app.use(Container.get(httpMiddlewareToken));

  app.use("/public", express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, "react-client")));

  app.get("/api", function (_req, res) {
    res.send("Hello from tiny-cms api");
  });

  app.post(
    "/api/collections",
    validate({ body: addCollectionSchema }),
    createCollectionHandler
  );

  app.get("*", spaHandler);
};
