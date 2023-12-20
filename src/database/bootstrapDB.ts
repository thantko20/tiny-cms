import { Database } from "./types";

export const bootstrapDB = async (db: Database) => {
  const hasEntitiesTable = await db.schema.hasTable("entities");

  if (!hasEntitiesTable) {
    await db.schema.createTable("entities", function (table) {
      table.increments();
      table.string("name").notNullable();
      table.string("table_name").notNullable();
      table.json("schema").notNullable();
    });
  }

  let tables = await db
    .select<
      { id: number; name: string; table_name: string; schema: string }[]
    >()
    .from("entities");

  tables = tables.map((table) => ({
    ...table,
    schema: JSON.parse(table.schema)
  }));

  db.metadata.set(tables);
};
