import React, { useState } from "react"
import TextEditor from "../components/TextEditor"

import ExhibitFeedback from "../components/Feedback.jsx";
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Cookies from "js-cookie";
export default function Home(props) {
    const getUserCookie = () => {
        if (Cookies.get("user")){
            console.log(Cookies.get("user"))
            return Cookies.get("user")
        }else{
            return false
        }
      };
    const user  = getUserCookie();

    //THIS PAGE WILL BE A WELCOME SCREEN FOR THE USER 
    return (
        
        <form>
            <div className="welcome">
                <h1>Welcome, {user}!</h1>

            </div>
            <div className="home-button-container">
                <Link to="exhibits"><button className="home-button">Edit Exhibits</button></Link>
                <Link to="playstyles"><button className="home-button">Edit Playstyles</button></Link>
                <Link to="activities"><button className="home-button">Edit Activities</button></Link>
                <Link to="skills"><button className="home-button">Edit Skills</button></Link>
                <Link to="map"><button className="home-button">Edit Map</button></Link>
                <Link to="homepage"><button className="home-button">Edit Home Page</button></Link>
                <Link to="resources"><button className="home-button">Edit Resources Page</button></Link>
            </div>



        </form>
    )
};

