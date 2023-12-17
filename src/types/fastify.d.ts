import knex from "knex";

declare module "fastify" {
  interface FastifyInstance {
    db: knex.Knex;
  }
}
