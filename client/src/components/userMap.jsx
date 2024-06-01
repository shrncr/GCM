import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './mapx'; // Import your Map component
import Footer from "./footer"
import Banner from './banner';
import SelectionBoxes from './selectionBoxes';
import setData from "../Admin/SetData";

const UserMap = (props) => {
    const markerContent = props.markerContent;
    const [locations, setLocations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);
    let [HomeText, setHomeText] = useState('');
    const [sel,setSel] = useState(null);
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
            setSelectedMarker(res.data[0])
            setSelectedBox(0)
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
              alert('An error occured.')
            }
          }).then((res) => {
            setHomeText(res.data.desc)
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
        return(
        <div className="accordion-container">
        <SelectionBoxes skills={locations} title={"map"} side={""} sel = {sel}/>
        </div>
        )
        {/* <Accordion skills={skills} title={t} side={""} /> */}
    
        // return locations.map((item, index) => (
        //     <div key={index} className={`new-box ${selectedBox === index ? 'selected' : ''}`} onClick={() => handleBoxClick(index)}>
        //         <h4>{item.title}</h4>
        //         <div className="box-image-container">
        //             <img src={item.image} alt={item.title} className="box-image" />
        //         </div>
        //         {/* Add more details as needed */}
        //     </div>
        // ));
    };
    return (
        <div>
            <Banner text={"Bay Play"} className={"glazer_dinosaur"}/>
            <p className='user' dangerouslySetInnerHTML={{ __html: HomeText }}></p>
            <div className="user-map-container">

                <div className="user-map">
                    <Map pins={locations} onMarkerClick={handleMarkerClick} />
                </div>
                <div className="map-info-div">
                    {selectedMarker && (
                        <>
                            <h2>{selectedMarker.title}</h2>
                            <div className="box-image-container">
                                <img src={selectedMarker.image} alt={selectedMarker.title} className="box-image"/>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: selectedMarker.desc}}/>


                        </>
                    )}
                </div>
                
                
            </div>
            <Footer />
        </div>
    );
}

export default UserMap;
