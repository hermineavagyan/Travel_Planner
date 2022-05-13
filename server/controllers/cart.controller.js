const Cart = require("../models/cart.model")
const User = require("../models/user.model")
const jwt = require('jsonwebtoken');

module.exports = {
    createTour: (req, res) => {
        const newTourObject = new Cart(req.body);
        const decodedJWT = jwt.decode(req.cookies. usertoken,{
            complete: true
        })
        newTourObject.user = decodedJWT.payload.id
        newTourObject
            .save()
            .then((newTour) => {
            res.json(newTour);
        })
        .catch((err) => {
            console.log('Something went wrong in createTour');
            res.status(400).json(err);
        });
    },

    findAllToursInCart: async (req, res) => {
        try{
            const allCartTours = await Cart.find()
            res.json(allCartProducts);
                }
            catch(err){
                console.log("Find All Cart tours failed");
                res.json({ message: "Something went wrong in findAllToursInCart", error: err })
            }
    },

    findAllToursByUser: async (req, res)=>{
        try {
            if(req.jwtpayload.username !== req.params.username){
                console.log("not the user");
            const userNotLoggedIn = await User.findOne({username: req.params.username})
            const allToursByUser = await Cart.find({createdBy: userNotLoggedIn._id})
                                    .populate("createdBy", "username")
            console.log(allToursByUser);
            res.json(allToursByUser);
        }
        else{
            console.log("current user")
            console.log("req.jwtpayload.id:", req.jwtpayload.id);
            const allToursFromLoggedInUser = await  Cart.find({ createdBy: req.jwtpayload.id })
            .populate("createdBy", "username")
            console.log(allToursFromLoggedInUser);
            res.json(allToursFromLoggedInUser);
    }
        } catch (err) {
            console.log(err);
                    res.status(400).json(err);
        }
        },
    
        deleteCartforUser: async (req, res) => { //note this deletes ALL documents (for all users) from the cart.
            try {
                const delCart = await Cart.deleteMany();
                res.json(delCart);
                console.log('Deleted Cart');
            } catch (err) {
                console.log("deleteCartforUser failed");
                    res.json({ message: "Something went wrong in deleteCartforUser", error: err })
            }
        },

}