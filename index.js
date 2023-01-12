const express = require('express')
var bodyParser = require ('body-parser')
const morgan = require ('morgan');
const cors = require('cors');
require('dotenv').config(); 
const { response } = require('./middleware/common');
const helmet = require ('helmet')
const xss = require('xss-clean')
const multer = require('multer')
const app = express()
const port = process.env.PORT
const recipe = require('./router/recipe') 
const comment = require('./router/comment')
const users = require('./router/user')
const savedrecipe = require('./router/savedRecepi')
const likeRecipe = require('./router/likeRecipe')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'})) 
app.use(xss())


app.use('/likeRecipe',likeRecipe)
app.use('/savedrecipe',savedrecipe)
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