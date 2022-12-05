const { response } = require('../middleware/common'); //untuk menghubungkan ke eror handling yang telah dibuat
const  {create,findEmail,updateUser,getDataId} = require('../models/user') //untuk menguhungkan fungsion create dan findEmail
const bcrypt = require('bcryptjs'); 
const { v4: uuidv4, stringify } =  require('uuid'); //membuat id unik
const {generateToken} = require ('../helper/auth') //membuat token
const {email} = require ('../middleware/auth')

const UsersController = { 
    insert:async (req,res,next) => {
        let {rows:[user_recipe]} = await findEmail(req.body.email)
        if(user_recipe){
            return response(res,404,false,'email alredy user','register fail') 
        }
        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password)
        let data = {
    
            // id : uuidv4(),
            id : req.body.id,
            name : req.body.name,
            password, //ini yg diupdate
            email : req.body.email,
            phone_number : req.body.phone_number
            //photo, //ini yg diupdate
            
        }
        try{
            const result = await create(data)
            if (result){
                console.log(result)
                response(res,200,true,true,'register succes') 
            }
        } catch (err){
            console.log(err)
            response(res,404,false,err,'register fail')
        }
    },
    
    login: async(req,res,next) => {
        console.log('email:',req.body.email)
        console.log('password:',req.body.password)
        let {rows:[user_recipe]} = await findEmail(req.body.email)
        if(!user_recipe){
            return response(res,404,false,null,'email not found')
        }
        const password = req.body.password
        const validation = bcrypt.compareSync(password,user_recipe.password)

        if(!validation){
            return response(res,404,false,'wrong password')
        }
        delete user_recipe.password
        let payload = {
            email:user_recipe.email
            
        }
        user_recipe.token = generateToken(payload)
        response(res,200,true,user_recipe,'login succes')
    },

    email : async (req,res,next) => {
        try{
            const sendEmail = await email(req.params.email,'sriyuniar86@gmail.com','kode OTP','http://localhost:4001/recipe')
            response(res,200,true,sendEmail,'send email succes')
        } catch (err) {
            response(res,404,false,'send email fail ')
        }
    },

    update : async (req,res,next) => {
         
        try{
            let salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password)
            const Port = process.env.PORT 
            const Host = process.env.HOST 
            const photo = req.file.filename 
            const uri = `http://${Host}:${Port}/img/${photo}`
            req.body.photo = uri
            console.log(req.body)
            
            const updateUsers = await updateUser(req.params.id,req.body)
            response(res,200,true,updateUsers.rows,'update users success')
        } catch (err) { 
            response(res,404,false,err.message,'update users fail ')
        }
    },

    getData : async (req,res,next) => { 
        try{
            const get = await getDataId(req.params.id)
            response(res,200,true,get.rows,'get users success')
        } catch (err) {
            response(res,404,false,err,'get users fail')
        }
    }

}

exports.UsersController = UsersController 