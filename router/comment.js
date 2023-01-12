/* eslint-disable no-unused-vars */
const express = require('express')
const routerComment = express.Router()
const {CommentController} = require('../controller/comment')
const multer = require('multer')
const uploade = multer()
const {protect} = require ('../middleware/auth')


routerComment.get('/',CommentController.getComment)
routerComment.get('/:recipe_id',CommentController.getCommentId)
routerComment.post('/',protect,uploade.array(),CommentController.insert)


module.exports = routerComment