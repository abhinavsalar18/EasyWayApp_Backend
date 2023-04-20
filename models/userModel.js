const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plaese add a username!"],
    },

    email: {
        type : String,
        required : [true, "Please add the user email"],
        unique : [true, "Email address is already used!"],
    },
    
    phone: {
        type : String
    },
    
    address :{
        houseNumber: {
            type: String
        },
        street: {
            type: String
        },
        city: {
            type: String,
            required: [true, "Please add the city name"]
        },
        pincode:{
            type : String,
            required: [true, "Plaese add a pincode"]
        },
    },

    password: {
        type : String,
        required: [true, "Please add the user password!"],
    },
    
    imageURL : {
        type : String
    }

}, 
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("user", userSchema);