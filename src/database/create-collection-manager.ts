export abstract class CollectionsManager<DB> {
  constructor(readonly db: DB, readonly info: any) {}

  abstract getRepository(_name: string): CollectionRepository<DB>;

  abstract create(obj: { displayName: string }): Promise<any>;
}

export abstract class CollectionRepository<DB> {
  constructor(readonly db: DB, readonly tableName: string) {}

  abstract find(): Promise<any>;

  abstract findById(id: number): Promise<any>;

  abstract create(data: any): Promise<any>;

  abstract updateById(id: number, data: any): Promise<any>;

  abstract delete(id: number): Promise<any>;
}
