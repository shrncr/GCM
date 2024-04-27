import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './mapx'; // Import your Map component
import Footer from "./footer"
import setData from "../Admin/SetData";

const UserMap = (props) => {
    const markerContent = props.markerContent;
    const [locations, setLocations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);

    useEffect(() => {
        // Fetch marker locations
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
            console.log("Locations data:", res.data); // Log the locations data
            setLocations(res.data);
        }).catch(error => {
            console.error('error:', error);
            alert('An error occurred while fetching map data.');
        });
    }, [markerContent]);

    const handleMarkerClick = (marker, index) => {
        setSelectedMarker(marker);
        setSelectedBox(index);
    };

    const handleBoxClick = (index) => {
        setSelectedBox(index);
        setSelectedMarker(locations[index]);
    };

    const renderBoxes = () => {
        return locations.map((item, index) => (
            <div key={index} className={`new-box ${selectedBox === index ? 'selected' : ''}`} onClick={() => handleBoxClick(index)}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} />
                <div dangerouslySetInnerHTML={{ __html: item.desc }} />
                {/* Add more details as needed */}
            </div>
        ));
    };

    return (
        <div>
            <div className="user-map-container">
                <div className="user-map">
                    <Map pins={locations} onMarkerClick={handleMarkerClick} />
                </div>
                <div className="map-info-div">
                    {selectedMarker && (
                        <>
                            <h2>{selectedMarker.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: selectedMarker.desc }} />
                            {/* Add more details as needed */}
                        </>
                    )}
                </div>
                <div className="box-container">
                    <h2>Play Places</h2>
                    {renderBoxes()}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserMap;
