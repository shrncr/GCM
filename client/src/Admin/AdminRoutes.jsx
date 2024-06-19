import React, { useContext } from "react";
import { ExhibitContext } from "./SetData.jsx";
import { Routes, Route } from 'react-router-dom';
import Exhibits from "./pages/Exhibits.jsx";
import Home from "./pages/Home.jsx";
import MapEdit from "./pages/MapEdit.jsx";
import Preview from './pages/Preview.jsx';
import Edit from './pages/Edit.jsx';
import Data from "./pages/Data.jsx";
import './components/components.css';
import './pages/pages.css';
import HomeEdit from "./pages/HomeEdit.jsx";

export default function AdminRoutes(props) {
    const { exhibits, setExhibit, playstyles, setPlaystyles, locations, setLocations, act, skills } = useContext(ExhibitContext);

    return (
        <div>
            <Routes>
                {/* The NavBar Routes */}
                <Route path="/*" element={<Home />} />
                <Route path="/exhibits" element={<Exhibits title={"Exhibits"} />} />
                <Route path="/playstyles" element={<Exhibits title={"Playstyles"} />} />
                <Route path="/activities" element={<Exhibits title={"Activities"} />} />
                <Route path="/skills" element={<Exhibits title={"Skills"} />} />
                <Route path="/map" element={<MapEdit />} />
                <Route path="/homepage" element={<HomeEdit title={"home"} />} />
                <Route path="/resources" element={<HomeEdit title={"resources"} />} />

                {/* Exhibits Routes */}
                {exhibits.map((e, index) => {
                    const name = e.title.replace(/\s+/g, '_');
                    return (
                        <React.Fragment key={index}>
                            <Route path={`exhibits/${name}`} element={<Preview title={"Exhibits"} index={index} />} />
                            <Route path={`exhibits/${name}/edit`} element={<Edit title={"Exhibits"} index={index} />} />
                        </React.Fragment>
                    )
                })}
                <Route path="exhibits/add" element={<Edit title={"Exhibits"} index={null} />} />

                {/* Playstyles Routes */}
                {playstyles.map((e, index) => {
                    const name = e.title.replace(/\s+/g, '_');
                    return (
                        <React.Fragment key={index}>
                            <Route path={`playstyles/${name}`} element={<Preview title={"Playstyles"} index={index} />} />
                            <Route path={`playstyles/${name}/edit`} element={<Edit exhibit={e} title={"Playstyles"} index={index} />} />
                        </React.Fragment>
                    );
                })}
                <Route path="playstyles/add" element={<Edit exhibit={"add"} title={"Playstyles"} index={null} />} />

                {/* Map Routes */}
                {locations.map((e, index) => {
                    const name = e.title.replace(/\s+/g, '_');
                    return (
                        <React.Fragment key={index}>
                            <Route path={`map/${name}`} element={<Preview title={"Map"} index={index} />} />
                            <Route path={`map/${name}/edit`} element={<Edit title={"Map"} index={index} />} />
                        </React.Fragment>
                    )
                })}
                <Route path="map/add" element={<Edit title={"Map"} index={null} />} />

                {/* Activities Routes */}
                {act.map((e, index) => {
                    const name = e.title.replace(/\s+/g, '_');
                    return (
                        <React.Fragment key={index}>
                            <Route path={`activities/${name}`} element={<Preview title={"Activities"} index={index} />} />
                            <Route path={`activities/${name}/edit`} element={<Edit exhibit={e} title={"Activities"} index={index} />} />
                        </React.Fragment>
                    )
                })}
                <Route path="activities/add" element={<Edit exhibit={"add"} title={"Activities"} index={null} />} />

                {/* Skills Routes */}
                {skills.map((e, index) => {
                    const name = e.title.replace(/\s+/g, '_');
                    return (
                        <React.Fragment key={index}>
                            <Route path={`skills/${name}`} element={<Preview title={"Skills"} index={index} />} />
                            <Route path={`skills/${name}/edit`} element={<Edit title={"Skills"} index={index} />} />
                        </React.Fragment>
                    )
                })}
                <Route path="skills/add" element={<Edit exhibit={"add"} title={"Skills"} index={null} />} />

            </Routes>
        </div>
    );
}


