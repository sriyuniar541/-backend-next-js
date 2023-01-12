const { v4: uuidv4, stringify } = require('uuid');
const { response } = require('../middleware/common');
const  Modelsaved = require('../models/savedRecipe')



const SavedController = {    
    get : (req,res,next) => {
        const limit = Number(req.query.limit) || 5
        const user_recipe = req.payload.id
        Modelsaved.selectData(limit,user_recipe)
        .then(result => response(res,200,true,result.rows,'get data sukses dari saved'))
        .catch(err => response(res,401,false,err,'get data fail'))
    },
     insert :  (req,res,next) => {
        let data = {
            id : uuidv4(),
            recipe_id : req.body.recipe_id,
            user_recipe_id : req.body.user_recipe_id
        }

        Modelsaved.insertData(data)
        .then(result => response(res,200,true,result.rows,'insert data sukses'))
        .catch(err => response(res,401,false,err,'insert data fail'))
        console.log(data)
    },
    deleteS: (req,res,next) => {
        Modelsaved.deleteS(req.params.id)
        .then(result => response(res,200,true,result.rows,'delete data sukses'))
        .catch(err => response(res,401,false,err,'delete data fail'))
    },
}


exports.SavedController = SavedController

