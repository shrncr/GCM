import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";

import './components/components.css';
import './pages/pages.css';
import SetData from './SetData.jsx';
import AdminRoutes from './AdminRoutes.jsx';

// Create Context with Default Values


function AdminApp() {

    return (
        <SetData>
            <div>
                <Navbar />
                <AdminRoutes />
                
            </div>

        </SetData>

    );
}

export default AdminApp;
