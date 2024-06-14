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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function GridBoxes(props) {
    return (
        <div className="grid-container">
            
            {/* Map over the data array to render each box */}
            {props.data.map(box => (
                <div key={box._id} className="grid-item">
                    <Link to={box.link ? box.link : box._id} className="icon-link">
                        
                        <div className={box.icon ? 'box': (box.image? 'imgbox' : 'gridbox')}>
                        {(box.icon 
                                ? React.createElement(box.icon, { className: 'icon-large' }) // Render the icon if provided
                                : (box.image ? <img src={box.image} alt="Placeholder" className="img-thumb" /> : <></>) // Render a placeholder image if no icon is provided
                            )}
                            <h6 className='box-text'>{box.title}</h6>
                        </div>
                        
                    </Link>
                    
                </div>
            ))}
        </div>
    );
}

export default GridBoxes;
