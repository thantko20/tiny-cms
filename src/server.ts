import Fastify from "fastify";
import testRoute from "./testRoute";
import { dbPlugin } from "./database/db.plugin";
import { createNewEntity } from "./entity-manager/entity-manager.service";
import { createContent } from "./content-manager/content-manager.service";
const fastify = Fastify({
  logger: true
});

fastify.register(dbPlugin);

fastify.register(testRoute);

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.post<{ Body: { name: string; attributes: any } }>(
  "/api/entity-manager",
  async function (request, reply) {
    const db = fastify.db;
    const { name, attributes } = request.body;

    return createNewEntity(db, { name, attributes });
  }
);

fastify.post<{ Body: Object; Params: { entityName: string } }>(
  "/api/content-manager/:entityName",
  async (request, reply) => {
    const db = fastify.db;
    const { entityName } = request.params;
    return createContent(db, entityName, request.body);
  }
);

fastify.listen({ port: 3000 }, async function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  const db = fastify.db;

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

  db.metadata = {
    set: function (payload) {
      db.metadata._data = payload;
    },
    get: function (uid) {
      return (this._data as typeof tables).find((table) => table.name === uid)!;
    },
    _data: tables
  };

  console.log(db.metadata._data);

  fastify.log.info(`Server is now listening on ${address}`);
});
