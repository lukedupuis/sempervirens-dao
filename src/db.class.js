class Db {

  name;
  connection = null;
  models = {};

  constructor({
    name = ''
  }) {
    this.name = name;
  }

  getModel(modelName) {
    return this.models[modelName];
  }

}

export default Db;
