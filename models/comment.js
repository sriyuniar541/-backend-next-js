const Pool =require ('../config/db')

const selectDataComment = (id) => {
    return Pool.query(`SELECT * FROM comment`);
}

const insertDataComment = (data) => {
    const {id,comment,user_recipe_id} = data;
    return Pool.query(`INSERT INTO comment(id,comment,user_recipe_id) VALUES (${id},'${comment}',${user_recipe_id})`);   
}
 

module.exports = {selectDataComment, insertDataComment}