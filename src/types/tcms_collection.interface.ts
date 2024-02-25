import { BaseModel } from "./base-model.interface";

export interface TcmsCollections extends BaseModel {
  tableName: string;
  apiName: string;
  fields: object;
}
