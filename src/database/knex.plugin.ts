import { FastifyInstance, FastifyPluginCallback } from "fastify";
import knex from "knex";

export const knexPlugin: FastifyPluginCallback<knex.Knex.Config> = async (
  fastify,
  options
) => {
  if (!fastify.db) {
    const db = knex(options);
    await db.raw(`create table if not exists entities (
      id int primary key,
      name varchar(255) not null,
      table_name varchar(255) not null
    )`);

    await db.raw("select 1 from entities");
    fastify.log.info("Database connection established");

    fastify.decorate("db", db);
    fastify.addHook("onClose", (fastify, done) => {
      if (fastify.db === db) {
        fastify.db.destroy(done);
      }
    });
  }
};
