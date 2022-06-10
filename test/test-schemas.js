import mongoose from 'mongoose';

const testSchema1 = new mongoose.Schema({
  prop1: { type: String },
  prop2: { type: String }
}, {
  timestamps: true,
  versionKey: false
});
const testSchema2 = new mongoose.Schema({
  prop1: { type: String },
  prop2: { type: String }
}, {
  timestamps: true,
  versionKey: false
});
const testSchema3 = new mongoose.Schema({
  prop1: { type: String },
  prop2: { type: String }
}, {
  timestamps: true,
  versionKey: false
});

export {
  testSchema1,
  testSchema2,
  testSchema3
}
