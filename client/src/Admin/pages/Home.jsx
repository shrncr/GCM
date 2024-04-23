import React, { useState } from "react"
import TextEditor from "../components/TextEditor"

import ExhibitFeedback from "../components/Feedback.jsx";
import { Link } from 'react-router-dom';
export default function Home(props) {


    //THIS PAGE WILL BE A WELCOME SCREEN FOR THE USER 
    return (
        <form>
            <div className="welcome">
                <h1>Welcome User</h1>

            </div>
            <div className="home-button-container">
                <Link to="exhibits"><button className="home-button">Edit Exhibits</button></Link>
                <Link to="playstyles"><button className="home-button">Edit Playstyles</button></Link>
                <Link to="activities"><button className="home-button">Edit Activities</button></Link>
                <Link to="map"><button className="home-button">Edit Map</button></Link>
                <Link to="data"><button className="home-button">View Data</button></Link>
            </div>

            <div className="homepage-editor">
                <TextEditor />
            </div>
            <ExhibitFeedback exhibitId={"Hello"} />
        </form>
    )
};

