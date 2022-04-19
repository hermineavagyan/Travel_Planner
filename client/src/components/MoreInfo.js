import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";

const MoreInfo = (props) =>{
    const {countryName} = useParams();
    const [country, setCountry] = useState({});
    const [lat, setLat] = useState([])
    const [lng, setLng] = useState([])
    
    useEffect(()=>{
        axios.get((`https://restcountries.com/v2/name/${countryName}?fullText=true`))
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                console.log(res.data[0]);
                setCountry(res.data[0]);
                setLat(res.data[0].latlng[0]);
                setLng(res.data[0].latlng[1]);
                
            })
            .catch((err) => console.log(err))
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
            pText = {""} 
            addNew = {"/new"}          
            addNewText = {"Didn't like what we have? Create yours!"}
            logout = {"/"}
            lText = {"Logout"}
        />
        {/* {
            {city.country.name}?
            <p>Country Name: {country.name}</p>
            :<p>This country is not in countries API database</p>
        } */}
            {/* <p>Country Name: {country.name}</p>
            <p>Country Population: {country.population}</p>
            <p>Country lattidute: {lat}</p>
            <p>Country longitude: {lng}</p> */}
<div style = {{margin: "30px"}}>
<h3>{country.name}</h3>
<table class="table table-dark table-hover">
  <thead>
    <tr>
      <th scope="col">Capital</th>
      <th scope="col">Population</th>
      <th scope="col">Lat, lng</th>
      <th scope="col">Region</th>
    
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{country.capital}</td>
      <td>{country.population}</td>
      <td> {lat}, {lng}</td>
      <td>{country.region}</td>
     
    </tr>
   
   
  </tbody>
</table>

<img style = {{objectFit: "cover", height: "100px", margin: "20px", border: "1px solid black"}} src={country.flag} alt = "Country flag"/>

</div>
           

           
        </div>
    )
}
export default MoreInfo;