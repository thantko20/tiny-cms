import { Knex } from "knex";

export type Table = {
  name: string;
  schema: Object;
  table_name: string;
};

export type Database = Knex & {
  metadata: {
    get: (uid: string) => Table;
    _tables: Table[];
    set: (tables: Table[]) => void;
  };
};

export type AttributeType = "string" | "int";

export type AttributeContraint = {
  max: number;
  min: number;
  required: boolean;
  defaultValue: any;
};

export type Attribute = {
  name: string;
  type: AttributeType;
  constraints: Partial<AttributeContraint>;
};
