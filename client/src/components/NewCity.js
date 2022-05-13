//axios, useEffect, useState, Link
import React, {useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
import Navbar from "./Navbar";
import {Country, State, City} from 'country-state-city'
import {ICountry, IState, ICity} from 'country-state-city'

const NewCity = (props) => {
    // const [selectedCountry, setSelectedCountry] = useState("");

    // // const countriesArray = State.getStatesOfCountry('US')
    // const countriesArray = Country.getAllCountries();
    // let countries = [];
    // for (let i = 0; i < countriesArray.length; i++){
    //     countries.push(countriesArray[i].name);
    // }
    //  console.log(countries);

    // const countriesList = Object.keys(countries).map(key => ({
    //     name: key
    // }));
    //single state object
    const [newCity, setNewCity] = useState({
        name: "",
        country: "",
        price: "",
        funFact: "",
        cityInfo: "",
        cityImage: "",
        // petFriendly: false
        // messages: {},
        // createdBy: {}
    },

    )

    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({});
    const navigate = useNavigate()

    // function handleCountrySelect(e) {
    //     console.log("Selected country", e.target.value);
    //     const countriesSelection = e.target.value;
    //     setSelectedCountry(countriesSelection);
    //   }

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
    useEffect(() => {
        axios.get("http://localhost:8000/api/users",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <div>
            <Header
                appName = {"YOUR TRAVEL PLANNER"}
                titleText = {"CREATE YOUR CITY"}
                link = {"/home"}
                linkText = {""}
            />
            <Navbar
            // profile = {`/user/profile/${newCity.createdBy.username}`}
            profile = {`/user/profile/${user.username}`}
            pText = {"User Profile"} 
            home = {"/home"}
            hText = {"Home"}
            addNew = {"/new"}          
            addNewText = {""}
            logout = {"/"}
            lText = {"Logout"}
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
