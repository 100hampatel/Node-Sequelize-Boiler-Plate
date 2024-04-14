const nodemailer = require("nodemailer")
const {
    SENDER_EMAIL,
    SENDER_PASSWORD,
    EMAIL_SERVICE
} = require("../../config/key")


const sendEmail = (email, emailBody, subject, filename) => {


    let mailOptions;
    let transport = nodemailer.createTransport({
        host: EMAIL_SERVICE,
        port: 587,
        // secure: true,
        // ignoreTLS: true,
        auth: {
            user: SENDER_EMAIL,
            pass: SENDER_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    mailOptions = {
        to: email,
        from: `Guau<${SENDER_EMAIL}>`,
        subject: subject,
        html: emailBody
    };
    // console.log(mailOptions)
    return new Promise((resolve, reject) => {
        transport.sendMail(mailOptions).then((result) => {
            console.log('result', result)
            resolve(true);
        }).catch(err => {
            console.log('err', err)
        })
    })
}


module.exports = {sendEmail}
