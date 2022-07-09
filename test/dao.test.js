import { expect } from 'chai';
import mongoose from 'mongoose';

import dao from '../src/dao.class.js';
import Db from '../src/db.class.js';

const testSchema = new mongoose.Schema({
  prop1: { type: String },
  prop2: { type: String }
});

describe('1. dao instance', () => {

  describe('1.1. dao.initDb with a custom config (multiple hosts)', () => {
    before(() => {
      dao.initDb({
        name: 'testdb1',
        host: 'localhost',
        port: '27017',
        connectionOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        models: [
          { name: 'Test1', schema: testSchema }
        ]
      });
    });
    it('1.1.1. Should create a database reference in the dao.dbs object', () => {
      expect(dao.dbs.testdb1).to.exist;
    });
    it('1.1.2. Should provide a model reference on the database object', () => {
      expect(dao.dbs.testdb1.models.Test1).to.exist;
    });
  });

  describe('1.2. dao.initDb with a default config (single host)', () => {
    before(() => {
      dao.config({
        host: 'localhost',
        port: '27017',
        connectionOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      });
      dao.initDb({
        name: 'testdb2',
        models: [
          { name: 'Test2', schema: testSchema }
        ]
      });
    });
    it('1.2.1. Should create a database reference in the dao.dbs object', () => {
      expect(dao.dbs.testdb2).to.exist;
    });
    it('1.2.2. Should provide a model reference on the database object', () => {
      expect(dao.dbs.testdb2.models.Test2).to.exist;
    });
  });

  describe('1.3. dao.getDb', () => {
    it('1.3.1. Should return a database', () => {
      expect(dao.getDb('testdb1')).to.be.an.instanceof(Db);
    });
  });

  describe('1.4. dao.getModel', () => {
    it('1.4.1. Should return a model', () => {
      expect(dao.getModel('testdb1', 'Test1')).to.exist;
    });
  });

  describe('1.5. dao.dbs.dbName.getModel', () => {
    it('1.5.1. Should return a model', () => {
      expect(dao.dbs.testdb1.getModel('Test1')).to.exist;
    });
  });

  after(() => process.exit());

});
