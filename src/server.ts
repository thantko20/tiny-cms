import Fastify from "fastify";
import testRoute from "./testRoute";
import { dbPlugin } from "./database/db.plugin";
import { createNewEntity } from "./entity-manager/entity-manager.service";
const fastify = Fastify({
  logger: true
});

fastify.register(dbPlugin);

fastify.register(testRoute);

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.post<{ Body: { name: string; attributes: Record<string, string> } }>(
  "/api/entity-manager",
  {
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" }
        }
      }
    }
  },
  async function (request, reply) {
    const db = this.db;
    const { name, attributes } = request.body;

    return createNewEntity(db, { name, attributes });
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
    });
  }

  fastify.log.info(`Server is now listening on ${address}`);
});
