import { FastifyPluginCallback } from "fastify";
import { knexPlugin } from "./knex.plugin";
import path from "path";

export const dbPlugin: FastifyPluginCallback = (fastify, _opts = {}, done) => {
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
