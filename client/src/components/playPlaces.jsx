// import React, { useState } from 'react';
import Banner from './banner';
// import GridBoxes from './gridBoxes';
import Footer from './footer';
import SideButton from './sideButton';
// import playExample from '../components/images/playExample.webp'; // Corrected import path

import React, { useState, useEffect } from 'react';
import GridBoxes from './gridBoxes';
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


function Playplaces() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [exdata, setExhibitData] = useState([]);
  const [interactions, setInteractions] = useState(0);
  let [HomeText, setHomeText] = useState('');

  
  useEffect(() => {
    axios({
      url: `${apiUrl}/exhibits`,
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

    axios({
      url: `${apiUrl}/Exhibitspage`,
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
  },[]);
  useEffect(() => {
    const deviceType = getDeviceType();
    const page = 'playPlaces';
    const time_of_day = new Date();
    const apiUrl = process.env.REACT_APP_API_URL;
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
    
      <Banner className="https://gcmchildrensmuseum.s3.amazonaws.com/glazer_dinasour.jpg" text="Museum Play" />
      
      <SideButton/>
      <p className='user' style={{borderColor: "#54B9B6"}} dangerouslySetInnerHTML={{ __html: HomeText }}></p>
      <GridBoxes data={exdata} />
      <Footer />
    </>

  );
}

export default Playplaces;