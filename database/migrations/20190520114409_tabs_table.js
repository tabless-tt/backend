exports.up = function(knex, Promise) {
  return knex.schema.createTable("tabs", tbl => {
    tbl.increments();

    tbl.string("title", 128).notNullable();

    tbl.string("website").notNullable();

    tbl.string("catagory", 128);

    tbl.string("favicon");

    tbl.text("description", 1000);

    tbl.timestamps(true, true);

    tbl
      .integer("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tabs");
};
