const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    tourName: {
        type: String,
    },

    tourImage: {
        type: String,
    },

    tourPrice: {
        type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart