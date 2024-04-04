/*
* Map component
* Google map which loads in pins of playlocations whose "visible" property is set to true
* Props takes in editing=true or false. False when on the museum page, true when admin page
* Props take in MarkerContent. What types of playstyles?
* edit=true allows dunti
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = { //where center of map is (tampa)
  lat: 27.9469,
  lng: -82.4672,
};

function Map(props) {
  const markerContent = props.markerContent;
  const [locations, setLocations] = useState([]);

  useEffect(() => { //get pins based on learning styles defined (whether it be all or specific one)
    axios({
      url: 'http://localhost:8082/map',
      method: 'GET',
      params: {
        filter: markerContent
      },
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
      catch(error) {
        console.error('error:', error);
        alert('An error occured.')
      }
    }).then((res) => {
      setLocations(res.data)
    });
  }, [locations]);



  const { isLoaded, loadError } = useLoadScript({ //loading map
    googleMapsApiKey: "AIzaSyBXqEo_870tbuzkTgjEondNHYznmrEnVf8",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) { //say loading til loaded
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap //return a map
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        {locations.map(curpin => ( //put pins on the map
          <Marker position={
            {
              lat: curpin.latitude,
              lng: curpin.longitude
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;