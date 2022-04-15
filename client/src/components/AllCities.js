
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
            {/* {
                cityList.map((city, index) => (
                <div class="card border-light text-dark bg-light mx-5 my-3"
                        key={city._id}>
                        <Link to = {`/user/profile/${city.createdBy?.username}`}>{city.createdBy?.username}</Link>
                        <Link class="card-header" to={`/city/${city._id}`}> {city.name}</Link>
                        <img class="card-body" src={city.cityImage} style={{ width: "350px", height: "250px" }} />
                        <p class="text-right">{city.funFact}</p>
                        <p>
                        <DeleteButton deleteHandler={()=>deleteCity(city._id)} />
                        <Link to={`/city/edit/${city._id}`}><button type="button" class="btn btn-secondary btn-sm">Edit</button></Link></p>
                </div>
 ))
            } */}

            {/* {
                cityList.map((city, index) => (
                <div class="card"
                key={city._id}>
    <img src={city.cityImage} class="card-img-top"  alt="city image"/>
    <div class="card-body">
      <h5 class="card-title"><Link to={`/city/${city._id}`}> {city.name}</Link></h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
                ))
            } */}
            {
                cityList.map((city, index) => (
                <div class="card mb-3" style={{maxWidth: "100%"}}
                key={city._id}>
  <div class="row no-gutters">
    <div class="col-md-4">
      <img  style={{marginLeft: 50, marginTop: 20,maxWidth: "250%"}}src={city.cityImage} class="card-img" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title"><Link style = {{color: "#000000"}} to={`/city/${city._id}`}> {city.name}</Link></h3>
        <p> <Link to = {`/user/profile/${city.createdBy?.username}`}>{city.createdBy?.username}</Link></p>
        <h5>Did you know?</h5>
        <p class="card-text">{city.funFact} This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
       <hr style = {{margin: 40, border: 0, backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(9, 84, 132), rgba(0, 0, 0, 0))", height: 3}}/>
    
        <p class="card-text"><small class="text-muted"> <DeleteButton deleteHandler={()=>deleteCity(city._id)} />
                        <Link to={`/city/edit/${city._id}`}><button style = {{paddingRight: 25}} type="button" class="btn btn-secondary btn-sm">Edit</button></Link></small></p>
      </div>
    </div>
  </div>
</div>))
            }
        </div>
    )
}
export default AllCities;