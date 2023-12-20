import { createEntityHandler } from "./handlers";
import { FastifyPluginCallback } from "fastify";

const routesPlugin: FastifyPluginCallback = function (fastify, _opts, done) {
  fastify.post("/", createEntityHandler);
  done();
};

export default routesPlugin;
