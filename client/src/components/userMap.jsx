import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Map from './mapx'; // Import your Map component
import { ExhibitContext } from "../Admin/SetData";
import Zillow_Box from "../Admin/components/Zillow_Box";
import gridBoxes from "./gridBoxes";
import GridBoxes from "./gridBoxes";
import Footer from "./footer"

const libraries = ['places'];

const UserMap = (props) => {
    const [exdata, setExhibitData] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);

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
                filter: props.markerContent
            },
            headers: {
                authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            }
        })
            .then((res) => {
                setLocations(res.data);
            })
            .catch(error => {
                console.error('error:', error);
                alert('An error occurred while fetching marker locations.');
            });
    }, [props.markerContent]);

    return (
        <div>
            <div className="user-map-container">
                <div className="user-map">
                    <Map pins={locations}/>

                </div>
                <div className="map-info-div">
                    <h2>New Title</h2>
                    <p>sample text</p>
                </div>
                <div className="box-container">
                    <h2>Play Places</h2>
                    <GridBoxes data={exdata}/>
                </div>
                {selectedMarker && (
                    <div className="selected-box-location">
                        Selected Marker: {selectedMarker.name} (Lat: {selectedMarker.lat}, Lng: {selectedMarker.lng})
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );


}
export default UserMap;
