const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');
const otpRecord = require('../models/otpVerification');


//@desc send mail
//@route POST /api/verification/sendMail
//@access public
const sendMail = async (req, res) => {
    const {email} = req.body;
   try{
    let testAccount = await nodemailer.createTestAccount();
    // connect with the smtp
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.mailID,
            pass: process.env.mailPassword
        },
    });
   
    // const otp = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false});
   
    
    // console.log(otp_record);
        const otp = parseInt(Math.random() * 9000 + 1000) + "";
        console.log(otp);
        const salt = bcrypt.genSaltSync(10);
        const hashedOtp = await bcrypt.hash(otp, salt);
    
    let info = await transporter.sendMail({
        from: process.env.mailID, // sender address
        to: email, // list of receivers
        subject: "Please verify your otp", // Subject line
        text: "", // plain text body
        html: `<h2>Verification code is ${otp.toString()}</h2>` // html body
    });
 
    if(info){
        const otp_record = await otpRecord.create({
            email,
            otp: hashedOtp
        });

        // console.log("below otpRecord", otp_record);
        if(!otp_record){
            console.log("Unable to create otpRecord");
            res.status(400).json({message: "unable to create record"});
        }
        res.status(200).json(info);
    }
   }
   catch(error){
    // res.status(400).json({message: error.message});
    res.status(400).json([{error: error}, {message: error.message}]);
   }  
};




//@desc verify otp send to email
//@route POST /api/verifivation/verifyOtp

const verifyOtp = async (req, res) => {
    // console.log("inside verifyOtp", req.body);
    try{
        const {email, otp} = req.body;
        // getting otp record
       const user = await otpRecord.findOne({ email });
        console.log(user.email);

        //verifying the otp
       if(user && (await bcrypt.compare(otp, user.otp))){
           console.log("user verified!");

           //deleting the otp record
           const deleteRecord = await otpRecord.findOneAndDelete({ email });
           if(!deleteRecord){
            res.status(400).json({message: "Unable to delete record"});
           }
           res.status(200).json({email: user.email});
       }
       else{
        res.status(403).json({message: "Invalid otp"});
       }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}; 

module.exports = {sendMail, verifyOtp};