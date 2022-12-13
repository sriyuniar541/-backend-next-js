const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type:'OAuth2',
        user:process.env.MAIL_USERNAME,
        password:process.env.MAIL_PASSWORD,
        clientId:process.env.OAUTH_CLIENTID,
        clientSecret:process.env.OAUTH_CLIENTID_SECRET,
        refresToken:process.env.OAUTH_REFRES_TOKEN
    }
});


module.exports = (email,subject,url,name) => {
        
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: email,
            subject:` ${subject} is your otp`,
            text: `hell ${name} \n Thank you for you join please confirm your email by cliking on the following link ${url}`
        };
        
        transporter.sendMail(mailOptions, function(err,data) {
         if(err) {
            console.log('email not send')
            console.log('error',err)
         } else {
            console.log('email sending successfully')
            return 'email sending successfully'
         }
    })
}



