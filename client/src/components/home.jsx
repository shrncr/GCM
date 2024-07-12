import React, { useState, useEffect,useRef } from 'react';
import Banner from './banner';
import Footer from './footer';
import GridBoxes from './gridBoxes';
import axios from 'axios';
import DOMPurify from 'dompurify';
import Breadcrumb from './crumb';
import { useIntersection } from './useIntersection';
import Navbar from "./header";
import { PiHouseSimple } from "react-icons/pi";
import { PiGameControllerLight } from "react-icons/pi";
import { PiPersonArmsSpread } from "react-icons/pi";
import AskCookie from './cookieAge';
import { MdOutlineFamilyRestroom } from "react-icons/md";
const apiUrl = process.env.REACT_APP_API_URL;
const kids = require(`./images/playExample.webp`)
function Home() {

  const triggerRef1 = React.useRef(null);
  const isVisible1 = useIntersection(triggerRef1, "0px");

  const triggerRef2 = React.useRef(null);
  const isVisible2 = useIntersection(triggerRef2, "0px");
  
  const triggerRef3 = React.useRef(null);
  const isVisible3 = useIntersection(triggerRef3, "0px");
  
  const triggerRef4 = React.useRef(null);
  const isVisible4 = useIntersection(triggerRef4, "0px");
  


  const paragraphRef = useRef(null);
  const [HomeText, setHomeText] = useState('');
  const [showCookiePopup, setShowCookiePopup] = useState(false); // Set initial state to false
  const handleAskCookieClick = () => {
      setShowCookiePopup(prevState => !prevState); // Toggle the popup state
    };
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
    { id: 1, title: 'Playstyles', link: '/playstyles', icon: PiGameControllerLight },
    { id: 2, title: 'Museum Play', link: '/playPlaces', icon: PiPersonArmsSpread },
    { id: 3, title: 'Home Play', link: '/athome', icon: PiHouseSimple },
  ]);

  const updateBoxesData = (newData) => {
    setBoxesData(newData);
  };



  return (
    <div>
      <Navbar />
      <div id={"mainBanner"}>
            
            <div 
            
            className={`background-imagehome ${"https://gcmchildrensmuseum.s3.amazonaws.com/Banner+Bay+Play.png"}`} style={{ backgroundImage: `url(${"https://gcmchildrensmuseum.s3.amazonaws.com/glazer_banner.jpg"})` }}>
                <div className="intro-text">
                    
                    <h1>{"Purposeful Play: "}</h1>
                    <h5>{"A Research Project Conducted by the University of Tampa in support of the Glazer Children`s Museum"}</h5>
                    <Breadcrumb/>
                    
                </div>
                
                
                <button className="scrollDown" onClick = {() => 
                  paragraphRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  })
                }> Check Out Ways to Play </button>
                <button className="popupButton" onClick={() => setShowCookiePopup(prevState => !prevState)}>
                <MdOutlineFamilyRestroom  className='popupButtonIconHome'/>
            </button>
            
            </div>
            
            {showCookiePopup && <AskCookie />}
            
            </div>
      <div className='blurbs'>
        <div  className={'playstylesContainer' }>
          <img ref={triggerRef1} className={"kids"+ (isVisible1 ? " appear" :  " animateinvis")} src= {"https://gcmchildrensmuseum.s3.us-east-2.amazonaws.com/GCM+Museum+Play.webp"}></img>
          <div ref={triggerRef2} className={"purposeful" + (isVisible2 ? " appear" :  " animateinvis")}>
            <p className={"purposefulText"}>The museum provides children with the opportunity for purposeful play!</p>
          </div>
        </div>
        <div  className={'playstylesContainer' }>
          <img  ref={triggerRef3} className={"alt kids "+ (isVisible3 ? " appear" :  " animateinvis")} src= {"https://gcmchildrensmuseum.s3.us-east-2.amazonaws.com/GCM+Playstyles.webp"}></img>
          <div ref={triggerRef4} className={"alt2 purposeful "+ (isVisible4 ? " appear" :  " animateinvis")}>
            <p className={"purposefulText"}>Purposeful play helps develop communication, resilience, and critical thinking skills.</p>
          </div>
        </div>
      </div>

      <div ref={paragraphRef}>
        <h4 className='learn'>Click an Icon Below to Learn More!</h4>
      <GridBoxes data={boxesData} updateData={updateBoxesData} />
      </div>
                
                
      
      <Footer />
    </div>
  );
}

export default Home;
