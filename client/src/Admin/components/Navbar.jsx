import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/glazerLogo.png';


export default function Navbar() {
    return (
        //create the navbar
        <nav className='navbar'>
            <Link to='/admin'  > <img src={Logo} alt="Logo" /> <h1 className="company">Admin</h1> </Link>
            <ul>
                <li>
                    {/*link each page*/}
                    <Link to="exhibits">Exhibits</Link>
                </li>
                <li>
                    <Link to="playstyles">Playstyles</Link>
                </li>

                <li>
                    <Link to="activities">Activities</Link>
                </li>
                <li>
                    <Link to="map">Map</Link>
                </li>
                <li>
                    <Link to="data">Data</Link>
                </li>

            </ul>
        </nav>
    );
}


