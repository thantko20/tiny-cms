import { CollectionsManager } from "./create-collection-manager";
import { Database } from "./database";

export type CreateDatabaseOpts = {
  collectionsManager: CollectionsManager;
};

export const createDatabase = (opts: CreateDatabaseOpts): Database => {
  return new Database(
    opts.collectionsManager,
    "postgres://root:password@localhost:5432/data"
  );
};
