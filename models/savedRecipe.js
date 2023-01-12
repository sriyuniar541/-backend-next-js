const Pool =require ('../config/db')

const selectData = (limit,user_recipe_id) => {
    return Pool.query(`SELECT savedRecipe.id,recipe.id as recipe_id,recipe.photo as recipe_photo,recipe.title as recipe_name,user_recipe.id as user_recipe_id FROM savedRecipe 
    INNER JOIN recipe ON savedRecipe.recipe_id = recipe.id
    INNER JOIN user_recipe ON savedRecipe.user_recipe_id = user_recipe.id WHERE savedrecipe.user_recipe_id='${user_recipe_id}'`);
}
const insertData = (data) => {
    const {id,recipe_id,user_recipe_id} = data;
    return Pool.query(`INSERT INTO savedrecipe(id,recipe_id,user_recipe_id) VALUES ('${id}','${recipe_id}','${user_recipe_id}')`);  
}
const deleteS = (id) => {
    return Pool.query(`DELETE FROM savedrecipe WHERE savedrecipe.id='${id}'`);  
}
 

module.exports = {selectData, insertData,deleteS}