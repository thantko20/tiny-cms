import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { knexPlugin } from "./knex.plugin";
import path from "path";

const plugin: FastifyPluginCallback = (fastify, _opts = {}, done) => {
  const dbPath = path.resolve(__dirname, "..", "..", ".tmp", "data.db");
  fastify.register(knexPlugin, {
    client: "better-sqlite3",
    connection: {
      filename: dbPath
    },
    useNullAsDefault: true
  });
  done();
};

export const dbPlugin = fp(plugin, { name: "db" });
