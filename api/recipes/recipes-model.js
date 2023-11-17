const db = require("../../data/db-config")

async function getRecipeById(recipe_id){
    const recipeRows = await db("recipes")
    .where("recipes.recipe_id", recipe_id)
    .leftJoin("steps", "recipes.recipe_id", "steps.recipe_id")
    .leftJoin("step_ingredients", "step_ingredients.step_ingredient_id", "steps.step_id")
    .leftJoin("ingredients", "ingredients.ingredient_id", "steps.step_id")
    .select("recipes.recipe_id", "recipes.recipe_name", "steps.step_id", "steps.step_number", "steps.step_instructions", "ingredients.ingredient_id", "ingredients.ingredient_name", "step_ingredients.quantity")
    return recipeRows;
}

module.exports ={
    getRecipeById
}