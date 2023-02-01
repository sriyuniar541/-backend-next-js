const Pool = require ('../config/db')


const selectDataRecipe = ({limit,offset,sort,sortby,search, page}) => {
    return Pool.query(`SELECT * FROM recipe ORDER BY recipe.${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}
const selectDataUser = ({limit,offset,sort,sortby,search, page,user_recipe}) => {
    return Pool.query(`SELECT recipe.id,recipe.title,recipe.ingredients,recipe.vidio,recipe.photo,recipe.description,user_recipe.id as user_recipe_id FROM recipe INNER JOIN user_recipe ON recipe.user_recipe_id = user_recipe.id WHERE user_recipe.id='${user_recipe}'`);
}
const selectDataRecipeDetail = (id) => {
    return Pool.query(`SELECT recipe.id,recipe.title,recipe.ingredients,recipe.vidio,recipe.photo,recipe.description FROM recipe WHERE recipe.id='${id}' `);  
}
const deleteRecipe = (id) => {
    return Pool.query(`DELETE FROM recipe  WHERE recipe.id='${id}'`);  
}

const insertDataRecipe = (data) => {
    const {id,title,ingredients,vidio,photo,description,user_recipe_id} = data;
    return new Promise((resolve, reject) => 
    Pool.query(`INSERT INTO recipe(id,title,ingredients,vidio,photo,description,user_recipe_id) VALUES('${id}','${title}','${ingredients}','${vidio}','${photo}','${description}','${user_recipe_id}')`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}


module.exports = {selectDataRecipe, selectDataRecipeDetail, insertDataRecipe, deleteRecipe,selectDataUser}