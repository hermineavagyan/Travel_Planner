const User  = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res)=>{
        try {
            const user = new User(req.body)
            const newUser = await user.save()
            console.log(newUser);
            console.log("Successfully Registered!")
            res.json({
                successMessage: "Thank you for registering",
                user: newUser 
            })
        } catch (err) {
            console.log("Registration not successful!")
            res.status(400).json(err)
        }
    },

    login: async (req, res)=>{
        try {
            const userRecord = await User.findOne({email: req.body.email})
            if(userRecord === null){
                res.status(400).json({message: "Invalid Login Attempt"})
            }
            else {
                isPasswordValid = await bcrypt.compare(req.body.password, userRecord.password)
                    if(isPasswordValid){
                        console.log("password is valid");
                        res.cookie(
                            "usertoken",
                            jwt.sign(
                                {
                                    //payload is the data we want to save/use
                                    id: userRecord._id,
                                    email: userRecord.email,
                                    username: userRecord.username
                                },
                                process.env.JWT_SECRET
                            ),
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 9000000)
                                }
                        ).json({
                            message: "Succesfully",
                            userLoggedIn: userRecord.username,
                            userId: userRecord._id
                        });
                    }
                    else{
                        res.status(400).json({message: "Invalid Attempt"})
                    }
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Invalid Attempt" });
        }
    },


    logout: (req, res) => {
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out!",
        });
    },

    getLoggedInUser: async (req, res)=>{
        try {
            const user =  await User.findOne({_id: req.jwtpayload.id})
            console.log(user);
            res.json(user)
        } catch (err) {
            console.log(err);
        }
    },

    findOneUser: async (req, res)=>{
        try {
            const oneUser =  await User.findOne({ _id: req.params.id })//the params id MUST MATCH how we write it in our routes!!!
            //.populate("messages", "content likes")
            console.log(oneUser);
            res.json(oneUser);
        } catch (err) {
            console.log("findOneUser() failed");
            res.json({ message: "Something went wrong in findOneUser()", error: err })
            }
        },

    findAllUsers: async (req, res) => {
        try {
            const allUsers =  await User.find()
            console.log(allUsers)
            res.json(allUsers);
        } catch (err) {
            console.log("Find All Users failed");
            res.json({ message: "Something went wrong in findAll", error: err })
        }
    },


    deleteOneUser: (req, res)=>{
        User.deleteOne({_id: req.params.id})
            .then((deletedUser)=>{
                console.log(deletedUser);
                res.json(deletedUser);
            })
            .catch((err)=>{
                console.log("deleteOneUser() failed");
                res.json({ message: "Something went wrong in deleteOneUser()", error: err })
            })
    },
    updateUser: async (req, res) => {
        try {
            const update = await User.findOneAndUpdate({_id: req.params.id},
                req.body,
                {new: true, runValidators: true}
                )
            res.json(update)
        } catch (err) {
            console.log("Something went wrong in updateUser")
            res.status(400).json({message: "Something went wrong in update", error: err})
        }
    },

}