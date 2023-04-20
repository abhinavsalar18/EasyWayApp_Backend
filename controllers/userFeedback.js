const asyncHandler = require("express-async-handler");
const userFeedback = require("../models/userFeedbackModel");
const dotenv = require("dotenv").config();

//@desc customer feedback
//@route POST /api/feedback
//@access public

const userFeedback_controller = asyncHandler ( async (req, res) => {
    const {name, email, rating, message} = req.body;

    if(!name || !email || !rating ){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const feedback = await userFeedback.create({
        name ,
        email,
        rating,
        user_message : message
    });

    console.log(`${feedback} \n Feedback recorded successfully!`);

    if(feedback){
        res.status(201).json({user_name : feedback.name, user_email : feedback.email, rating : feedback.rating, message : feedback.user_message});
    }
    else{
        res.status(400);
        throw new Error("Unable to record the feedback!");
    }
});

module.exports = userFeedback_controller;