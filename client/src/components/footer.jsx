// creates footer
import React from 'react';

//functio to create footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <a href="/about" style={{ fontWeight: 'bold' }}>About</a>
          {" | "}
          <a href="https://glazermuseum.org/visit" style={{ fontWeight: 'bold' }}>Plan Your Visit</a>
          {" | "}
          <a href="https://glazermuseum.org/contact" style={{ fontWeight: 'bold' }}>Contact</a>
          {" | "}
          <a href="https://glazermuseum.org/news" style={{ fontWeight: 'bold' }}>News</a>

          {" | "}
          <a href="https://glazermuseum.org/visit/#hours" style={{ fontWeight: 'bold' }}>Hours of Operation</a>
        </div>

        <div style={{ fontWeight: '100' }}>
          Glazer Children’s Museum | 110 W Gasparilla Plaza, Tampa FL 33602
          <a href="tel:+18134433861"> | 813-443-3861</a>
          <br />
          Copyright © 2022 | All rights reserved | Tax ID 59-2637851 | Registration #CH20272
        </div>

      </div>
    </footer>
  );
}

export default Footer;