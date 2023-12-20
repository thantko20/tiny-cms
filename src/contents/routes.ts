import { createContentHandler } from "./handlers";
import { FastifyPluginCallback } from "fastify";

const routesPlugin: FastifyPluginCallback = function (fastify, _opts, done) {
  fastify.post("/:entityName", createContentHandler);
  done();
};

export default routesPlugin;
