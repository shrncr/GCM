import React, { useState, useEffect } from 'react';
import Banner from './banner';
import Footer from './footer';
import GridBoxes from './gridBoxes';
import axios from 'axios';
import AskCookie from './cookieAge';
import Navbar from "./header";

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  let [HomeText, setHomeText] = useState('');
  const [showCookiePopup, setShowCookiePopup] = useState(false);

  useEffect(() => {
    axios({
      url: `${apiUrl}/home`,
      method: 'GET',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
      catch(error) {
        console.error('error:', error);
        alert('An error occured.')
      }
    }).then((res) => {
      setHomeText(res.data.desc)
    });
  }, [])

 // empty dependency array ensures this runs once on mount

  const [boxesData, setBoxesData] = useState([
    { id: 1, title: 'Browse Playstyles', link: '/playstyles'},
    { id: 2, title: 'Museum Play', link: '/playPlaces' },
    { id: 2, title: 'Home Play', link: '/athome' },
  ]);

  // Function to update boxesData if needed
  const updateBoxesData = (newData) => {
    setBoxesData(newData);
  };

  const handleAskCookieClick = () => {
    setShowCookiePopup(true);
  };

  return (
    <div>
      <Navbar/>
      <Banner className="https://gcmchildrensmuseum.s3.amazonaws.com/glazer_banner.jpg" text="Welcome" />
      <button className="popupButton" onClick={handleAskCookieClick}>Personalize Experience by Age</button>
      {showCookiePopup && <AskCookie />}
      <p dangerouslySetInnerHTML={{ __html: HomeText }}></p>
      <GridBoxes data={boxesData} updateData={updateBoxesData} />
      <Footer/>
    </div>
  );
}

export default Home;
