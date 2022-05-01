import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useParams } from "react-router-dom";

const MapContainer = () => {
    const{lat, lng, countryName} = useParams();
    const [ selected, setSelected ] = useState({});

    const onSelect = (item) => {
        setSelected(item);
      }
  
  const mapStyles = {        
    height: "400px",
    width: "400px"};
  
//   const defaultCenter = {
//     lat: 41.3851, lng: 2.1734
//   }
  const defaultCenter = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  }
  

  return (
     <LoadScript
     googleMapsApiKey = 'REACT_APP_GOOGLE_MAPS_API_KEY'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={6}
          center={defaultCenter}>
        <Marker key = {countryName} position = {defaultCenter}
             onClick={() => onSelect(defaultCenter)}
        />
 {
            selected.defaultCenter && 
            (
              <InfoWindow
            position={selected.defaultCenter}
            //   marker = {activeMarker}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
            </InfoWindow>
            )
         }
          </GoogleMap>
       
     </LoadScript>
  )
}
export default MapContainer;