/**
 * GRIDBOXES USED TO DISPLAY ALL
 * a. EXHIBITS
 * b. PLAYPLACES
 * c. LEARNING STYLES
 * 
 * WHEN A GRIDBOX IS CLICKED, NAVIGATES USER TO A MORE SPECIFIC PAGE DETAILING THE TOPIC IN THE BOX 
 * THIS PAGE IS DEFINED IN THE SHOWZILLOWBOXDEETS.JSX FILE, OR SINGLEINFO COMPONENT
 */
import React from 'react';
import { Link } from 'react-router-dom';

function GridBoxes(props) {
    // Function to handle updating data
    
    console.log((props.data.toString()))
    return (
        <div className="grid-container">
            {/* Map over the data array to render each box */}
            {props.data.map(box => (
                <Link key={box._id} to={box.link ? box.link : box._id}>
                    <div className="box">
                      {box.title}
                    
                        
                        
                    </div>
                </Link>
            ))}
            {/* Button to update data */}
            
        </div>
    );
}

export default GridBoxes;