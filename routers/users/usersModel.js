const db = require("../../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
    return db('users').select('id','username','password')
}

function findBy(filter)
