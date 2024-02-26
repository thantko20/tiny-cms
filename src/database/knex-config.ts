import { Knex } from "knex";
import path from "path";

export default {
  client: "better-sqlite3",
  connection: {
    filename: path.join(process.cwd(), "data", "db.sqlite3")
  },
  migrations: {
    directory: "./src/database/migrations"
  },
  useNullAsDefault: true
} satisfies Knex.Config;
