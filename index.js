const express = require('express')
var bodyParser = require ('body-parser')
const morgan = require ('morgan');
const cors = require('cors');
require('dotenv').config(); //untuk mengimpor env
const { response } = require('./middleware/common');
const helmet = require ('helmet')
const xss = require('xss-clean')
const multer = require('multer')
const app = express()
const port = process.env.PORT
const recipe = require('./router/recipe') //api recipe
const comment = require('./router/comment') //api recipe
const users = require('./router/user')


app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'})) //untuk m
app.use(xss())



app.use('/recipe',recipe)
app.use('/comment',comment)
app.use('/img',express.static('./upload'))
app.use('/users',users)


app.all('*', (req,res,next)=>{
    response(res,401,false,'401 page not found')
})

app.listen(port,()=>{
    console.log(`berhasil pada port ${port}`)
})