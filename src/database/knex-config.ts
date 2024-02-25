import { Knex } from "knex";
import camelCase from "camelcase";

export default {
  client: "better-sqlite3",
  connection: {
    filename: "/data/db.sqlite3"
  },
  migrations: {
    directory: "./src/database/migrations"
  },
  wrapIdentifier(value, origImpl, _queryContext) {
    return origImpl(camelCase(value));
  }
} satisfies Knex.Config;
