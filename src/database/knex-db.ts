import knex, { Knex } from "knex";
import { Token } from "typedi";

export const db = knex({
  client: "pg",
  connection: "postgres://postgres:password@localhost:5432/tinycms"
});

export type KnexDb = Knex;

export const dbToken = new Token<KnexDb>("Database");
