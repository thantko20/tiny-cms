import type { Database } from "../database";

interface Attribute {
  name: string;
  type: "string" | "int";
  constraints: {
    max: number | null;
    required: boolean | null;
  };
}

export const createNewEntity = async (
  db: Database,
  data: { name: string; attributes: Attribute[] }
) => {
  const { name, attributes } = data;
  await db.transaction(async (trx) => {
    const hasTable = await trx.schema.hasTable(name);
    if (hasTable) {
      throw new Error("Table already exists");
    }
    await trx.schema.createTable(name, function (table) {
      table.increments();

      attributes.forEach(({ name, type, constraints }) => {
        if (type === "string") {
          table.string(name, constraints.max || undefined);
          if (constraints.required) {
            table.string(name).notNullable();
          }
        } else if (type === "int") {
          table.integer(name).notNullable();
        }
      });
    });
    await trx.insert({ name, table_name: name }).into("entities");
  });

  return {
    data: `table \`${name}\` created`
  };
};
