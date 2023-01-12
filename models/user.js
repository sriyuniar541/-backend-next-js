const Pool = require("../config/db");


const create = (data) => {
    const {id,name,password,email,phone_number,otp} = data
    return new Promise ((resolve,reject)=>
        Pool.query(`INSERT INTO user_recipe(id,name,password,email,phone_number,verif,otp) VALUES('${id}','${name}','${password}','${email}','${phone_number}',0,'${otp}')`,(err,result)=>{
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
const verification = (email) => {
    return new Promise((resolve, reject) => 
    Pool.query(`UPDATE user_recipe SET verif=1 WHERE email ='${email}'`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}
const updateUser = (id,body) => {
    return new Promise((resolve, reject) => 
    Pool.query(`UPDATE user_recipe SET password='${body.password}',photo='${body.photo}' WHERE id='${id}'`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}

const getDataId = (id) => {
    return new Promise((resolve, reject) => 
    //Pool.query(`SELECT user_recipe.id,user_recipe.name,user_recipe.password,user_recipe.email,user_recipe.phone_number,user_recipe.photo FROM user_recipe WHERE user_recipe.id='${id}'`,(err,result)=>{
        Pool.query(`SELECT * FROM user_recipe  WHERE user_recipe.id='${id}'`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}

const getData = () => {
    return new Promise((resolve, reject) => 
    //Pool.query(`SELECT user_recipe.id,user_recipe.name,user_recipe.password,user_recipe.email,user_recipe.phone_number,user_recipe.photo FROM user_recipe WHERE user_recipe.id='${id}'`,(err,result)=>{
        Pool.query(`SELECT * FROM user_recipe`,(err,result)=>{
        if(!err){
            resolve(result)
        } else {
            reject(err)
        }
    }))
}

// const changePassword = (email, password) => {
//     return new Promise((resolve, reject) =>
//       Pool.query(
//         `UPDATE tbl_employee SET password='${password}' WHERE email='${email}'`,
//         (err, result) => {
//           if (!err) {
//             resolve(result);
//           } else {
//             reject(err);
//           }
//         }
//       )
//     );
//   };



module.exports = {create,findEmail,updateUser,getDataId,verification, getData}