import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";

const EditCity = (props) => {
    const [editCity, setEditCity] = useState({
        name: "",
        country: "",
        weather: "",
        cityImage: "",
        petFriendly: false,
        yearBuilt: ""
    })

    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/cities/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setEditCity(res.data);
            })
            .catch((err)=>console.log(err))
    },[id])
    const editSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/cities/${id}`,
        editCity    
        )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/home");
            })
            .catch((err) =>{
                console.log(err);
                console.log(err)
                console.log("err.response:", err.response);
                console.log("err.response.data:", err.response.data);
                console.log("err.response.data.errors:", err.response.data.errors);
                setErrors(err.response.data.errors);
            } )
    }
    const onChangeHandler = (e) => {

        const newStateObject = { ...editCity };

        if (e.target.name === "petFriendly") {
            newStateObject[e.target.name] = e.target.checked;
            console.log("e.target.name = ", e.target.name);
            console.log("e.target.checked = ", e.target.checked);
            setEditCity(newStateObject)
        }
        else {
            newStateObject[e.target.name] = e.target.value;
            console.log("e.target.name = ", e.target.name);
            console.log("e.target.value = ", e.target.value);
            setEditCity(newStateObject)
        }

    }


    return (
        <div>
            <Header 
            appName = {"NoTerraIncognita"}
            titleText = {"Update City"}
            link={"/home"}
            linkText={"Home"}
            />
            
            <Form
                submitHandler = {editSubmitHandler}
                city = {editCity}
                errors  = {errors}
                buttonText = {"Update City"}
                onChangeHandler = {onChangeHandler}   
            />
        </div> 
    )
}




export default EditCity;
