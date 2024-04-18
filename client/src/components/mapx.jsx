/*
* Map component
* Google map which loads in pins of playlocations whose "visible" property is set to true
* Props takes in editing=true or false. False when on the museum page, true when admin page
* Props take in MarkerContent. What types of playstyles?
* edit=true allows dunti
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '70vw', // Adjusted width for the map
  height: '100vh',
};

const listContainerStyle = {
  width: '30vw', // Width for the list container
  height: '100vh',
  overflowY: 'auto', // Enable vertical scrolling
};

const center = {
  lat: 27.9469,
  lng: -82.4672,
};

function Map(props) {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8082/map', {
      params: {
        filter: props.markerContent
      },
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      }
    }).then(res => {
      setLocations(res.data);
    }).catch(error => {
      console.error('Error:', error);
      alert('An error occurred.');
    });
  }, [props.markerContent]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBXqEo_870tbuzkTgjEondNHYznmrEnVf8",
    libraries,
  });

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        {locations.map(location => (
          <Marker
            key={location._id}
            position={{ lat: location.latitude, lng: location.longitude }}
            onClick={() => handleMarkerClick(location)}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h2>{selectedLocation.name}</h2>
              <p>Latitude: {selectedLocation.latitude}</p>
              <p>Longitude: {selectedLocation.longitude}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div className="list-container">
        <h2>List of Places</h2>
        <ul>
          {locations.map(location => (
            <li key={location._id} onClick={() => handleMarkerClick(location)}>
              {location.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Map;


