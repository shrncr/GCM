import React from 'react';


function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
                <div style={{fontWeight: 'bold' }}>
                    <a href="https://glazermuseum.org/visit">Plan Your Visit</a>
                    {" | "}
                    <a href="https://glazermuseum.org/contact">Contact</a>
                    {" | "}
                    <a href="https://glazermuseum.org/news">News</a>
                    {" | "}
                    <a href="https://glazermuseum.org/contact">Contact</a>
                    {" | "}
                    <a href="https://glazermuseum.org/visit/#hours">Hours of Operation</a>
                </div>

                <div style={{fontWeight: '100' }}>
                    Glazer Children’s Museum | 110 W Gasparilla Plaza, Tampa FL 33602 
                    <a href="tel:+18134433861"> | 813 443 3861</a>
                    <br />
                    Copyright © 2022 | All rights reserved | Tax ID 59-2637851 | Registration #CH20272
                </div>
                </div>
        </footer>
    );
  }
  
  export default Footer;