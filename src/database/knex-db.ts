import knex, { Knex } from "knex";
import { Token } from "typedi";
import knexConfig from "./knex-config";

export const db = knex(knexConfig);

export type KnexDb = Knex;

export const dbToken = new Token<KnexDb>("Database");
