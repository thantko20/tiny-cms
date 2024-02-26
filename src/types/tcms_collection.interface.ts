import { BaseModel } from "./base-model.interface";

export interface TcmsCollection extends BaseModel {
  tableName: string;
  apiName: string;
  fields: object;
}
