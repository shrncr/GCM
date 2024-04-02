import React, { useContext, useEffect } from "react";
import Zillow_Box from "../components/Zillow_Box.jsx";
import { ExhibitContext } from "../SetData.jsx";
import Map from "../../../src/components/mapx.jsx"
import Exhibits from "./Exhibits.jsx";
import axios from "axios";
import PlacesAutoComplete from "../components/placesAutoComplete.jsx";

// import {
//     geocodeByAddress,
//     geocodeByPlaceId,
//     getLatLng,
//   } from 'react-places-autocomplete';
//AIzaSyAfrzN6pb247SzGX7AK7LuVj4HEa7yl2GE
export default function MapEdit(props) {
    const {locations, setLocations } = useContext(ExhibitContext);
    function search(){
        axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=medicine&key=AIzaSyAfrzN6pb247SzGX7AK7LuVj4HEa7yl2GE").then( (res) =>
            console.log(res)
        );
        
        
    };
    return (
        < div >
        <PlacesAutoComplete/>
        <Map editing={true}/>
        <Exhibits title={"Map"}/>
        </div >
    )
};


