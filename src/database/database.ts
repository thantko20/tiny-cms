import { CollectionsManager } from "./create-collection-manager";

export abstract class Database<DB = any> {
  collectionsManager: CollectionsManager<DB>;
  connectionString: string;

  constructor(
    collectionsManager: CollectionsManager<DB>,
    connectionString: string,
    public connection: DB
  ) {
    this.collectionsManager = collectionsManager;
    this.connectionString = connectionString;
  }

  abstract setMetadata(data: any): Promise<void>;
}
