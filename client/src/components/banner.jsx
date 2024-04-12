// creates backround banner
import React from 'react';
// function to create bannder that takes text and classname as parameters
function Banner({text, className}) {
    return (
        
        <div 
        
        className={`background-image ${className}`}>
            <div className="intro-text">
                <h1>{text}</h1>
            </div>
        </div>

        
    );
}

export default Banner;