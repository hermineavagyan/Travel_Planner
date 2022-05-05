const City = require("../models/city.model");
const jwt = require ("jsonwebtoken")

    module.exports = {
        
        findAllCities: async (req, res)=>{
            try {
                const allCities =  await City.find({})
                .populate("createdBy", "username email")
                .populate("messages", "content likes _id")
                res.json(allCities)
            } catch (err) {
                console.log("Find all pets has failed!");
                res.json({ message: "Something went wrong in findAllCities()", error: err })
                }   
            },
        createNewCity: async (req, res)=>{
            try {
                const newCityObject = new City(req.body)
                const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})
                newCityObject.createdBy = decodedJWT.payload.id;
                const newCity = await newCityObject.save()
                console.log(newCity);
                res.json(newCity);
            } catch (err) {
                console.log("Something went wrong in createNewCity()");
                res.status(400).json(err)
            }
        },

        findOneCity: async (req, res)=>{
            try {
                const oneCity =  await City.findOne({ _id: req.params.id })//the params id MUST MATCH how we write it in our routes!!!
                //.populate("messages", "content likes")
                .populate({
                    path: "messages",
                        populate: {
                        path: "createdBy",
                        select: 'username'
                        }
                })
                console.log(oneCity);
                res.json(oneCity);
            } catch (err) {
                console.log("findOneCity() failed");
                res.json({ message: "Something went wrong in findOneCity()", error: err })
                }
            },


        deleteOneCity: async (req, res)=>{
            try {
                const deletedCity = await City.deleteOne({_id: req.params.id})
                console.log(deletedCity);
                res.json(deletedCity);
            } catch (err) {
                console.log("deleteOneCity() failed");
                res.json({ message: "Something went wrong in deleteOneCity()", error: err })
                }
        },

        updateCity: async (req, res)=>{
            try {
                const updatedCity = await City.findOneAndUpdate({_id: req.params.id},
                    req.body,
                    {new: true, runValidators: true}
                    )
                console.log(updatedCity)
                res.json(updatedCity)
            } catch (err) {
                console.log("Something went wrong in updateCity()");
                res.status(400).json(err) 
            }
        },

        findAllCitiesByUser: async (req, res)=>{
            try {
                if(req.jwtpayload.username !== req.params.username){
                    console.log("not the user");
                const userNotLoggedIn = await User.findOne({username: req.params.username})
                const allCitiesFromUser = await City.find({createdBy: userNotLoggedIn._id})
                                        .populate("createdBy", "username")
                console.log(allCitiesFromUser);
                res.json(allCitiesFromUser);
            }
            else{
                console.log("current user")
                console.log("req.jwtpayload.id:", req.jwtpayload.id);
                const allCitiesFromLoggedInUser = await  City.find({ createdBy: req.jwtpayload.id })
                .populate("createdBy", "username")
                console.log(allCitiesFromLoggedInUser);
                res.json(allCitiesFromLoggedInUser);
        }
            } catch (err) {
                console.log(err);
                        res.status(400).json(err);
            }
            }

        // findAllCitiesByUser: (req, res)=>{

        //     if(req.jwtpayload.username !== req.params.username){
        //         console.log("not the user");

        //         User.findOne({username: req.params.username})
        //             .then((userNotLoggedIn)=>{
        //                 City.find({createdBy: userNotLoggedIn._id})
        //                     .populate("createdBy", "username")
        //                     .then((allCitiesFromUser)=>{
        //                         console.log(allCitiesFromUser);
        //                         res.json(allCitiesFromUser);
        //                     })
        //             })
        //             .catch((err)=>{
        //                 console.log(err);
        //                 res.status(400).json(err);
        //             })
        //     }

        //     else{
        //         console.log("current user")
        //         console.log("req.jwtpayload.id:", req.jwtpayload.id);
        //         City.find({ createdBy: req.jwtpayload.id })
        //             .populate("createdBy", "username")
        //             .then((allCitiesFromLoggedInUser) => {
        //                 console.log(allCitiesFromLoggedInUser);
        //                 res.json(allCitiesFromLoggedInUser);
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //                 res.status(400).json(err);
        //             })
        //     }

        // },
        // likeCity: (req, res) => {
        //     City.findOneAndUpdate({ _id: req.params.id },
        //         req.body,
        //         { new: true, runValidators: true }
        //     )
        //         .populate("createdBy", "username")
        //         .then((likeAdded) => {
        //             res.json(likeAdded)
        //         })
        //         .catch((err) => {
        //             res.status(400).json(err);
        //         })
        // }




    }
