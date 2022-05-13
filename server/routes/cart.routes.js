const CartController = require ("../controllers/cart.controller");
const {authenticate} = require("../config/jwt.config")

module.exports = (app)=>{
    app.post("/api/addToCart", CartController.createTour);
    app.get("/apiAllCartTours",CartController.findAllToursInCart);
    app.get("/apiToursByUser/:username", authenticate, CartController.findAllToursByUser);
    app.get("/api/deleteCart", CartController.deleteCartforUser);
}