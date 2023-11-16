/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable("recipes", table => {
      table.increments("recipe_id")
      table.string("recipe_name").notNullable()
    })
    .createTable("steps", table => {
      table.increments("step_id")
      table.string("step_instructions").notNullable()
      table.integer("step_number")
      table.integer("recipe_id")
      .unsigned()
      .notNullable()
      .references("recipe_id")
      .inTable("recipes")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT")
    })
    .createTable("ingredients", table => {
      table.increments("ingredient_id")
      table.string("ingredient_name").notNullable()
      table.integer("quantity").notNullable()
    })
    .createTable("steps_ingredients", table => {
      table.increments("steps_ingredients")
      table.integer("quantity").notNullable()
      table.integer("step_id")
      .unsigned()
      .notNullable()
      .references("step_id")
      .inTable("steps")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT")
      table.integer("ingredient_id")
      .unsigned()
      .notNullable()
      .references("ingredient_id")
      .inTable("ingredients")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT")
    })
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema
  .dropTableIfExists("steps_ingredients")
  .dropTableIfExists("ingredients")
  .dropTableIfExists("steps")
  .dropTableIfExists("recipes")
};
