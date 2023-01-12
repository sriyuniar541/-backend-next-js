/* eslint-disable no-unused-vars */
const express = require('express')
const routerSaved = express.Router()
const {SavedController} = require('../controller/savedRecipe')
const multer = require('multer')
const uploade = multer()
const {protect} = require ('../middleware/auth')

routerSaved.get('/',protect,SavedController.get)
routerSaved.delete('/:id',protect,SavedController.deleteS)
routerSaved.post('/',protect,uploade.array(),SavedController.insert)


module.exports = routerSaved