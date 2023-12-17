import { Database } from "../database";

export const createContent = async (
  db: Database,
  entityName: string,
  data: any
) => {
  const entity = await db
    .select()
    .from("entities")
    .where("name", entityName)
    .first();
  if (!entity) {
    throw new Error("Entity does not exist");
  }

  const rows = await db
    .insert({ ...data })
    .into(entityName)
    .returning("*");
  return rows[0];
};
