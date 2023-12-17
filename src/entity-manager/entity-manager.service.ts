import type { Database } from "../database";

export const createNewEntity = async (
  db: Database,
  data: { name: string; attributes: Record<string, string> }
) => {
  const { name, attributes } = data;
  await db.transaction(async (trx) => {
    const hasTable = await trx.schema.hasTable(name);
    if (hasTable) {
      throw new Error("Table already exists");
    }
    await trx.schema.createTable(name, function (table) {
      table.increments();

      Object.entries(attributes).forEach(([attributeName, type]) => {
        if (type === "string") {
          table.string(attributeName);
        } else if (type === "int") {
          table.integer(attributeName);
        }
      });
    });
    await trx.insert({ name, table_name: name }).into("entities");
  });

  return {
    data: `table \`${name}\` created`
  };
};
