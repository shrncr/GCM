//creaetes resources page
import React, { useState, useEffect } from 'react';
import Banner from './banner';
import Footer from './footer';
import axios from 'axios';
import GridBoxes from './gridBoxes';
import Navbar from './header';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';

function Resources() {
  const apiUrl = process.env.REACT_APP_API_URL;

  let [HomeText, setHomeText] = useState('');

  const [boxesData, setBoxesData] = useState([
    { id: 1, title: 'Instagram', link: 'https://www.instagram.com/glazerchildrensmuseum/?hl=en', icon: InstagramIcon },
    { id: 2, title: 'Facebook', link: 'https://www.facebook.com/GlazerChildrensMuseum/', icon: FacebookIcon },
    { id: 1, title: 'Youtube', link: 'https://www.youtube.com/c/glazerchildrensmuseum', icon: YouTubeIcon},
    { id: 2, title: 'LinkedIn', link: 'https://www.linkedin.com/company/glazer-children\'s-museum', icon: LinkedInIcon },
    { id: 3, title: 'Book A Visit', link: 'https://glazermuseum.org/', icon: LanguageIcon },
    //{ id: 3, title: 'Podcast', link: '/', icon: PodcastsIcon },
  ]);
  const updateBoxesData = (newData) => {
    setBoxesData(newData);
  };

  useEffect(()=>{
      axios({
          url: `${apiUrl}/resources`,
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

  return (
    
    <div>
      <Navbar/>
      <Banner className="home-background" text="About" />
      <p dangerouslySetInnerHTML={{ __html: HomeText }}></p>
      <GridBoxes data={boxesData} updateData={updateBoxesData} />
      <div className='creators'>
        <p>Website Created By : Sara Hrnciar, Carter Murawski, Zachary Swisher, Nathaniel Frait, Luke Talham, and Eboni Huggins under The University of Tampa Computer Science Department</p>
        <p>Content Created By : Allison Wieland, Heather Berwanger under The University of Tampa Psychology Department</p>
      </div>
      
      <Footer/>
    </div>
  );
}

export default Resources;