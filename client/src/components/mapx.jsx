import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = { //where center of map is (Tampa)
  lat: 27.9469,
  lng: -82.4672,
};

const Map = ({ markerContent, onMarkerClick = () => {} }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch pins based on marker content
    axios({
      url: 'http://localhost:8082/map',
      method: 'GET',
      params: {
        filter: markerContent
      },
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
    }).then((res) => {
      setLocations(res.data)
    }).catch(error => {
      console.error('error:', error);
      alert('An error occurred while fetching map data.');
    });
  }, [markerContent]);

  const { isLoaded, loadError } = useLoadScript({ // Loading map
    googleMapsApiKey: "AIzaSyBXqEo_870tbuzkTgjEondNHYznmrEnVf8",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) { // Show loading until loaded
    return <div>Loading maps</div>;
  }

  return (
      <GoogleMap // Return a map
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
      >
        {locations.map((pin, index) => ( // Put pins on the map
            <Marker
                key={index}
                position={{ lat: pin.latitude, lng: pin.longitude }}
                onClick={() => onMarkerClick(pin, index)} // Call onMarkerClick function with marker and index
            />
        ))}
      </GoogleMap>
  );
};

export default Map;
