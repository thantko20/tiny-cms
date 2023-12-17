import { Database } from "../database";

declare module "fastify" {
  interface FastifyInstance {
    db: Database;
  }
}
