import React from 'react';

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