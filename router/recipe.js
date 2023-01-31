const express = require('express')
const routerRecipe = express.Router()
const {recipeController} = require('../controller/recipe')
const upload = require('../middleware/upload')
const {protect} = require ('../middleware/auth')
// const multer = require('multer')
// const uploade = multer()


routerRecipe.get('/',recipeController.getRecipe)
routerRecipe.get('/user',protect,recipeController.getRecipeUser)
routerRecipe.get('/:id',recipeController.getRecipeDetail)
routerRecipe.delete('/:id',protect,recipeController.delete)
// routerRecipe.post('/',protect,upload,recipeController.insert)
routerRecipe.post('/',protect,upload.single('photo'),recipeController.insert)

module.exports = routerRecipe 