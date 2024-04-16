// creates navbar based on that changes dynamically based on screen size
import React, { useState, useRef, useEffect } from 'react';
import glazerLogo from '../components/images/glazerLogo.webp'; // Corrected import path
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <header className={scrolled ? 'scrolled' : ''}>
            <Link to="/">
                <img src={glazerLogo} alt="Logo" className='header-img' />
            </Link>
            <nav ref={navRef}>
                <a href="/playstyles">Learn to Play</a>
                <a href="/playPlaces">Places to Play</a>
                <a href="/Resources">Resources</a>

                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
