const db = require("../../data/db-config")

async function getRecipeById(recipe_id) {
    const recipeRows = await db("recipes")
        .where("recipes.recipe_id", recipe_id)
        .leftJoin("steps", "recipes.recipe_id", "steps.recipe_id")
        .leftJoin("step_ingredients", "step_ingredients.step_id", "steps.step_id")
        .leftJoin("ingredients", "ingredients.ingredient_id", "step_ingredients.ingredient_id")
        .select(
            "recipes.recipe_id",
            "recipes.recipe_name",
            "steps.step_id",
            "steps.step_number",
            "steps.step_instructions",
            "ingredients.ingredient_id",
            "ingredients.ingredient_name",
            "step_ingredients.quantity")

    const recipes = {
        recipe_id: recipeRows[0].recipe_id,
        recipe_name: recipeRows[0].recipe_name,
        steps: recipeRows.reduce((acc, row) => {
            if (!row.ingredient_id){
                return acc.concat({
                    step_id: row.step_id,
                    step_number: row.step_number,
                    step_text: row.step_instructions, 
                })
            } 
            if (row.ingredient_id && !acc.find(step => step.step_id === row.step_id)){
                return acc.concat({
                    step_id: row.step_id,
                    step_number: row.step_number,
                    step_instructions: row.step_instructions,
                    ingredients: [{
                        ingredient_id: row.ingredient_id,
                        ingredient_name: row.ingredient_name,
                        quantity: row.quantity
                    }]
                })
            }
            const currentStep = acc.find(step => step.step_id === row.step_id)
            currentStep.ingredients.push({
                ingredient_id: row.ingredient_id,
                ingredient_name: row.ingredient_name,
                quantity: row.quantity
            })
            return acc;
        }, [])
    }
    return recipes;
}

module.exports = {
    getRecipeById
}