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
  } = {}) {
    this.#host = host;
    this.#port = port;
    this.#connectionOptions = connectionOptions;
  }

  initDb({
    name = '',
    models = [],
    host = '',
    port = '',
    connectionOptions = null,
  }) {
    if (this.dbs?.[name]?.connection) return;
    const db = new Db(name);
    this.#initConnection({ db, host, port, connectionOptions });
    this.#initModels({ db, models });
    this.dbs[name] = db;
  }

  #initConnection({ db, host, port, connectionOptions }) {
    if ((!host && !this.#host) || (!port && !this.#port)) return;
    db.connection = mongoose.createConnection(
      `mongodb://${host || this.#host}:${port || this.#port}/${db.name}`,
      connectionOptions || this.#connectionOptions
    );
  }

  #initModels({ db, models }) {
    if (models.length == 0) return;
    for (const i in models) {
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
