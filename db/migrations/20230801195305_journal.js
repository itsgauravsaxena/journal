/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   //Create a table called "journal" with the following columns: id, title, content, author, created_at, updated_at
   return knex.schema.createTable("journal", (table) => {
    table.increments("id").primary(); //id column with auto-incrementing primary key
    table.string("title").notNullable(); //title column with type string
    table.text("content").notNullable(); //content column with type text
    table.string("author").notNullable(); //author column with type string
    table.timestamps(true, true); //created_at and updated_at columns with type timestamp
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("journal");
};
