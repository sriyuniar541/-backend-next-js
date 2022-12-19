const { response } = require('../middleware/common'); //untuk menghubungkan ke eror handling yang telah dibuat
const { create, findEmail, updateUser, getDataId,verification, getData } = require('../models/user') //untuk menguhungkan fungsion create dan findEmail
const bcrypt = require('bcryptjs');
const { v4: uuidv4, stringify } = require('uuid'); //membuat id unik
const { generateToken } = require('../helper/auth') //membuat token
const email = require('../middleware/email')
const Port = process.env.PORT
const Host = process.env.HOST



const UsersController = {
    insert: async (req, res, next) => {
        let { rows: [user_recipe] } = await findEmail(req.body.email)
        //mengecek email apakah sudah perna terdaftar/belum, jika sudah maka fail
        if (user_recipe) {
            return response(res, 404, false, 'email alredy user', 'register fail')
        }

        //create otp
        let digits = '0123456789'; 
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)]
        }
        //create pasword unik
        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password)


        //inputan saat register
        let data = {
            id: uuidv4(),
            name: req.body.name,
            password,
            email: req.body.email,
            phone_number: req.body.phone_number,
            otp

        }
        try {
            const result = await create(data)
            if (result) {
                console.log(result)
                
                const sendEmail = email(data.email, otp, `http://${Host}:${Port}/${email}/${otp}`,data.name)
                if (sendEmail == 'email not send!') {
                    return response(res, 404, false, null, 'register fail')
                }
                response(res, 200, true, { email: data.email }, 'register success please check your email to verif')
            }
        } catch (err) {
            console.log(err)
            response(res, 404, false, err.message, 'register fail')
        }
    },

    login: async (req, res, next) => {
        console.log('email:', req.body.email)
        console.log('password:', req.body.password)
        let { rows: [user_recipe] } = await findEmail(req.body.email)

        //mengecek jika bukan akun yang terdaftar saat register
        if (!user_recipe) {
            return response(res, 404, false, null, 'email not found')
        }
        //mengecek verifikasi jika 1 dan telah verif bisa login jika 0 maka tidak bisa login
        if (user_recipe.verif == 0) {
            return response(res, 404, false, null, 'email not verif')
        }


        const password = req.body.password
        const validation = bcrypt.compareSync(password, user_recipe.password)

        if (!validation) {
            return response(res, 404, false,null, 'wrong password')
        }
        delete user_recipe.password
        delete user_recipe.otp //agar tidak keambil
        delete user_recipe.verif

        let payload = {
            email: user_recipe.email

        }
        user_recipe.token = generateToken(payload)
        response(res, 200, true, user_recipe, 'login succes')
    },

    // email: async (req, res, next) => {
    //     try {
    //         const sendEmail = await email(req.params.email, 'kode OTP', 'http://localhost:4001/recipe')
    //         if (sendEmail) {
    //             response(res, 200, true, null, 'send email succes')
    //         }

    //     } catch (err) {
    //         response(res, 404, false, err.message, 'send email fail ')
    //     }
    // },

    update: async (req, res, next) => {

        try {
            let salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password)
            const Port = process.env.PORT
            const Host = process.env.HOST
            const photo = req.file.filename
            const uri = `http://${Host}:${Port}/img/${photo}`
            const id = parseInt(req.params.id)
            req.body.photo = uri
            console.log(req.body)
            console.log(req.params.id)

            const updateUsers = await updateUser(id, req.body)

            response(res, 200, true, updateUsers.rows, 'update users success')
        } catch (err) {
            response(res, 404, false, err.message, 'update users fail ')
        }
    },

    getDataDetail: async (req, res, next) => {
        try {
            const get = await getDataId(req.params.id)
            response(res, 200, true, get.rows, 'get users success')
        } catch (err) {
            response(res, 404, false, err, 'get users fail')
        }
    },

    getDataAll: async (req, res, next) => {
        try {
            const get = await getData()
            response(res, 200, true, get.rows, 'get users success')
        } catch (err) {
            response(res, 404, false, err, 'get users fail')
        }
    },

    otp: async (req, res, next) => {

        let { rows: [user_recipe] } = await findEmail(req.body.email)
        if (!user_recipe) {
            return response(res, 404, false,null, 'email not found')
        }
        if (user_recipe.otp == req.body.otp) {
            const result = await verification(req.body.email)
            return response(res, 200, true, result, 'email succes')
        }
        return response(res, 404, false,null, 'wrong otp please check your email')
    } 
}


exports.UsersController = UsersController 