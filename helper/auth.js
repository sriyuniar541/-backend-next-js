const jwt = require('jsonwebtoken') //untuk mengimpor jwt
let key = process.env.JWT_KEY //ambil dari env

const generateToken = (payload) => {
    const verifyOpts = {
        expiresIn : '7d'
    }
    const token = jwt.sign(payload,key,verifyOpts)
    return token
}


module.exports = {generateToken}