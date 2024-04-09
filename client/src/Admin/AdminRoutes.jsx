import React, { useContext } from "react";
import { ExhibitContext } from "./SetData.jsx";
import { Routes, Route } from 'react-router-dom';
import Exhibits from "./pages/Exhibits.jsx";
import Home from "./pages/Home.jsx";
import MapEdit from "./pages/MapEdit.jsx"
import Preview from './pages/Preview.jsx';
import Edit from './pages/Edit.jsx';
import AdminApp from "./AdminApp.jsx";
import Navbar from "./components/Navbar.jsx";
//import MapEdit from "./pages/MapEdit.jsx";
import './components/components.css';
import './pages/pages.css';


export default function AdminRoutes(props) {
    const { exhibits, setExhibit, playstyles, setPlaystyles, locations, setLocations } = useContext(ExhibitContext);
    return (
        <div>

            <Routes>

                {/* The NavBar Routes */}
                <Route path="/*" element={<Home />} />
                <Route path="/exhibits/*" element={<Exhibits title={"Exhibits"} />} />
                <Route path="/playstyles/*" element={<Exhibits title={"Playstyles"} />} />
                <Route path="/map/*" element={<MapEdit />} />
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
                            <Route path={`/playstyles/${name}/edit`} element={<Edit title={"Playstyles"} index={index} />} />
                            <Route path="/playstyles/add" element={<Edit title={"Playstyles"} index={null} />} />
                        </React.Fragment>
                    );
                })}


                {locations.map((e, index) => (
                    <React.Fragment key={index}>
                        <Route path={`playstyles/${e.title}`} element={<Preview title={"Map"} index={index} />} />
                        <Route path={`playstyles/${e.title}/edit`} element={<Edit title={"Map"} index={index} />} />
                        <Route path={`playstyles/add`} element={<Edit title={"Map"} index={null} />} />
                    </React.Fragment>
                ))}

            </Routes>
        </div>
    )
};


