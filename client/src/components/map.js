import axios from "axios";
import React, { useEffect, useState } from "react";
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function Map(props) {
  const tampa = {lat: 27.9469,lng: -82.4672};
//   useEffect(() => {
//       axios.get('http://localhost:3000/map').then(
//         //for loop making new pins
//       );
// });
    let map;
    let marker;
    // Function to initialize the map
    window.initMap = () => {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: tampa,
        zoom: 12,
        minZoom: 12
      });
      marker = new window.google.maps.Marker({
        position: tampa,
        map: map,
        title: "choice",
        draggable: false,
      });
    }
    const script = document.createElement("script");
    
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
  ;

  return (
            <div id="map" className="map"></div>
  );
}
