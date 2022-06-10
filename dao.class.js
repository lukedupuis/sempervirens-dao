import mongoose from 'mongoose';
import Db from './db.class.js';

class Dao {

  #connectionOptions = {};
  #host = '';
  #port = '';

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
    // await this.#initModels(db, models);
  }

  #initConnection(db) {
    db.connection =  mongoose.createConnection(
      `mongodb://${this.#host}:${this.#port}/${db.name}`,
      this.#connectionOptions
    );
  }

  async #initModels(db, models) {
    for (let i in models) {
      const { name, schema } = models[i];
      db.models[name] = db.connection.model(name, schema);
    }
  }

}

export default new Dao();
