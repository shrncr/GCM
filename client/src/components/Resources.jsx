//creaetes resources page
import React, { useState, useEffect } from 'react';
import Banner from './banner';
import Footer from './footer';
import axios from 'axios';



  
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


function Resources() {
  const [interactions, setInteractions] = useState(0);
  const deviceType = getDeviceType(); // Device type is determined once on component mount.

  useEffect(() => {
    const page = 'resources';
    const time_of_day = new Date();

    // Create impression and start session tracking
    axios.post('http://localhost:8082/api/impressions/create', { time_of_day, page, deviceType })
      .then(response => {
        console.log('Visit and session start recorded:', response.data);
      })
      .catch(error => {
        console.error('Error recording visit and session start:', error);
      });

    function handleUnload() {
      const sessionEnd = new Date();
      const sessionDuration = sessionEnd - time_of_day; // Duration in milliseconds

      axios.post('http://localhost:8082/sessions/end', {
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

  useEffect(() => {
    function registerInteraction() {
      setInteractions(current => current + 1);
    }

    window.addEventListener('click', registerInteraction);
    window.addEventListener('scroll', registerInteraction);

    return () => {
      window.removeEventListener('click', registerInteraction);
      window.removeEventListener('scroll', registerInteraction);
    };
  }, []);
  return (
    
    <div>
      <Banner className="home-background" text="Resources" />
      <h2>More Info</h2>
      <hr></hr>
      <p>The Glazer Children's Museum offers many additional resources.</p>
      <h3>Things to Checkout</h3>
      <ul>
      <li>Podcast</li>
      <li><a href="https://www.instagram.com/glazerchildrensmuseum/?hl=en">Instagram</a></li>
      <li><a href="https://www.facebook.com/GlazerChildrensMuseum/">Facebook</a></li>
      </ul>
      <h3>Why was this website created?</h3>
      <p>
  The goal of this website is to educate parents on the
  <a href="/playstyles"> types of learning</a>. 
  You can find numerous examples of how to implement these learning styles at the 
  <a href="/playstyles"> museum</a>, at home, and around Tampa.
</p>
<p>Website Created by: Zac Swisher, Sara Hrnciar, Eboni Huggins, Carter Murawski, Luke Talham, and Nathan Frait </p>
      <Footer/>
    </div>
  );
}

export default Resources;