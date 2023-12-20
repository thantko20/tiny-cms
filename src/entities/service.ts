import type { Attribute, Database } from "../database";
import { AppError } from "../utils";

export const createNewEntity = async (
  db: Database,
  data: { name: string; attributes: Attribute[] }
) => {
  const { name, attributes } = data;
  await db.transaction(async (trx) => {
    const hasTable = await trx.schema.hasTable(name);
    if (hasTable) {
      throw new AppError("Entity already exists", 400);
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
          table.string(name, constraints.max || undefined).nullable();
        } else if (type === "int") {
          table.integer(name).nullable();
        }
        schema.columns.push({
          name,
          type
        });
      });
    });
    await trx.insert({ name, table_name: name, schema }).into("entities");
    return;
  });

  return {
    data: `table \`${name}\` created`
  };
};
