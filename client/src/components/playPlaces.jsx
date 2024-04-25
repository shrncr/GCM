// import React, { useState } from 'react';
import Banner from './banner';
// import GridBoxes from './gridBoxes';
import Footer from './footer';
// import playExample from '../components/images/playExample.webp'; // Corrected import path


// function PlayPlaces() {
//     // Define state for boxesData
//     const [boxesData, setBoxesData] = useState([
//         { id: 1, text: 'Play Place 1', link: '/playInfo', imageUrl: playExample},
//         { id: 2, text: 'Play Place 2' },
//         { id: 3, text: 'Play Place 3' },
//         { id: 4, text: 'Play Place 4' },
//         { id: 5, text: 'Play Place 5' },
//         { id: 6, text: 'Play Place 6' },
//         { id: 7, text: 'Play Place 7' },
//         { id: 8, text: 'Play Place 8' },
//         { id: 9, text: 'Play Place 9' },
//     ]);

//     // Function to update boxesData if needed
//     const updateBoxesData = (newData) => {
//         setBoxesData(newData);
//     };

//     return (
//         <div>
//             <Banner className="playstyles-background" text="Places to Play" />
//             <h1>I want to play at...</h1>
//             <hr />
//             {/* Pass boxesData and updateBoxesData as props */}
//             <GridBoxes data={boxesData} updateData={updateBoxesData} />
//             <Footer />
//         </div>
//     );
// }

// export default PlayPlaces;

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

function trackVisit() { // for impressions - track visit information in db
  const deviceType = getDeviceType();
  const page = 'playPlaces';
  const time_of_day = new Date();

  // Store the visit time, page, and device type in the database
  axios.post('http://localhost:8082/create', { time_of_day, page, deviceType })
    .then(response => {
      console.log('Visit time recorded:', response.data);
    })
    .catch(error => {
      console.error('Error recording visit time:', error);
    });
}

function Playplaces() {
  const [exdata, setExhibitData] = useState([]);
  useEffect(() => {
    axios({
      url: 'http://localhost:8082/exhibits',
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
  },[]);
  useEffect(() => {
    trackVisit();
  }, []); // empty dependency array ensures this runs once on mount

  return (
    <>
      <Banner className="playstyles-background" text="Places to Play" />
      <h1 className="user">I want to play at...</h1>
      <GridBoxes data={exdata} />
      <Footer />
    </>

  );
}

export default Playplaces;