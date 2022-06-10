import { expect } from 'chai';

import dao from '../dao.class.js';
import { testSchema1, testSchema2, testSchema3 } from './test-schemas.js';

// Schemas


// Tests

describe('"dao" instance', () => {
  it('Should be an instance of "Dao"', async () => {

    // DB config

    // dao.config({
    //   host: 'localhost',
    //   port: '27017',
    //   connectionOptions: {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    //   }
    // });

    // Init DBs

    // await dao.initDb({
    //   name: 'testdb1',
    //   models: [
    //     { name: 'Test1', schema: testSchema1 }
    //   ]
    // });

    // await dao.initDb({
    //   dbName: 'testdb2',
    //   schemas: [
    //     { modelName: 'Test2', schema: testSchema2 },
    //     { modelName: 'Test3', schema: testSchema2 }
    //   ]
    // });

    console.log(dao.dbs.testdb1);

    expect(true).to.be.true;
  });
});
