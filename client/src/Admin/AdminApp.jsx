import React, { createContext, useState, useEffect } from 'react';
import Navbar from "./components/Navbar.jsx";
import SetData from './SetData.jsx';
import AdminRoutes from './AdminRoutes.jsx';

// Create Context with Default Values


function AdminApp() {
    ///Seperates the Sdmin Side so the components dont conflict
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
