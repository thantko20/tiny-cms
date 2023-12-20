import { FastifyPluginCallback } from "fastify";
import contentRoutes from "./contents/routes";
import entityRoutes from "./entities/routes";

const routes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.register(contentRoutes, { prefix: "/contents" });
  fastify.register(entityRoutes, { prefix: "/entities" });
  done();
};

export default routes;
