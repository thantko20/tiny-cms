import { FastifyReply, FastifyRequest } from "fastify";
import { createNewEntity, getEntitiesSchema } from "./service";
import { Attribute } from "../database";

export const createEntityHandler = async (
  request: FastifyRequest<{ Body: { name: string; attributes: Attribute[] } }>,
  reply: FastifyReply
) => {
  const db = request.db;
  const { name, attributes } = request.body;

  await createNewEntity(db, { name, attributes });
  reply.status(201).send({ message: "Success!" });
};

export const getEntitiesSchemaHandler = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
  return await getEntitiesSchema(request.db);
};
