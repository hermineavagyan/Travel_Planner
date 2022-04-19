import React, {useState, useEffect} from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";


const Profile = (props) => {

    const {username} = useParams();
    const [userCityList, setUserCityList] = useState([]);
    

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/citiesbyuser/${username}`,
            { withCredentials: true }
        )
            .then((res)=>{
                console.log(res.data);
                setUserCityList(res.data);
            })
            .catch((err)=>{
                console.log(err)
            })
        
    
    
    }, [])
    
    
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
            hText = {"Home"}
            profile = {""}
            // profile = {`/user/profile/${user.username}`}
            pText = {""} 
            addNew = {"/new"}          
            addNewText = {"Want to create more? Click here!"}
            logout = {"/"}
            lText = {"Logout"}
        />
        <h1>Welcome {username}</h1>
        <div className = "userTable">
        <table  class="table table-striped">
  <thead class="thead-light">
    <tr >
      <th scope="col">City Image</th>
      <th scope="col">City Name</th>
      <th scope="col">Country</th>
     
    </tr>
  </thead>
  <tbody >
  {
            userCityList.map((city, index) => (
    <tr key={index}>
      <th scope="row"> <img src = {city.cityImage}/></th>
      <td>{city.name}</td>
      <td>{city.country}</td>
     
    </tr>
    ))
        } 
  </tbody>
</table>
      </div> 


        {/* {
            userCityList.map((city, index) => (
                <div key={index}>
                    <p> City name: {city.name}</p>
                    <p>Country city belongs to: {city.country}</p>
                    <p>The weather: {city.weather}</p>
                </div>
            ))
        }  */}
      
    </div>
    )
}
export default Profile;