const CartController = require ("../controllers/cart.controller");
const {authenticate} = require("../config/jwt.config")

module.exports = (app)=>{
    app.post("/api/addToCart", CartController.createTour);
    app.get("/api/allCartTours",CartController.findAllToursInCart);
    app.get("/api/toursByUser/:username", authenticate, CartController.findAllToursByUser);
    app.get("/api/deleteCart", CartController.deleteCartforUser);
}