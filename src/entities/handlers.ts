import { FastifyReply, FastifyRequest } from "fastify";
import { createNewEntity } from "./service";
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
