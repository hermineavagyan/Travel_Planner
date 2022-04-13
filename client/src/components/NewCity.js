//axios, useEffect, useState, Link
import React, {useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";

const NewCity = (props) => {

    //single state object
    const [newCity, setNewCity] = useState({
        name: "",
        country: "",
        funFact: "",
        cityImage: "",
        petFriendly: false
        // messages: {},
        // createdBy: {}
    },
   
    )

    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const newSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/cities",newCity,
        {withCredentials: true}
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/home");
        })
        .catch((err)=>{
            console.log(err)
            console.log("err.response:", err.response);
            console.log("err.response.data:", err.response.data);
            console.log("err.response.data.errors:", err.response.data.errors);
            setErrors(err.response.data.errors);
        })
    }
    const onChangeHandler = (e) => {
        const newStateObject = {...newCity};

        if (e.target.name === "petFriendly"){
            newStateObject[e.target.name] = e.target.checked;
            console.log("e.target.name = ", e.target.name);
            console.log("e.target.checked = ", e.target.checked);
            setNewCity(newStateObject)
        }
        else {
            newStateObject[e.target.name] = e.target.value;//same as country = e.target.name for example
            console.log("e.target.name = ", e.target.name);
            console.log("e.target.checked = ", e.target.checked);
            setNewCity(newStateObject)
        }
    }



    return (
        <div>
            <Header
                appName = {"NoTerraIncognita"}
                titleText = {"Add a city"}
                link = {"/home"}
                linkText = {"Home"}
            />

            <Form
                submitHandler = {newSubmitHandler}
                city = {newCity}
                errors  = {errors}
                buttonText = {"Add a city"}
                onChangeHandler = {onChangeHandler}   
            />
        </div> 
    )
}

export default NewCity;
