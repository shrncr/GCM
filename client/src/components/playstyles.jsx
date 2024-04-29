//creaets page for playstyles
import React, { useState, useEffect } from 'react';
import Banner from './banner';
import GridBoxes from './gridBoxes';
import Footer from './footer'; // Corrected import path

import axios from 'axios'

function getDeviceType() { // for impressions
  const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|MQQBrowser|Opera Mini|Windows Phone|webOS|Kindle|Silk-Accelerated|(hpw|web)OS/i.test(ua)) {
      return "mobile";
    }
    return "desktop";
}

function PlayStylesPage() {
  const [exdata, setExhibitData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const deviceType = getDeviceType();
  useEffect(() => {
    axios({
      url: `${apiUrl}/playstyles`,
      method: 'GET',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
      catch(error) {
        console.error('error:', error);
        alert('An error occured.')
      }
    }).then((res) => {
      setExhibitData(res.data)
    });
  }, []);
  useEffect(() => {
    const page = 'playstyles';
    const time_of_day = new Date();
    // Create impression and start session tracking
    axios.post(`${apiUrl}/create`, { time_of_day, page, deviceType })
      .then(response => {
        console.log('Visit and session start recorded:', response.data);
      })
      .catch(error => {
        console.error('Error recording visit and session start:', error);
      });

    function handleUnload() {
      const sessionEnd = new Date();
      const sessionDuration = sessionEnd - time_of_day; // Duration in milliseconds

      axios.post(`${apiUrl}/sessions/end`, {
        deviceType,
        sessionDuration,
        page,
        bounce: interactions === 0 // Consider it a bounce if no interactions
      }).then(response => console.log('Session end data saved:', response.data))
        .catch(error => console.error('Error saving session end data:', error));
    }

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [interactions]);
 
  return (
    <>
      <Banner className="playstyles-background" text="Learn to Play" />
      <h1 className="user">I want to participate in...</h1>
      <GridBoxes data={exdata} />
      <Footer />
    </>

  );
}

export default PlayStylesPage;