/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const {UsersController}= require('../controller/user')
const {upload} = require('../middleware/upload')



router.post('/register',UsersController.insert)
router.post('/login',UsersController.login)
router.put('/update/:id',upload.single('photo'),UsersController.update)
router.get('/:id',UsersController.getDataDetail)
router.get('/',UsersController.getDataAll)
router.post('/email/:email/:otp',UsersController.otp)
router.post('/email/verif',UsersController.otp)



module.exports = router