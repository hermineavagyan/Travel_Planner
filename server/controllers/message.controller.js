const Message = require('../models/message.model');
const City = require('../models/city.model');
const jwt = require ("jsonwebtoken")

module.exports = {

    findAllMessages: (req, res) => {
        Message.find()
            //.populate("associatedCity", "_id")
            .then((allMessages) => {
                console.log(allMessages);
                res.json(allMessages);
            })
            .catch((err) => {
                console.log("Find All Messages failed");
                res.json({ message: "Something went wrong in findAll", error: err })
            })
    },

    createNewMessage:  (req, res)=>{

            const newMessageObject = new Message(req.body)
            const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})

            newMessageObject.createdBy = decodedJWT.payload.id;
            newMessageObject.save()
            .then((messagePosted)=>{
                console.log(messagePosted);
                
                City.findOneAndUpdate({_id: req.params.id},
                    {
                        $addToSet: {messages: messagePosted._id}
                    },
                    {
                        new: true,
                        useFindAndModify: true
                    })
                    .populate("messages", "content _id")
                   //.populate("messages", "createdBy")
                    .then((cityToUpdate)=>{
                        console.log(cityToUpdate);
                        res.json(messagePosted)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    likeMessage: (req, res) => {
        Message.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .populate("associatedCity", "name country")
            .then((likeAdded) => {
                res.json(likeAdded)
            })
            .catch((err) => {
                res.status(400).json(err);
            })
    }

}