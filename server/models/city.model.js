const mongoose = require("mongoose");


const CitySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "A city's name is required!!!"],
        //maxlength and minlength are for Strings, max/min are for number types
        maxlength: [30, "The city name's length can be no more than 30 characters!"]
    },
    country: {
        type: String,
        required: [true, "A city's country is required!!!"],
    },
    funFact: {
        type: String,
        required: [true, "Tell us something interesting about this city!!!"],
    },

    // weather:{
    //     type: String,

    //     //required: [true, "A city's weather is required!!!"],
    //     enum:[
    //         "Windy",
    //         "Snowy",
    //         "Rainy",
    //         "Jungle",
    //         "Sunny"
            
    //     ]
    // },


    cityImage: { //this will be the url of image from internet
        type: String,
        //The messages from validators will be accessible after we set our
    //res.status(400).json(err) in our controller
        //required: [true, "Because pictures make it unforgettable!!!"]
    },

    petFriendly:{
        type: Boolean,
        //required:[true, "Need to know if this city's good for pets!!!"]
    },

    // yearBuilt:{
    //     type: Number,
    //     min:[50, "We dont like old cities"]
    // },
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