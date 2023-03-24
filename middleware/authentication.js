const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authentication = async (req,res,next) =>{
    
    try{
        console.log("User Auth");
        const token = req.cookies.access_token;

        if(!token) return res.status(401).json("No token found");

        const userVerify = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(userVerify._id);
        // const user = await User.findOne({_id:userVerify._id});
        console.log(userVerify);
        req.user = userVerify;
        next();
    }catch(error)
    {
        res.status(401);
        throw new Error("Invalid credentials!");
    }
    
}
   
module.exports = authentication;