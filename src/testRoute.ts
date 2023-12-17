import { FastifyInstance } from "fastify";

export default async function routes(fastify: FastifyInstance, opts: Object) {
  fastify.get("/test", async (request, reply) => {
    return { hello: "world" };
  });
}
