const Pool =require ('../config/db')



const selectData = (limit,user_recipe_id) => {
    return Pool.query(`SELECT likeRecipe.id,recipe.id as recipe_id,recipe.photo as recipe_photo,recipe.title as recipe_name,user_recipe.id as user_recipe_id FROM likeRecipe 
    INNER JOIN recipe ON likeRecipe.recipe_id = recipe.id
    INNER JOIN user_recipe ON likeRecipe.user_recipe_id = user_recipe.id WHERE likerecipe.user_recipe_id='${user_recipe_id}'`);
}
const insertData = (data) => {
    const {id,recipe_id,user_recipe_id} = data;
    return Pool.query(`INSERT INTO likerecipe(id,recipe_id,user_recipe_id) VALUES ('${id}','${recipe_id}','${user_recipe_id}')`);  
}
const findIdRecipe = (recipe_id) => {
    Pool.query(`SELECT * FROM recipe_id where recipe_id='${recipe_id}'`)
}
const deleteS = (id) => {
    return Pool.query(`DELETE FROM likerecipe WHERE likerecipe.id='${id}'`);  
}
 

module.exports = {selectData, insertData,deleteS,findIdRecipe}