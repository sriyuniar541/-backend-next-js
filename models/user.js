const Pool = require("../config/db");


const create = (data) => {
    const {id,name,password,email,phone_number} = data
    return new Promise ((resolve,reject)=>
        Pool.query(`INSERT INTO user_recipe(id,name,password,email,phone_number) VALUES(${id},'${name}','${password}','${email}','${phone_number}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const findEmail = (email) => {
    return new Promise((resolve, reject) => 
    Pool.query(`SELECT * FROM user_recipe where email='${email}'`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}
const updateUser = (id,password,photo) => {
    return new Promise((resolve, reject) => 
    Pool.query(`UPDATE user_recipe SET password='${password}',photo='${photo}' WHERE id='${id}'`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}

const getDataId = (id) => {
    return new Promise((resolve, reject) => 
    Pool.query(`SELECT user_recipe.id,user_recipe.name,user_recipe.password,user_recipe.email,user_recipe.phone_number,user_recipe.photo FROM user_recipe WHERE user_recipe.id='${id}'`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}





module.exports = {create,findEmail,updateUser,getDataId}