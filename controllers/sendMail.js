
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");

    async function sendMail(email, code) {
    let testAccount = await nodemailer.createTestAccount();
    // connect with the smtp
    let transporter = await nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.mailID,
            pass: process.env.mailPassword
        },
    });


    let info = await transporter.sendMail({
        from: process.env.mailID, // sender address
        to: email, // list of receivers
        subject: "Easy way provides you a better way to access day to day life services!", // Subject line
        text: "", // plain text body
        html: `<h2>Verification code is ${code}</h2>` // html body
    });

    if(info){
        return "Successfull";
    }
    else{
        return "Unsuccessfull";
    }  
};


module.exports = sendMail; 