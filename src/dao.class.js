import mongoose from 'mongoose';
import Db from './db.class.js';

class Dao {

  #host = '';
  #port = '';
  #connectionOptions = {};

  dbs = {};

  constructor() {}

  config({
    host = 'localhost',
    port = '27017',
    connectionOptions = {},
  }) {
    this.#connectionOptions = connectionOptions;
    this.#host = host;
    this.#port = port;
  }

  async initDb({
    name = '',
    models = {}
  }) {
    if (this.dbs?.[name]?.connection) return;
    const db = new Db({ name });
    this.dbs[name] = db;
    this.#initConnection(db);
    this.#initModels(db, models);
  }

  #initConnection(db) {
    db.connection = mongoose.createConnection(
      `mongodb://${this.#host}:${this.#port}/${db.name}`,
      this.#connectionOptions
    );
  }

  #initModels(db, models) {
    for (let i in models) {
      const { name, schema } = models[i];
      db.models[name] = db.connection.model(name, schema);
    }
  }

  getDb(dbName) {
    return this.dbs[dbName];
  }

  getModel(dbName, modelName) {
    return this.dbs[dbName].models[modelName];
  }

}

export default new Dao();
