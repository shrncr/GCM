//creates homepage with home screen info
import React, { useState, useEffect } from 'react';
import Banner from './banner';
import Footer from './footer';
import GridBoxes from './gridBoxes';
import axios from 'axios';
import Navbar from "./header";

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
  const page = 'home';
  const time_of_day = new Date();
  const apiUrl = process.env.VERCEL_URL;

  // Store the visit time, page, and device type in the database
  axios.post('${apiUrl}/create', { time_of_day, page, deviceType })
    .then(response => {
      console.log('Visit time recorded:', response.data);
    })
    .catch(error => {
      console.error('Error recording visit time:', error);
    });
}


function Home() {
  useEffect(() => {
    trackVisit();
  }, []); // empty dependency array ensures this runs once on mount
  const [boxesData, setBoxesData] = useState([
    { id: 1, title: 'Learn About Playstyles', link: '/playstyles'},
    { id: 2, title: 'Learn About Exhibits', link: '/playPlaces' },
    
]);

// Function to update boxesData if needed
const updateBoxesData = (newData) => {
  setBoxesData(newData);
};
  return (
    
    <div>
      <Navbar/>
      <Banner className="home-background" text="Welcome" />
      <h2>Glazer Children's Museum</h2>
      <hr></hr>
      <p>A learning laboratory where kids play, discover, and connect with the world around them to develop as lifelong learners and leaders.</p>
      <h3>What do we learn from play?</h3>
      <ul>
      <li>Function Skills (focus, adaptation, moderation, emotions)</li>
      <li>Social skills (communication)</li>
      <li>Problem solving (conflict resolution)</li>
      <li>Critical thinking (open mindedness, collaboration, questioning)</li>
      <li>Growth mindset (failing forward)</li>
      <li>Resilience (confidence, sticking to it)</li>
      <li>Self regulation (managing emotions)</li>
      </ul>
      <h3>How to Learn</h3>
      <p>Learn about the different playstyles or learn about what the museum's exhibits teach.</p>
      <GridBoxes data={boxesData} updateData={updateBoxesData} />      
      <Footer/>
    </div>
  );
}

export default Home;