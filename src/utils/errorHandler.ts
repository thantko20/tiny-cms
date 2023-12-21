import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./appError";

export const errorHandler = (
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  console.log(error);
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send(error.toObject());
  }

  return reply
    .status(500)
    .send(new AppError("Internal Server Error", 500).toObject());
};
