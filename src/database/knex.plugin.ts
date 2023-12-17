import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import knex from "knex";

const plugin: FastifyPluginCallback<knex.Knex.Config> = async (
  fastify,
  options
) => {
  if (!fastify.db) {
    const db = knex(options);

    fastify.decorate("db", db);
    fastify.addHook("onClose", (fastify, done) => {
      if (fastify.db === db) {
        fastify.db.destroy(done);
      }
    });
  }
};

export const knexPlugin = fp(plugin, {
  name: "knex"
});
