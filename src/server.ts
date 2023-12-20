import Fastify from "fastify";
import testRoute from "./testRoute";
import { dbPlugin } from "./database/db.plugin";
import { errorHandler } from "./utils";
import apiRoutesPlugin from "./routes";
import { bootstrapDB } from "./database/bootstrapDB";

const fastify = Fastify({
  logger: true
});

fastify.register(dbPlugin);

fastify.register(testRoute);

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.register(apiRoutesPlugin, { prefix: "/api" });

fastify.setErrorHandler(errorHandler);

fastify.listen({ port: 3000 }, async function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  const db = fastify.db;
  bootstrapDB(db);

  fastify.log.info(`Server is now listening on ${address}`);
});
