import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import SetData from './SetData.jsx';
import AdminRoutes from './AdminRoutes.jsx';
import Footer from '../components/footer.jsx';
// Create Context with Default Values

// all pages besides map gets padding
const ContentWrapper = ({ children }) => {
    const location = useLocation();
    const isMapPage = location.pathname.includes('/map'); 
    
    return (
      <div className={`content-wrapper ${isMapPage ? 'no-padding' : ''}`}>
        {children}
      </div>
    );
  };

function AdminApp() {
    ///Seperates the Sdmin Side so the components dont conflict
    return (
        <SetData>
            <div>
                <Navbar />
                <ContentWrapper>
                <AdminRoutes />
                </ContentWrapper>
      </div>

        </SetData>

    );
}

export default AdminApp;
