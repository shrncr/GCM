import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/glazerLogo.png';

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false); // State to manage menu visibility

    // Function to toggle menu visibility
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    // Function to handle link click and hide menu
    const handleLinkClick = () => {
        setShowMenu(false);
    };

    return (
        //create the navbar
        <nav className='navbar'>
            <Link to='/admin' onClick={handleLinkClick}>
                <img src={Logo} alt="Logo" />
                <h1 className="company">Admin</h1>
            </Link>
            {/* Hamburger menu icon */}
            <div className="hamburger-menu" onClick={toggleMenu}>
                <div className={`bar ${showMenu ? 'active' : ''}`}></div>
                <div className={`bar ${showMenu ? 'active' : ''}`}></div>
                <div className={`bar ${showMenu ? 'active' : ''}`}></div>
            </div>
            <ul className={`menu ${showMenu ? 'active' : ''}`}>
                <li>
                    {/*link each page*/}
                    <Link to="exhibits" onClick={handleLinkClick}>
                        <h1 className="navbar-buttons">Exhibits</h1>
                    </Link>
                </li>
                <li>
                    <Link to="playstyles" onClick={handleLinkClick}>
                        <h1 className="navbar-buttons">Playstyles</h1>
                    </Link>
                </li>
                <li>
                    <Link to="activities" onClick={handleLinkClick}>
                        <h1 className="navbar-buttons">Activities</h1>
                    </Link>
                </li>
                <li>
                    <Link to="skills" onClick={handleLinkClick}>
                        <h1 className="navbar-buttons">Skills</h1>
                    </Link>
                </li>
                <li>
                    <Link to="map" onClick={handleLinkClick}>
                        <h1 className="navbar-buttons">Map</h1>
                    </Link>
                </li>
                <li>
                    <Link to="data" onClick={handleLinkClick}>
                        <h1 className="navbar-buttons">Data</h1>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}


