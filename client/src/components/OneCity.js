import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import DeleteButton from "./DeleteButton";



const OneCity = (props) => {
    const [city, setCity] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/cities/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setCity(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id])

    const deleteOneCity = ()=>{
        axios.delete(`http://localhost:8000/api/cities/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/")
                
            })
            .catch((err) => console.log(err))
    }



    return (
        <div>
            <Header 
            appName = {"NoTerraIncognita"}
            titleText = {city.name}
            link={"/"}
            linkText={"Home"}
            />

                <p>{city.country}</p>
            <img src={city.cityImage} style={{ width: "150px", height: "150px" }}/>
            <p>{city.country}</p>
            
            <p>{city.weather}</p>
            <p>This city is built in {city.yearBuilt}</p>

            <div>Pet Friendly
                {
                    city.petFriendly?
                    <p>Okay for pets!!!</p>
                    :<p>Don't torture your pets taking them there!!!!!!</p>
                }
            </div>
            <DeleteButton deleteHandler={deleteOneCity}/>
        
        </div> 
    )
}




export default OneCity;

