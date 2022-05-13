
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import DeleteButton from "./DeleteButton";
import MyContext from "./MyContext";
import Navbar from "./Navbar";

const AllCities = (props) => {

    const context = useContext(MyContext);
    const [cityList, setCityList] = useState([]);
    const [user, setUser] = useState({});
    // const {searchTerm, setSearchTerm} = props;
    const navigate = useNavigate();
    //const [searchInput, setSearchInput] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

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

    // const handleChange = (e)=>{
    //     e.preventDefault();
    //     setSearchInput(e.target.value);
    // };
    // if (searchInput.length>0){
    //     cityList.filter((city)=>{
    //         return city.name.match(searchInput)
    //     })
    // }
    return (
        
        <div>
        

        <Header 
            appName = {"YOUR Travel Planner"}
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
        {/* <form>
            <input 
            type = "search" 
            placeholder="Search here" 
            onChange={handleChange(e)} 
            value = {searchInput}/></form> */}
            <div >
                <form >
                    <input type="text" placeholder='Search...' onChange={(e)=>{setSearchTerm(e.target.value)}}/>
                </form>
            </div>     
            
        {
                cityList.filter((val)=>{
                    if(searchTerm === ''){
                        return cityList
                    } else if (val.name.toLowerCase().match(searchTerm.toLowerCase())
                    ){
                        return val
                    }
                })

                .map((city, index) => (


                    
        <div class="card mb-3" style={{maxWidth: "100%"}}
                key={city._id}>
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img  style={{marginLeft: 50, marginTop: 20,maxWidth: "250%"}}src={city.cityImage} class="card-img" alt="..."/>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h3 class="card-title"><Link style = {{color: "#000000"}} to={`/city/${city._id}`}> {city.name}</Link></h3>
                        <p>
                        <h6 small class="text-muted"></h6> This travel destination is created by 
                        <h5> 
                        <Link to = {`/user/profile/${city.createdBy.username}`}>{city?.createdBy.username}</Link>
                        </h5>
                        </p>
                        <div className = "cityInfo">
                            <p class="card-text">{city.funFact}</p>
                            <p>{city.cityInfo}</p>
                        </div>
                        
                        <hr style = {{margin: 40, border: 0, backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(9, 84, 132), rgba(0, 0, 0, 0))", height: 3}}/>
                    
                        <p class="card-text">
                            <small class="text-muted"> <DeleteButton deleteHandler={()=>deleteCity(city._id)} />
                            <Link to={`/city/edit/${city._id}`}>
                            <button style = {{paddingRight: 25}} type="button" class="btn btn-secondary btn-sm">Edit</button>
                            </Link></small></p>
                    </div>
                </div>
            </div>
        </div>))
                    }
</div>
    )
}
export default AllCities;