//import { Box } from "@material-ui/core";
import React, {useState} from "react";
import {useJsApiLoader, useLoadScript, GoogleMap} from '@react-google-maps/api'

const center = {lat: 48.8584, lng: 2.2945}
const containerStyle = {
    width: '500px',
    height: '500px'
    };

const MyMap = (props)=>{
    

    const [libraries] = useState(["places"]);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    
    return (
        <div>
            <GoogleMap  center = {center} zoom = {10} mapContainerStyle = {containerStyle} />
            </div>
    )
}
export default MyMap; 