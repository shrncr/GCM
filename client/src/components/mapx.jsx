import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = { //where center of map is (Tampa)
  lat: 27.964157,
  lng:  -82.452606,
};

const Map = ({ markerContent, onMarkerClick = () => {} }) => {
  const [locations, setLocations] = useState([]);
  const [clickedMarkerIndex, setClickedMarkerIndex] = useState(0); // State to track clicked marker index
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch pins based on marker content
    axios({
      url: `${apiUrl}/map`,
      method: 'GET',
      params: {
        filter: markerContent
      },
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
    }).then((res) => {
      setLocations(res.data);
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
          zoom={9}
          center={center}
      >
        {locations.map((pin, index) => ( // Put pins on the map
            <Marker
                key={index}
                scale={1}
                position={{ lat: pin.latitude, lng: pin.longitude }}
                onClick={() => {
                  setClickedMarkerIndex(index); // Update clicked marker index
                  onMarkerClick(pin, index); // Call onMarkerClick function with marker and index
                }}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  scaledSize: new window.google.maps.Size(
                    clickedMarkerIndex === index ? 45 : 32, // Change size when clicked
                    clickedMarkerIndex === index ? 45 : 32
                  ),
                }}
            />
        ))}
      </GoogleMap>
  );
};

export default Map;
