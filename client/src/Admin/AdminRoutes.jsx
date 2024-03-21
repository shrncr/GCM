import React, { useContext } from "react";
import { ExhibitContext } from "./SetData.jsx";
import { Routes, Route } from 'react-router-dom';
import Exhibits from "./pages/Exhibits.jsx";
import Home from "./pages/Home.jsx";
import Map from "./pages/Map.jsx";
import Preview from './pages/Preview.jsx';
import Edit from './pages/Edit.jsx';
import AdminApp from "./AdminApp.jsx";
import Navbar from "./components/Navbar.jsx";
import './components/components.css';
import './pages/pages.css';

export default function AdminRoutes(props) {
    const { exhibits, setExhibit, playstyles, setPlaystyles } = useContext(ExhibitContext);
    return (
        <div>

            <Routes>

                {/* The NavBar Routes */}
                <Route path="/*" element={<Home />} />
                <Route path="/exhibits/*" element={<Exhibits title={"Exhibits"} />} />
                <Route path="/playstyles/*" element={<Exhibits title={"Playstyles"} />} />
                <Route path="/map" element={<Map />} />

                {/* Exhibits Routes */}
                {exhibits.map((e, index) => (
                    <React.Fragment key={index}>
                        <Route key={index} path={`exhibits/${e.id}`} element={<Preview title={"Exhibits"} index={index} />} />
                        <Route path={`exhibits/${e.id}/edit`} element={<Edit title={"Exhibits"} index={index} />} />
                        <Route path={`exhibits/add`} element={<Edit title={"Exhibits"} index={null} />} />
                    </React.Fragment>
                ))}

                {/* Playstyles Routes */}
                {playstyles.map((e, index) => (
                    <React.Fragment key={index}>
                        <Route path={`playstyles/${e.id}`} element={<Preview title={"Playstyles"} index={index} />} />
                        <Route path={`playstyles/${e.id}/edit`} element={<Edit title={"Playstyles"} index={index} />} />
                        <Route path={`playstyles/add`} element={<Edit title={"Playstyles"} index={null} />} />
                    </React.Fragment>
                ))}

            </Routes>
        </div>
    )
};


