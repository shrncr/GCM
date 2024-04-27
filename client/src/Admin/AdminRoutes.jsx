import React, { useContext } from "react";
import { ExhibitContext } from "./SetData.jsx";
import { Routes, Route } from 'react-router-dom';
import Exhibits from "./pages/Exhibits.jsx";
import Home from "./pages/Home.jsx";
import MapEdit from "./pages/MapEdit.jsx"
import Preview from './pages/Preview.jsx';
import Edit from './pages/Edit.jsx';
import Data from "./pages/Data.jsx"
import './components/components.css';
import './pages/pages.css';


export default function AdminRoutes(props) {
    const { exhibits, setExhibit, playstyles, setPlaystyles, locations, setLocations, act, skills } = useContext(ExhibitContext);
    //Creates all the routes for the admin side
    return (
        <div>

            <Routes>

                {/* The NavBar Routes */}
                <Route path="/*" element={<Home />} />

                <Route path="/exhibits/*" element={<Exhibits title={"Exhibits"} />} />
                <Route path="/playstyles/*" element={<Exhibits title={"Playstyles"} />} />
                <Route path="/activities/*" element={<Exhibits title={"Activities"} />} />
                <Route path="/skills/*" element={<Exhibits title={"Skills"} />} />
                <Route path="/map/*" element={<MapEdit />} />
                <Route path='data' element={<Data index={0} />} />
                {/*<Route path="/map" element={<MapEdit />} />

                {/* Exhibits Routes */}
                {exhibits.map((e, index) => {
                    const name = e.title.replace(/\s+/g, '_');
                    return (
                        <React.Fragment key={index}>
                            <Route key={index} path={`exhibits/${name}`} element={<Preview title={"Exhibits"} index={index} />} />
                            <Route path={`exhibits/${name}/edit`} element={<Edit title={"Exhibits"} index={index} />} />
                            <Route path={`exhibits/add`} element={<Edit title={"Exhibits"} index={null} />} />
                        </React.Fragment>
                    )
                })}

                {/* Playstyles Routes */}
                {/* Playstyles Routes */}
                {playstyles.map((e, index) => {
                    // Check if there are spaces in the title and remove them
                    const name = e.title.replace(/\s+/g, '_');

                    return (
                        <React.Fragment key={index}>
                            <Route path={`/playstyles/${name}`} element={<Preview title={"Playstyles"} index={index} />} />
                            <Route path={`/playstyles/${name}/edit`} element={<Edit exhibit={e} title={"Playstyles"} index={index} />} />
                            <Route path="/playstyles/add" element={<Edit exhibit={"add"} title={"Playstyles"} index={null} />} />
                        </React.Fragment>
                    );
                })}

                {/* Home Activity Routes */}
                {locations.map((e, index) => {

                    const name = e.title.replace(/\s+/g, '_');
                    return (
                        <React.Fragment key={index}>
                            <Route key={index} path={`map/${name}`} element={<Preview title={"Map"} index={index} />} />
                            <Route path={`map/${name}/edit`} element={<Edit title={"Map"} index={index} />} />
                            <Route path={`map/add`} element={<Edit title={"Map"} index={null} />} />
                        </React.Fragment>
                    )
                })}

                {/* Home Activity Routes */}
                {act.map((e, index) => {
                    const name = e.title.replace(/\s+/g, '_');
                    return (
                        <React.Fragment key={index}>
                            <Route key={index} path={`activities/${name}`} element={<Preview title={"Activities"} index={index} />} />
                            <Route path={`activities/${name}/edit`} element={<Edit title={"Activities"} index={index} />} />
                            <Route path={`activities/add`} element={<Edit title={"Activities"} index={null} />} />
                        </React.Fragment>
                    )
                })}
                {/* Skills Routes */}
                {skills.map((e, index) => {
                    const name = e.title.replace(/\s+/g, '_');
                    return (
                        <React.Fragment key={index}>
                            <Route key={index} path={`skills/${name}`} element={<Preview title={"Skills"} index={index} />} />
                            <Route path={`skills/${name}/edit`} element={<Edit title={"Skills"} index={index} />} />
                            <Route path={`skills/add`} element={<Edit title={"Skills"} index={null} />} />
                        </React.Fragment>
                    )
                })}


            </Routes>
        </div>
    )
};


