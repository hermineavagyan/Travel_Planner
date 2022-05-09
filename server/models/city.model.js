const mongoose = require("mongoose");


const CitySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "A city's name is required!!!"],
        //maxlength and minlength are for Strings, max/min are for number types
        minlength: [3, "The city name should be at least 3 characters"],
        maxlength: [30, "The city name's length can be no more than 30 characters!"]
    },
    country: {
        type: String,
        required: [true, "A city's country is required!!!"],
    },
    price: {
        type:String
    },
    funFact: {
        type: String,
        required: [true, "Tell us something interesting about this city!!!"],
    },
    cityInfo: {
        type: String,
        required: [true, "Give some info about this city!!!"],
    },

    cityImage: { //this will be the url of image from internet
        type: String,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    messages : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]

}, {timestamps:true})

const City = mongoose.model("City", CitySchema);

module.exports = City;