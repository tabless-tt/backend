const db = require("../../database/dbConfig");

module.exports = {
  add,
  remove,
  update,
  getTabs,
  findTabsBy,
  findByuserId
};

function getTabs() {
  return db("tabs");
}

async function add(tab) {
  const id = await db("tabs")
    .returning(id)
    .insert(tab);

  return id;
}

function findTabsBy(filter) {
  return db('tabs').where(filter)
}

function update(id, change) {
  return db('tabs')
}
