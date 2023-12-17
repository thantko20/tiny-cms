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

    const schema: {
      columns: any[];
    } = {
      columns: []
    };

    await trx.schema.createTable(name, function (table) {
      table.increments();

      attributes.forEach(({ name, type, constraints }) => {
        if (type === "string") {
          table.string(name, constraints.max || undefined);
        } else if (type === "int") {
          table.integer(name).notNullable();
        }
        schema.columns.push({
          name,
          type
        });
      });
    });
    await trx.insert({ name, table_name: name, schema }).into("entities");
  });

  return {
    data: `table \`${name}\` created`
  };
};
