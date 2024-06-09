import React, { useState, useEffect } from 'react';
import Banner from './banner';
import Footer from './footer';
import GridBoxes from './gridBoxes';
import axios from 'axios';
import DOMPurify from 'dompurify';
import AskCookie from './cookieAge';
import SideButton from './sideButton';
import Navbar from "./header";
import { FaHouseUser } from "react-icons/fa";
import { MdMuseum } from "react-icons/md";
import { LuToyBrick } from "react-icons/lu";
import { MdOutlineFamilyRestroom } from "react-icons/md";

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  const [HomeText, setHomeText] = useState('');
  const [showCookiePopup, setShowCookiePopup] = useState(false); // Set initial state to false

  useEffect(() => {
    axios({
      url: `${apiUrl}/home`,
      method: 'GET',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
    }).then((res) => {
      setHomeText(DOMPurify.sanitize(res.data.desc));
    }).catch(error => {
      console.error('error:', error);
      alert('An error occurred.');
    });
  }, []);

  const [boxesData, setBoxesData] = useState([
    { id: 1, title: 'Playstyles', link: '/playstyles', icon: LuToyBrick },
    { id: 2, title: 'Museum Play', link: '/playPlaces', icon: MdMuseum },
    { id: 3, title: 'Home Play', link: '/athome', icon: FaHouseUser },
  ]);

  const updateBoxesData = (newData) => {
    setBoxesData(newData);
  };

  const handleAskCookieClick = () => {
    setShowCookiePopup(prevState => !prevState); // Toggle the popup state
  };

  return (
    <div>
      <Navbar />
      <Banner className="https://gcmchildrensmuseum.s3.amazonaws.com/glazer_banner.jpg" text="" />
      <button className="popupButton" onClick={handleAskCookieClick}>
        <MdOutlineFamilyRestroom />
      </button>
      {showCookiePopup && <AskCookie />}
      <p dangerouslySetInnerHTML={{ __html: HomeText }}></p>
      <GridBoxes data={boxesData} updateData={updateBoxesData} />
      <Footer />
    </div>
  );
}

export default Home;
