// creates backround banner
import React, { useState, useEffect } from 'react';
import Breadcrumb from './crumb';
import { MdOutlineFamilyRestroom } from "react-icons/md";
import AskCookie from './cookieAge';
import SideButton from './sideButton';
// function to create bannder that takes text and classname as parameters
function Banner({text, className}) {
    const [showCookiePopup, setShowCookiePopup] = useState(false); // Set initial state to false
    const handleAskCookieClick = () => {
        setShowCookiePopup(prevState => !prevState); // Toggle the popup state
      };
    return (
        <div>
        <div 
        
        className={`background-image ${className}`} style={{ backgroundImage: `url(${className})` }}>
            <div className="intro-text">
                
                <h1>{text}</h1>
            </div>
            
        </div>
        <Breadcrumb/>
        <button className="popupButton" onClick={handleAskCookieClick}>
            <MdOutlineFamilyRestroom />
        </button>
        {showCookiePopup && <AskCookie />}
        </div>

        
    );
}

export default Banner;