# Sempervirens DAO

A connection manager for MongoDB using Mongoose, it provides a simplified interface for creating connections to one or more MongoDB databases and accessing models.

![Tests badge](https://github.com/lukedupuis/sempervirens-dao/actions/workflows/main.yml/badge.svg?event=push) ![Version badge](https://img.shields.io/static/v1?label=Node&labelColor=30363c&message=16.x&color=blue) ![Version badge](https://img.shields.io/static/v1?label=MongoDB&labelColor=30363c&message=4.4&color=blue)

## Installation

`npm i @sempervirens/dao`

## Usage

### Install MongoDB

1.  Find your OS, download, install from [Install MongoDB](https://www.mongodb.com/docs/manual/installation/).
2.  (Optional) Include MongoDB Compass (free DB visualization) when installing MongoDB, or [Install MongoDB Compass](https://www.mongodb.com/try/download/compass) later.

### Create Mongoose Schemas

1.  Create a directory.
2.  Create [Mongoose schemas](https://mongoosejs.com/docs/guide.html#schemas) within the directory.

/app/src/schemas/test-schema.js
```
const testSchema = new mongoose.Schema({
  prop1: { type: String },
  prop2: { type: Number }
});
export default testSchema;
```

### Configure and Initialize

1. Import `@sempervirens/dao` into the app's entrypoint.
2. Import the schemas.
3. Call `dao.config`. `connectionOptions` are the [Mongoose connection options](https://mongoosejs.com/docs/connections.html#options).
4. Call `dao.initDb` for each database.

*Note 1: Only call `dao.config` once in one place, and only call `dao.initDb` in one place, for each database.*<br>
*Note 2: Multi-host connections are possible by passing `host`, `port`, and `connectionOptions` into `initDb` instead of `config`.*

/app/src/index.js
```
import dao from '@sempervirens/dao';
import testSchema from './schemas/testSchema.js';

// Call only once
dao.config({
  host: 'localhost',
  port: '27017',
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
});

// Call for each DB
dao.initDb({
  name: 'testdb1',
  models: [
    { name: 'Test1', schema: testSchema }
  ]
});

// Connect to a different host
dao.initDb({
  host: 'anotherhost',
  port: 'anotherport',
  connectionOptions: {},
  name: 'testdb2',
  models: [
    { name: 'Test2', schema: testSchema }
  ]
});

```

### Access Models

1. Import `@sempervirens/dao` where access to models is needed.
2. Call methods on `dao` and `dao` databases to access models
3. Call [Mongoose methods](https://mongoosejs.com/docs/models.html) on models.

/app/src/example.js
```
import dao from '@sempervirens/dao';

// Any async function (doesn't have to be anonymous self-calling)
(async function() {

  // Access using dao's getModel
  const Test1a = dao.getModel('testdb', 'Test1');
  const docsA = await Test1a.find();

  // Access using DB's getModel
  const db = dao.getDb('testdb');
  const Test1b = db.getModel('Test1');
  const docsB = await Test1b.find();

})();
```

### API

#### dao (Singleton instance)

| Prop  | Type | Params | Description
|-------|------|--------|------------
| `config` | Function | `{ host = 'localhost', port = '27017', connectionOptions = {} }` | Configures the `dao` object with `host`, `port`, and `connectionOptions`.
| `initDb` | Function | `{ name = '', models = [{ name = '', schemas = new mongoose.Schema() }] }` | Connects to a database, adds the database to `dao.dbs`, creates each model, and attaches each model to `dao.dbs.dbName.models`
| `dbs` | Object | n/a | A literal `key: value` object where `key` is the database name given in `initDb`, and `value` is a `Db` instance.
| `getDb` | Function | `dbName = ''` | Gets a database from the `dao.dbs` map. Equivalent to `dao.dbs.dbName`.
| `getModel` | Function | `dbName = '', modelName = ''` | Gets a model from the `dao.dbs.dbName.models` map. Equivalent to `dao.dbs.dbName.models.modelName`.

#### Db (class)

| Prop  | Type | Params | Description
|-------|------|--------|------------
| `name` | String | n/a | Name of the database.
| `connection` | Object | n/a | The Mongoose connection object.
| `models` | Object | n/a | A literal `key: value` object where `key` is the model name given in `initDb` and `value` is a Mongoose Model.
| `getModel` | Function | `modelName = ''` | Gets a model from the `db.models` map. Equivalent to `db.models.modelName`.
