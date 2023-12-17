import knex from "knex";

interface ExtendedKnex extends knex.Knex {
  metadata: {
    get: (uid: string) => any;
    _data: Record<string, any>;
    set: (value: any) => void;
  };
}

declare module "fastify" {
  interface FastifyInstance {
    db: ExtendedKnex;
  }
}
