import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './mapx'; // Import your Map component
import Footer from "./footer";
import Banner from './banner';
import SelectionBoxes from './selectionBoxes';
import { FaDirections } from "react-icons/fa";

const UserMap = (props) => {
    const markerContent = props.markerContent;
    const [locations, setLocations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);
    let [HomeText, setHomeText] = useState('');
    const [sel, setSel] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Fetch marker locations
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
            console.log("Locations data:", res.data); // Log the locations data
            
            setLocations(res.data);
            setSelectedMarker(res.data[0]);
            setSelectedBox(0);
        }).catch(error => {
            console.error('error:', error);
            alert('An error occurred while fetching map data.');
        });

        axios({
            url: `${apiUrl}/Mappage`,
            method: 'GET',
            headers: {
              authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
            catch(error) {
              console.error('error:', error);
              alert('An error occurred.');
            }
          }).then((res) => {
            setHomeText(res.data.desc);
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
        return (
            <div className="accordion-container">
                <SelectionBoxes skills={locations} title={"map"} side={""} sel={sel}/>
            </div>
        );
    };

    return (
        <div>
            <Banner text={"Bay Play"} className="https://gcmchildrensmuseum.s3.amazonaws.com/Banner+Bay+Play.webp"/>
            <p className='user' dangerouslySetInnerHTML={{ __html: HomeText }}></p>
            <div className="user-map-container">
                <div className="user-map">
                    <Map pins={locations} onMarkerClick={handleMarkerClick} />
                </div>
                {selectedMarker && (
                    <div className="map-info-div">
                        <div className='mapInfoContainer'>
                            <div>
                            <div className='map-text'>
                            <h2>{selectedMarker.title}</h2>
                            <p className='mapplaystyle'>{selectedMarker.playstyle} Play</p>
                            <div className="mapdesc" dangerouslySetInnerHTML={{__html: selectedMarker.desc}}/>
                            
                            </div>
                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.address}` } target="_blank"><FaDirections /></a>
                            </div>
                            <div className="box-image-container">
                                <img src={selectedMarker.image} alt={selectedMarker.title} className="box-image"/>
                            </div>
                            
                            </div>
                            
                    </div>
                    
                )}

            </div>
            
            <Footer />
        </div>
    );
}

export default UserMap;
