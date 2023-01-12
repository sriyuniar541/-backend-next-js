const Pool =require ('../config/db')



const selectDataComment = (limit) => {
    return Pool.query(`SELECT comment.id,comment.comment, user_recipe.name as user_recipe, user_recipe.photo as user_recipe_photo,recipe.id as recipe_id FROM comment 
    INNER JOIN user_recipe ON comment.user_recipe_id = user_recipe.id
    INNER JOIN recipe ON comment.recipe_id = recipe.id`);
}
const selectDataCommentId = (limit,recipe_id) => {
    return Pool.query(`SELECT comment.id,comment.comment, user_recipe.name as user_recipe, user_recipe.photo as user_recipe_photo,recipe.id as recipe_id FROM comment 
    INNER JOIN user_recipe ON comment.user_recipe_id = user_recipe.id
    INNER JOIN recipe ON comment.recipe_id = recipe.id WHERE recipe_id = '${recipe_id}'`);
}
const insertDataComment = (data) => {
    const {id,user_recipe_id,comment,recipe_id} = data;
    return Pool.query(`INSERT INTO comment(id,user_recipe_id,comment,recipe_id) VALUES ('${id}','${user_recipe_id}','${comment}','${recipe_id}')`);  
}
 

module.exports = {selectDataComment, insertDataComment,selectDataCommentId}