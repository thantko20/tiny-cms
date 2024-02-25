import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tcms_collections", function (table) {
    table.increments("id");
    table.string("table_name", 255).unique().notNullable();
    table.string("api_name", 255).unique().notNullable();
    table.jsonb("fields").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tcms_collections");
}
