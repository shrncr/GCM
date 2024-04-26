import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Map from './mapx'; // Import your Map component
import { ExhibitContext } from "../Admin/SetData";
import GridBoxes from "./gridBoxes";
import Footer from "./footer"
import setData from "../Admin/SetData";

const libraries = ['places'];

const UserMap = (props) => {
    const [exdata, setExhibitData] = useState([]);
    const markerContent = props.markerContent;
    const [locations, setLocations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);

    useEffect(() => {
        // Fetch exhibit data
        axios({
            url: 'http://localhost:8082/playplace',
            method: 'GET',
            headers: {
                authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
        })
            .then((res) => {
                setExhibitData(res.data)
            })
            .catch(error => {
                console.error('error:', error);
                alert('An error occurred while fetching exhibit data.');
            });

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
            setLocations(res.data)
        });
    }, [markerContent]);

    const handleBoxClick = (index) => {
        setSelectedBox(index);
        setSelectedMarker(locations[index]);
    };

    // Format each exhibit data item into a box
    const renderBoxes = () => {
        return locations.map((item, index) => (
            <div key={index} className={`new-box ${selectedBox === index ? 'selected' : ''}`} onClick={() => handleBoxClick(index)}>
                <h3>{item.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: item.desc }} />
                {/* Add more details as needed */}
            </div>
        ));
    };

    return (
        <div>
            <div className="user-map-container">
                <div className="user-map">
                    <Map pins={locations} />
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
