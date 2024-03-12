
import React, { useEffect, useState } from "react";
// import axios from 'axios';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Map(props) {
  const tampa = {lat: 27.9469,lng: -82.4672};

    let map;
    let marker;
    //const [pinLocations, setPinLocations] = useState([]);

    // useEffect(() => {
    //   axios.get('http://localhost:5000/map')
    //     .then(response => {
    //       setPinLocations(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching pin locations:', error);
    //     });
    // }, []);

    // Function to initialize the map
    //useEffect(() => {
      // Render pins on the map
    //   if (map && pinLocations.length > 0) {
    //     pinLocations.forEach(pin => {
    //       new window.google.maps.Marker({
    //         position: { lat: pin.latitude, lng: pin.longitude },
    //         map: map,
    //         title: pin.desc
    //       });
    //     });
    //   }
    // }, [map, pinLocations]);

    window.initMap = () => {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: tampa,
        zoom: 6,
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

export default Map;