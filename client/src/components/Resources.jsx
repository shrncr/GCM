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
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sit rem nisi maiores molestiae, ad asperiores illum earum facere recusandae explicabo praesentium minima eos sed, voluptates porro, dicta nihil eveniet.</p>
      <h3>Things to Checkout</h3>
      <ul>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>

        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>
      </ul>
      <h3>Aditional Info</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aspernatur vero distinctio unde, minima, doloremque et, sunt iusto quia obcaecati quidem ut aperiam. Est nostrum dolorum eaque praesentium nihil dicta!</p>
      <Footer/>
    </div>
  );
}

export default Resources;