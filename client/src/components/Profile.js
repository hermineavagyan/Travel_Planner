import React, {useState, useEffect} from "react";
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
        <div style={{ textAlign: "center" }}>
        <h1>Welcome {username}</h1>

        {
            userCityList.map((city, index) => (
                <div key={index}>
                    <p> City name: {city.name}</p>
                    <p>Country city belongs to: {city.country}</p>
                    <p>The weather: {city.weather}</p>
                </div>
            ))
        }
        
    </div>
    )
}
export default Profile;