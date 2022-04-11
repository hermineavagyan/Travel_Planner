const mongoose = require("mongoose");


const MessageSchema = new mongoose.Schema({
    content: {
        type:String
    },
    likes:{
        type: Number,
        default: 0
    },
    associatedCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },


}, {timestamps:true})

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;