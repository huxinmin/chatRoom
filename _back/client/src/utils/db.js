import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

const adapter = new LocalStorage("db");
const db = low(adapter);

db.defaults({ histories:[], chatsWith:{}, settings:{}, })
  .write();

module.exports = db;
