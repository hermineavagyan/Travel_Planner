
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import DeleteButton from "./DeleteButton";
// import { Navigate } from "react-router-dom";
// import { AnimatedText } from "./AnimatedText";
import Navbar from "./Navbar";

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
            titleText = {"Explore Your Next Dream Vacation Destination"}
            link={"/new"}
            linkText={""}
            />
        <Navbar
            home = {"/home"}
            hText = {""}
            profile = {`/user/profile/${user.username}`}
            pText = {"User Profile"} 
            addNew = {"/new"}          
            addNewText = {"Didn't like what we have? Create yours!"}
            logout = {"/"}
            lText = {"Logout"}
        />
           
            {/* <ul class="nav justify-content-end">
                <li class="nav-item">
                
                <Link class="nav-link" to={`/user/profile/${user.username}`}>User Profile</Link></li>
                
                <li class="nav-item">
                
                <p><button onClick={logout}>Logout</button></p></li>
            </ul> */}
            <hr/>
           
            {/* <Link to={`/user/profile/${user.username}`}>Go to {user.username}'s  Profile</Link>
               <p><button onClick={logout}>Logout</button></p> */}

            {
                cityList.map((city, index) => (
                <div class="card border-light text-dark bg-light mx-5 my-3"
                   
                        key={city._id}>
                        <Link to = {`/user/profile/${city.createdBy?.username}`}>{city.createdBy?.username}</Link>
                        <Link class="card-header" to={`/city/${city._id}`}> {city.name}</Link>
                      
                      
                        <img class="card-body" src={city.cityImage} style={{ width: "350px", height: "250px" }} />
                       
                       
                            
                       
                        
                        <p>
                        <DeleteButton deleteHandler={()=>deleteCity(city._id)} />
                        <Link to={`/city/edit/${city._id}`}><button type="button" class="btn btn-secondary btn-sm">Edit</button></Link></p>
                       

                    </div>

                ))
            }


        </div>
    )
}




export default AllCities;