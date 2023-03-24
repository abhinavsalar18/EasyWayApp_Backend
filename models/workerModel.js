const mongoose = require("mongoose");

const workerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },

    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },

    phone :  {
        type: String,
        required: [true, "Please add a phone number"],
    },

    address : {
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
        type: String,
        required: [true, "Please provide a password"],
    },

    occupation: {
        type: String,
        required: [true, "Occupation is mandatory"],
    },

    serviceList: [{
        type: String,
    }],

    description:{
        type: String,
        required: [true, "Please provide a description about services"]
    },

    imageURL : {
        type : String
    }

});

module.exports = mongoose.model("workers", workerSchema);

