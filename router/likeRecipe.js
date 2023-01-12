/* eslint-disable no-unused-vars */
const express = require('express')
const routerLiked = express.Router()
const {LikeController} = require('../controller/likerecipe')
const multer = require('multer')
const uploade = multer()
const {protect} = require ('../middleware/auth')


routerLiked.get('/',protect,LikeController.get)
routerLiked.delete('/:id',protect,LikeController.deleteS)
routerLiked.post('/',protect,uploade.array(),LikeController.insert)

module.exports = routerLiked