
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import DeleteButton from "./DeleteButton";


const AllCities = (props) => {


    const [cityList, setCityList] = useState([]);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/cities")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setCityList(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    
    const deleteCity = (idFromBelow)=>{
        axios.delete(`http://localhost:8000/api/cities/${idFromBelow}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setCityList(cityList.filter(city => city._id !== idFromBelow))
            })
            .catch((err)=>console.log(err))
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

    const logout = (e) => {
        axios
            .post(
                "http://localhost:8000/api/users/logout",
                {}, 
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>

            <Header 
            appName = {"NoTerraIncognita"}
            titleText = {"List of All Cities"}
            link={"/new"}
            linkText={"Add new city!"}
            />
            <Link to={`/user/profile/${user.username}`}>Go to {user.username}'s  Profile</Link>
               <p><button onClick={logout}>Logout</button></p>

            {
                cityList.map((city, index) => (
                    <div
                        style={{textAlign:"center"}}
                        key={city._id}
                    >
                        <Link to = {`/user/profile/${city.createdBy?.username}`}>{city.createdBy?.username}</Link>
                        <Link to={`/city/${city._id}`}> {city.name}</Link>
                        <br/>
                        <img src={city.cityImage} style={{ width: "150px", height: "150px" }} />
                        <br/>
                        <DeleteButton deleteHandler={()=>deleteCity(city._id)} />
                        <Link to={`/city/edit/${city._id}`}>Edit</Link>

                    </div>

                ))
            }


        </div>
    )
}




export default AllCities;