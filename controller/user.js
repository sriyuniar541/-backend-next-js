const { response } = require('../middleware/common'); 
const { create, findEmail, updateUser, getDataId,verification, getData } = require('../models/user') 
const bcrypt = require('bcryptjs');
const { v4: uuidv4, stringify } = require('uuid');
const { generateToken , generateRefreshToken} = require('../helper/auth')
const email = require('../middleware/email')
const Port = process.env.PORT
const Host = process.env.HOST



const UsersController = {
    insert: async (req, res, next) => {
        let { rows: [user_recipe] } = await findEmail(req.body.email)
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
                response(res, 200, true, { otp: data.otp }, 'register success please check your email to verif')
            }
        } catch (err) {
            console.log(err)
            response(res, 404, false, err.message, 'register fail')
        }
        // try {
        //     const result = await register(data);
        //     if (result) {
        //       let verifUrl = `http://${Host}:${Port}/tbl_employee/${req.body.email}/${otp}`;
        //       let text = `Hello ${req.body.fullname} \n Thank you for join us. Please confirm your email by clicking on the following link ${verifUrl}`;
        //       const subject = `${otp} is your otp`;
        //       let sendEmail = email(req.body.email, subject, text);
        //       if (sendEmail == 'email not sent!') {
        //         return response(res, 404, false, null, 'register fail');
        //       }
        //       response(
        //         res,
        //         200,
        //         true,
        //         { email: data.email },
        //         'register success please check your email'
        //       );
        //     }
        //   } catch (err) {
        //     response(res, 404, false, err, ' register fail');
        //   }
        // },
      
    },
    login: async (req, res, next) => {
        console.log('email:', req.body.email)
        console.log('password:', req.body.password)
        let { rows: [user_recipe] } = await findEmail(req.body.email)
        if (!user_recipe) {
            return response(res, 404, false, null, 'email not found')
        }
        if (user_recipe.verif == 0) {
            return response(res, 404, false, null, 'email not verif')
        }
        const password = req.body.password
        const validation = bcrypt.compareSync(password, user_recipe.password)
        if (!validation) {
            return response(res, 404, false,null, 'wrong password')
        }
        delete user_recipe.password
        delete user_recipe.otp 
        delete user_recipe.verif
        let payload = {
            id : user_recipe.id,
            email: user_recipe.email
        }
        let accessToken = generateToken(payload);
        let refToken = generateRefreshToken(payload);

        user_recipe.token = accessToken;
        user_recipe.refreshToken = refToken;
        response(res, 200, true, user_recipe, 'login success');
        // user_recipe.token = generateToken(payload)
        // response(res, 200, true, user_recipe, 'login succes')
    },

    update: async (req, res, next) => {
        try {
            let salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password)
            const Port = process.env.PORT
            const Host = process.env.HOST
            const photo = req.file.filename
            const uri = `http://${Host}:${Port}/img/${photo}`
            const id = (req.params.id)
            req.body.photo = uri
             console.log(req.body)
            // console.log(req.params.id)

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
    } ,

    // forgotPassword: async (req, res) => {
    //     const {
    //       rows: [tbl_employee],
    //     } = await findEmail(req.body.email);
    //     if (!tbl_employee) {
    //       return response(res, 404, false, null, ' email not found');
    //     }
    //     let payload = {
    //       email: req.body.email,
    //     };
    //     const token = generateToken(payload);
    
    //     let text = `Hello ${tbl_employee.fullname} \n please click link below to reset password http://localhost:8000/tbl_employee/resetPassword/${token}`;
    //     const subject = `Reset Password`;
    //     let sendEmail = email(req.body.email, subject, text);
    //     if (sendEmail == 'email not sent!') {
    //       return response(res, 404, false, null, 'email fail');
    //     }
    //     return response(res, 200, true, null, 'send email success');
    //   },
    
    //   resetPassword: async (req, res) => {
    //     const token = req.params.token;
    //     const decoded = decodeToken(token);
    //     const {
    //       rows: [tbl_employee],
    //     } = await findEmail(decoded.email);
    //     if (!tbl_employee) {
    //       return response(res, 404, false, null, ' token not found');
    //     }
    //     let password = bcrypt.hashSync(req.body.password);
    //     const result = await changePassword(decoded.email, password);
    //     return response(res, 200, true, result.body, ' change password success');
    //   },
    
}


exports.UsersController = UsersController 