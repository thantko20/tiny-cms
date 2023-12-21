import type { Attribute, Database } from "../database";
import { AppError } from "../utils";
import { createConstraints } from "./utils";

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

    // create the table for given entity name
    await trx.schema.createTable(name, function (table) {
      table.increments();

      attributes.forEach(({ name, type }) => {
        table[type](name).nullable();
      });
    });

    // alter the table to set the constraints
    await trx.schema.alterTable(name, function (table) {
      attributes.forEach(({ name, type, constraints }) => {
        const theConstraints = createConstraints(constraints);
        const { defaultValue, required, unique } = theConstraints;

        table[type](name).defaultTo(defaultValue).alter();
        if (required) {
          table[type](name).notNullable().alter();
        }

        if (unique) {
          table[type](name).unique().alter();
        }

        schema.columns.push({
          name,
          type,
          constraints: theConstraints
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

export const getEntitiesSchema = async (db: Database) => {
  const result = await db.select().from("entities");
  return result.map((e) => ({ ...e, schema: JSON.parse(e.schema) }));
};
