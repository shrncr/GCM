import React from 'react';
import Navbar from './header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import Home from './home';
import PlayStylesPage from './playstyles';
import PlayInfo from './playInfo';
import PlayPlaces from './playPlaces';
import Map from './map'
import Editor from './Editor'
import Exhbits from "./exhibits"

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes> {/* Wrap your routes with Routes */}
                    <Route exact path="/" element={<Home />} /> {/* Define route for Home component */}
                    <Route path = "/playstyles/" element={<PlayStylesPage />} />
                    <Route path="/playInfo" element={<PlayInfo />} />
                    <Route path="/playPlaces" element={<PlayPlaces />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/edit" element={<Editor />}/>
                    <Route path="/exhibits" element={<Exhbits />}/>

                </Routes>
            </div>
        </Router>
    );
}

export default App;
