// creates backround banner
import React from 'react';
import Breadcrumb from './crumb';
// function to create bannder that takes text and classname as parameters
function Banner({text, className}) {
    return (
        <div>
        <div 
        
        className={`background-image ${className}`} style={{ backgroundImage: `url(${className})` }}>
            <div className="intro-text">
                
                <h1>{text}</h1>
            </div>
            
        </div>
        <Breadcrumb/>
        </div>

        
    );
}

export default Banner;