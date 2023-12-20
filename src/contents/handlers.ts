import { FastifyReply, FastifyRequest } from "fastify";
import { createContent } from "./service";

export async function createContentHandler(
  request: FastifyRequest<{ Body: Object; Params: { entityName: string } }>,
  reply: FastifyReply
) {
  const db = request.db;
  const { entityName } = request.params;
  await createContent(db, entityName, request.body);

  reply.status(201).send({ message: "Success!" });
}
