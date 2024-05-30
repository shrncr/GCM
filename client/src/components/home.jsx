//creates homepage with home screen info
import React, { useState, useEffect } from 'react';
import Banner from './banner';
import Footer from './footer';
import GridBoxes from './gridBoxes';
import axios from 'axios';
import AskCookie from './cookieAge';
import Navbar from "./header";
const apiUrl = process.env.REACT_APP_API_URL;

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
  const apiUrl = process.env.REACT_APP_API_URL;

  // Store the visit time, page, and device type in the database
  axios.post(`${apiUrl}/create`, { time_of_day, page, deviceType })
    .then(response => {
      console.log('Visit time recorded:', response.data);
    })
    .catch(error => {
      console.error('Error recording visit time:', error);
    });
}


function Home() {
  let [HomeText, setHomeText] = useState('');

  useEffect(()=>{
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

  },[])

  useEffect(() => {
    trackVisit();
  }, []); // empty dependency array ensures this runs once on mount
  const [boxesData, setBoxesData] = useState([
    { id: 1, title: 'Browse Playstyles', link: '/playstyles'},
    { id: 2, title: 'Browse Exhibits', link: '/playPlaces' },
    
]);

// Function to update boxesData if needed
const updateBoxesData = (newData) => {
  setBoxesData(newData);
};
  return (
    
    <div>
      <Navbar/>
      
      <Banner className="home-background" text="Welcome" />
      
      <p dangerouslySetInnerHTML={{ __html: HomeText }}></p>
      <GridBoxes data={boxesData} updateData={updateBoxesData} />  
      <AskCookie/>    
      <Footer/>
    </div>
  );
}

export default Home;