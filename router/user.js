const express = require('express')
const router = express.Router()
const {UsersController}= require('../controller/user')
const upload = require('../middleware/upload')
const multer = require('multer')
const uploade = multer()
const {protect} = require('../middleware/auth')


router.post('/register',uploade.array(),UsersController.insert)
router.post('/login',uploade.array(),UsersController.login)
router.put('/update/:id',protect,upload.single('photo'),UsersController.update)
router.get('/:id',UsersController.getDataDetail)
router.get('/',UsersController.getDataAll)
router.post('/email/:email/:otp',UsersController.otp)
router.post('/email/verif',uploade.array(),UsersController.otp)


module.exports = router