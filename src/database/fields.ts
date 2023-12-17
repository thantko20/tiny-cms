export abstract class Field<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }

  abstract toDB(): any;

  abstract fromDB(): T;
}

export class Text extends Field<string> {
  toDB() {
    return this.value;
  }

  fromDB(): string {
    return this.value;
  }
}
