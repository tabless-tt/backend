exports.up = function(knex, Promise) {
  return knex.schema.createTable("tabs", tbl => {
    tbl.increments();

    tbl.string("title", 128).notNullable();

    tbl.string("website").notNullable();

    tbl.string("category", 128);

    tbl.string("favicon");

    tbl.text("description", 1000);

    tbl.timestamps(true, true);

    tbl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();

      // tbl
      // .integer("user")
      // .references("username")
      // .inTable("users")
      // .onDelete("CASCADE")
      // .onUpdate("CASCADE");
  });


};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tabs");
};
