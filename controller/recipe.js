/* eslint-disable no-unused-vars */
const { response } = require('../middleware/common');
const  ModelRecipe = require('../models/recipe')


const recipeController = {

    getRecipe : (req,res,next) => {
        const page = Number(req.query.page) || 1 
        const limit = Number(req.query.limit) || 10 
        const offset = (page - 1) * limit 
        const sortby = req.query.sortby || "title" 
        const sort = req.query.sort || "ASC"
        const search = req.query.search || '';
        
        ModelRecipe.selectDataRecipe({limit,offset,sort,sortby,search})
        .then(result => response(res,200,true,result.rows,'get data sukses'))
        .catch(err => response(res,401,false,err,'get data fail'))
    },

    getRecipeDetail : (req,res,next) => {
        ModelRecipe.selectDataRecipeDetail(req.params.id)
        .then(result => response(res,200,true,result.rows,'get data sukses'))
        .catch(err => response(res,401,false,err,'get data fail'))
    },

     insert : (req,res,next) => {

        const Port = process.env.PORT //env
        const Host = process.env.HOST //env
        const photo = req.file.filename //multer
        const uri = `http://${Host}:${Port}/img/${photo}`
        req.body.photo = uri
        req.body.title = req.body.title
        req.body.ingredients = req.body.ingredients
        req.body.vidio = req.body.vidio
        req.body.description = req.body.description
        req.body.comment_id = req.body.comment_id

        console.log(req.body.title)
        console.log(req.body.ingredients)
        console.log(req.body.vidio)
        console.log(req.body.photo)
        console.log(req.body.description)
        console.log(req.body.comment_id)
        
        ModelRecipe.insertDataRecipe(req.body)
        .then(result => response(res,200,true,result.rows,'insert data sukses'))
        .catch(err => response(res,401,false,err.message,'insert data fail'))
    },
}

//untuk mengexport produk contol
exports.recipeController = recipeController

