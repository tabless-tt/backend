const db = require("../../database/dbConfig");

module.exports = {
  add,
  remove,
  update,
  getTabs,
  findById,
  findByUserId
};

function getTabs() {
  return db("tabs")
    .join("users", "tabs.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      "tabs.user_id",
      "tabs.title",
      "tabs.website",
      "tabs.catagory",
      "tabs.favicon",
      "tabs.description",
      "tabs.created_at",
      "tabs.updated_at"
    );
}

function add(tab) {
  return db("tabs")
    .insert(tab, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function findById(id) {
  return db("tabs")
    .where({ "tabs.user_id": id })
    .first()
    .join("users", "tabs.user_id", "=", "user.id")
    .select(
      { username: "users.username" },
      "tabs.user_id",
      "tabs.title",
      "tabs.website",
      "tabs.catagory",
      "tabs.favicon",
      "tabs.description",
      "tabs.created_at",
      "tabs.updated_at"
    );
}

function update(id, change) {
  return db("tabs")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count < 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db("tabs")
    .where({id})
    .del();
}

function findByUserId(user_id) {
  return db("tabs").where({ user_id });
}
