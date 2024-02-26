import { Service } from "typedi";
import { AddCollectionDto } from "../../validations/collections";
import { KnexDb } from "../../database/knex-db";
import { generateNames } from "../../utils/generate-names";
import { TcmsCollection } from "../../types/tcms_collection.interface";

@Service()
export class CollectionsService {
  constructor(private readonly db: KnexDb) {}

  async createCollection(data: AddCollectionDto) {
    const { name, fields } = data;
    const { tableName, apiName } = generateNames(name);
    return this.db.transaction(async (trx) => {
      const hasTable = await trx.schema.hasTable(tableName);
      if (hasTable) throw new Error("bad bad");

      await trx.schema.createTable(tableName, function (table) {
        table.increments("id");
      });

      if (fields) {
        await trx.schema.alterTable(tableName, function (table) {
          fields.forEach((attribute) => {
            const { name, constraints, type } = attribute;
            table[type](name);
            if (constraints.default)
              table[type](name).defaultTo(constraints.default);

            if (constraints.length) table[type](name, constraints.length);

            if (!constraints.nullable) table[type](name).notNullable();
          });
        });
      }

      return trx
        .insert<TcmsCollection>({
          tableName,
          apiName,
          fields
        })
        .into("tcms_collections")
        .returning("*");
    });
  }
}
