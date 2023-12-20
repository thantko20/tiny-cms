import { FastifyPluginCallback } from "fastify";
import contentRoutes from "./contents/routes";
import entityRoutes from "./entities/routes";

const routes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.register(contentRoutes, { prefix: "/contents" });
  fastify.register(entityRoutes, { prefix: "/entities" });

  fastify.all("/*", function (_request, reply) {
    reply.status(404).send({ message: "Invalid endpoint" });
  });
  done();
};

export default routes;
