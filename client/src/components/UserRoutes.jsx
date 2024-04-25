import React from "react"
import { Routes, Route } from "react-router-dom"
import Resources from './Resources';
import Map from './mapx';
import Editor from './Editor'
import Exhbits from "./exhibits"
import SingleInfo from './SingleInfo';
import Home from './home';
import PlayStylesPage from './playstyles';
import PlayInfo from './playInfo';
import PlayPlaces from './playPlaces';
import UserMap from './userMap';
import './user.css';


export default function UserRoutes(props) {
    return (
        <div>
            <Routes>

                <Route exact path="/" element={<Home />} /> {/* Define route for Home component */}
                <Route path="/playstyles" element={<PlayStylesPage />} />
                <Route path="/playInfo" element={<PlayInfo />} />
                <Route path="/playPlaces" element={<PlayPlaces />} />
                <Route path="/edit" element={<Editor />} />
                <Route path="/exhibits" element={<Exhbits />} />
                <Route path="/:dest/:id" element={<SingleInfo />} />
                <Route path="/resources/*" element={<Resources />} />
                <Route path="/map" element={<Map />} />
                <Route path="/userMap" element={<UserMap />} />
            </Routes>

        </div>
    )
};

