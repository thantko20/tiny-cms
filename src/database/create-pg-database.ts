import knex, { Knex } from "knex";
import {
  CollectionRepository,
  CollectionsManager
} from "./create-collection-manager";
import { createDatabase } from "./create-database";
import { Database } from "./database";
import { logger } from "../utils/logger";

class PgCollectionRepository extends CollectionRepository<Knex> {
  async find() {
    return this.db.select().from(this.tableName);
  }

  async create(data: any) {
    return this.db.insert(data).into(this.tableName).returning("*");
  }

  async delete(id: number) {
    await this.db.delete().from(this.tableName).where({ id });
    return null;
  }

  async findById() {
    const [result] = await this.db.select().from(this.tableName);
    return result;
  }

  async updateById(id: number, data: any) {
    return this.db
      .update(data)
      .from(this.tableName)
      .where({ id })
      .returning("*");
  }
}

class PostgresCollectionsManager extends CollectionsManager<Knex> {
  async create({ displayName }: { displayName: string }) {
    await this.db.schema.createTable(displayName, function (table) {
      table.increments("id");
    });
  }

  getRepository(name: string): any {
    return new PgCollectionRepository(this.db, name);
  }
}

class PgDatabase extends Database<Knex> {
  // async setMetadata(data: any): Promise<void> {
  //   this.connection.
  // }
}

export const createPgDatabase = async (): Promise<Database<Knex>> => {
  const db = knex({
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "password",
      database: "tinycms"
    }
  });

  logger.info("Bootstrapping db", { context: "APP" });

  await bootstrapDB(db);

  const info = await db.select().from("_collections");

  return createDatabase({
    collectionsManager: new PostgresCollectionsManager(db, info)
  });
};

async function bootstrapDB(db: Knex) {
  const tables = [
    {
      name: "_collections",
      cb(table: Knex.CreateTableBuilder) {
        table.increments("id");

        table.string("displayName", 255);
        table.string("apiName", 255);
        table.string("apiNamePlural", 255);
        table.jsonb("attributes").defaultTo("[]");
      }
    }
  ];

  await db.transaction(async function (trx) {
    for (const t of tables) {
      const hasTable = await trx.schema.hasTable(t.name);
      if (!hasTable) {
        await trx.schema.createTable(t.name, t.cb);
      }
    }
  });
}
