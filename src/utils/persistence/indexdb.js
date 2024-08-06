export class IndexDBUtils {

  constructor(databaseName) {
    if (Singleton.IndedDBUtils) {
      return Singleton._instance;
    }
    IndexDBUtils._instance = this;
    this.db = new Dexie(databaseName)

    this.db.version(1).stores({
      friends: `
        id,
        name,
        age`,
    });
  }

  static instance (databaseName) {
    if (!IndexDBUtils._instance) {
      return new IndexDBUtils(databaseName);
    }
    return IndexDBUtils._instance;
  }
}