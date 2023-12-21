import { createEntityHandler, getEntitiesSchemaHandler } from "./handlers";
import { FastifyPluginCallback } from "fastify";

const routesPlugin: FastifyPluginCallback = function (fastify, _opts, done) {
  fastify.get("/", getEntitiesSchemaHandler);
  fastify.post("/", createEntityHandler);
  done();
};

export default routesPlugin;
