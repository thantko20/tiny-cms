import { Knex } from "knex";

export interface Table {
  name: string;
  schema: Object;
  table_name: string;
}

export interface Database extends Knex {
  metadata: {
    get: (uid: string) => Table;
    _tables: Table[];
    set: (tables: Table[]) => void;
  };
}
