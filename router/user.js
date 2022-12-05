/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const {UsersController}= require('../controller/user')
const {upload} = require('../middleware/upload')



router.post('/register',UsersController.insert)
router.post('/login',UsersController.login)
router.put('/update/:id',upload.single('photo'),UsersController.update)
router.get('/:id',UsersController.getData)
router.get('/:email',UsersController.email)



module.exports = router