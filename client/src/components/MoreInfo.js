import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
            <p>Country Name: {country.name}</p>
            <p>Country Population: {country.population}</p>
            <p>Country lattidute: {lat}</p>
            <p>Country longitude: {lng}</p>

            

           
        </div>
    )
}
export default MoreInfo;