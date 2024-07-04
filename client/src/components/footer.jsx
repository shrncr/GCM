// creates footer
import React, { useContext, useState, useEffect } from "react";

//functio to create footer
function Footer() {

  return (
    <>
    
    <footer className="footer">
      
      <div className="footer-content">
        <div>

          <a href="/" style={{ fontWeight: 'bold' }}>Home</a>
          {" | "}
          <a href="https://glazermuseum.org/visit" style={{ fontWeight: 'bold' }}>Plan Your Visit</a>
          {" | "}
          <a href="https://glazermuseum.org/contact" style={{ fontWeight: 'bold' }}>Contact</a>
          {" | "}
          <a href="https://glazermuseum.org/news" style={{ fontWeight: 'bold' }}>News</a>

          {" | "}
          <a href="https://glazermuseum.org/visit/#hours" style={{ fontWeight: 'bold' }}>Hours of Operation</a>
          {" | "}
          <a href="/login" style={{ fontWeight: 'bold' }}>Admin</a>
        </div>

        <div style={{ fontWeight: '100' }}>
          Glazer Children’s Museum | 110 W Gasparilla Plaza, Tampa FL 33602
          <a href="tel:+18134433861"> | 813-443-3861</a>
          <br />
          Copyright © 2024 | All rights reserved 
        </div>

      </div>
    </footer>
    </>
  );
}

export default Footer;