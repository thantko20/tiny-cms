import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import knex from "knex";
import { Database } from "./types";

const plugin: FastifyPluginCallback<knex.Knex.Config> = async (
  fastify,
  options
) => {
  if (!fastify.db) {
    const db = knex({
      ...options
    }) as Database;

    db.metadata = {
      get(uid: string) {
        return this._tables.find((table) => table.table_name === uid)!;
      },
      set(tables) {
        this._tables = tables;
      },
      _tables: []
    };

    fastify.decorate("db", db);
    fastify.decorateRequest("db", db);
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
