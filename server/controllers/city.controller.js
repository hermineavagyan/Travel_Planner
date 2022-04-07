const City = require("../models/city.model");
const jwt = require ("jsonwebtoken")

    module.exports = {

        findAllCities: (req, res)=>{
            City.find({})
                .populate("createdBy", "username email")
                .then((allCities)=>{
                    console.log(allCities);
                    res.json(allCities)
                })
                .catch((err)=>{
                    console.log("Find all pets has failed!");
                    res.json({ message: "Something went wrong in findAllCities()", error: err })
                })
        },

        // createNewCity: (req, res)=>{
        //     City.create(req.body)
        //         .then((newCity)=>{
        //             console.log(newCity);
        //             res.json(newCity);
        //         })
        //         .catch((err)=>{
        //             console.log("Something went wrong in createNewCity()");
        //             res.status(400).json(err)
        //         })
        // },
        createNewCity: (req, res)=>{
            const newCityObject = new City(req.body)
            const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})

            newCityObject.createdBy = decodedJWT.payload.id;
            newCityObject.save()
    
                .then((newCity)=>{
                    console.log(newCity);
                    res.json(newCity);
                })
                .catch((err)=>{
                    console.log("Something went wrong in createNewCity()");
                    res.status(400).json(err)
                })
        },

        findOneCity: (req, res)=>{
            City.findOne({ _id: req.params.id })//the params id MUST MATCH how we write it in our routes!!!
                .then((oneCity)=>{
                    console.log(oneCity);
                    res.json(oneCity);
                })
                .catch((err)=>{
                    console.log("findOneCity() failed");
                    res.json({ message: "Something went wrong in findOneCity()", error: err })
                })
        },

        deleteOneCity: (req, res)=>{
            City.deleteOne({_id: req.params.id})
                .then((deletedCity)=>{
                    console.log(deletedCity);
                    res.json(deletedCity);
                })
                .catch((err)=>{
                    console.log("deleteOneCity() failed");
                    res.json({ message: "Something went wrong in deleteOneCity()", error: err })
                })
        },

        updateCity: (req, res)=>{
            City.findOneAndUpdate({_id: req.params.id},
                req.body,
                {new: true, runValidators: true}
                )
                .then((updatedCity)=>{
                    console.log(updatedCity)
                    res.json(updatedCity)
                })
                .catch((err)=>{
                    console.log("Something went wrong in updateCity()");
                    res.status(400).json(err) 
                })
        },
        findAllCitiesByUser: (req, res)=>{

            if(req.jwtpayload.username !== req.params.username){
                console.log("not the user");

                User.findOne({username: req.params.username})
                    .then((userNotLoggedIn)=>{
                        City.find({createdBy: userNotLoggedIn._id})
                            .populate("createdBy", "username")
                            .then((allCitiesFromUser)=>{
                                console.log(allCitiesFromUser);
                                res.json(allCitiesFromUser);
                            })
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(400).json(err);
                    })
            }

            else{
                console.log("current user")
                console.log("req.jwtpayload.id:", req.jwtpayload.id);
                City.find({ createdBy: req.jwtpayload.id })
                    .populate("createdBy", "username")
                    .then((allCitiesFromLoggedInUser) => {
                        console.log(allCitiesFromLoggedInUser);
                        res.json(allCitiesFromLoggedInUser);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            }

        }




    }
