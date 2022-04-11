const MessageController = require("../controllers/message.controller");
const {authenticate} = require("../config/jwt.config")


module.exports = (app) => {

    app.get("/api/messages", MessageController.findAllMessages);
    app.post("/api/messages/:id", authenticate, MessageController.createNewMessage);
    app.put("/api/messages/:id", MessageController.likeMessage);

}

