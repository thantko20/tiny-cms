import { Database } from "../database/database";
import { AddCollectionDto } from "../validations/collections";

export const createCollection = async (
  data: AddCollectionDto,
  db: Database
) => {
  await db.collectionsManager.create({ displayName: data.displayName });
};
