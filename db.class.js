class Db {

  name;
  connection = null;
  models = {};

  constructor({
    name = ''
  }) {
    this.name = name;
  }

}

export default Db;
