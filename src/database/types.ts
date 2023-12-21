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

export type AttributeType = "string" | "integer";

export type AttributeConstraint = {
  maxLength: number;
  minLength: number;
  required: boolean;
  defaultValue: any;
  unique: boolean;
};

export type Attribute = {
  name: string;
  type: AttributeType;
  constraints: Partial<AttributeConstraint>;
};
