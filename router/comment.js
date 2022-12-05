/* eslint-disable no-unused-vars */
const express = require('express')
const routerComment = express.Router()
const {CommentController} = require('../controller/comment')

routerComment.get('/',CommentController.getComment)
routerComment.post('/',CommentController.insert)



module.exports = routerComment