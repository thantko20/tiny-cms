import { CollectionsManager } from "./create-collection-manager";

export interface Metadata {
  collections: any[];
}

export abstract class Database<DB = any> {
  collectionsManager: CollectionsManager<DB>;
  connectionString: string;
  metadata: Metadata = {
    collections: []
  };

  constructor(
    collectionsManager: CollectionsManager<DB>,
    connectionString: string,
    public connection: DB
  ) {
    this.collectionsManager = collectionsManager;
    this.connectionString = connectionString;
  }

  abstract queryMetadata(data: any): Promise<Metadata>;
  abstract boostrapDB(): Promise<void>;
}
