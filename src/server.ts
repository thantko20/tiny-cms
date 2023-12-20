import Fastify from "fastify";
import path from "path";
import fastifyStatic from "@fastify/static";
import { dbPlugin } from "./database/db.plugin";
import { errorHandler } from "./utils";
import apiRoutesPlugin from "./routes";
import { bootstrapDB } from "./database/bootstrapDB";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty"
    }
  }
});

fastify.register(dbPlugin);

fastify.register(apiRoutesPlugin, { prefix: "/api" });

// server the spa
fastify
  .register(fastifyStatic, {
    root: path.join(__dirname, "client/build"),
    wildcard: false
  })
  .get("/*", function (_request, reply) {
    reply.sendFile("index.html");
  });

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
