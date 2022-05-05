import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useParams } from "react-router-dom";

const MapContainer = () => {
    const{lat, lng, countryName, country} = useParams();
    const [ selected, setSelected ] = useState({});

    const mapStyles = {        
        height: "400px",
        width: "400px"};
    
    const defaultCenter = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
    }

    const onSelect = item => {
        setSelected(item);
    }
    return (
        <LoadScript
        googleMapsApiKey = "Your_Key">
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={6}
            center={defaultCenter}>
                <Marker 
                position = {defaultCenter}
                onClick ={() => onSelect(defaultCenter)}
                />
            {   
                selected.defaultCenter && 
            (   
                <InfoWindow
                position={selected.defaultCenter}
                clickable={true}
                onCloseClick={() => setSelected({})}>
                <p>{selected.countryName.position}</p>
                </InfoWindow>
                )
            }
            </GoogleMap>
        
        </LoadScript>
    )
}
export default MapContainer;