import { Service } from "typedi";
import { AddCollectionDto } from "../../validations/collections";
import { KnexDb } from "../../database/knex-db";

@Service()
export class CollectionsService {
  constructor(private readonly db: KnexDb) {}

  async createCollection(data: AddCollectionDto) {
    const { displayName, attributes } = data;
    return this.db.transaction(async (trx) => {
      const hasTable = await trx.schema.hasTable(displayName);
      if (hasTable) throw new Error("bad bad");

      await trx.schema.createTable(displayName, function (table) {
        table.increments("id");
      });

      if (attributes) {
        await trx.schema.alterTable(displayName, function (table) {
          attributes.forEach((attribute) => {
            const { name, constraints, type } = attribute;
            table[type](name);
            if (constraints.default)
              table[type](name).defaultTo(constraints.default);

            if (constraints.length) table[type](name, constraints.length);

            if (!constraints.nullable) table[type](name).notNullable();
          });
        });
      }

      return trx.insert(data).into("tcms_collections").returning("*");
    });
  }
}
