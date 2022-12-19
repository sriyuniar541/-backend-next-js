/* eslint-disable no-unused-vars */
const express = require('express')
const routerRecipe = express.Router()
const {recipeController} = require('../controller/recipe')
const {upload} = require('../middleware/upload')
const {protect} = require ('../middleware/auth')

routerRecipe.get('/',recipeController.getRecipe)
routerRecipe.get('/:id',recipeController.getRecipeDetail)
routerRecipe.delete('/:id',recipeController.delete)
routerRecipe.post('/',upload.single('photo'),recipeController.insert)



module.exports = routerRecipe