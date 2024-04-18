//creaets page for playstyles
import React, { useState, useEffect } from 'react';
import Banner from './banner';
import GridBoxes from './gridBoxes';
import Footer from './footer'; // Corrected import path

import axios from 'axios'

function PlayStylesPage() {
  const [exdata, setExhibitData] = useState([]);
  useEffect(() => {
    axios({
      url: 'http://localhost:8082/playstyles',
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
  });

// store the visit time and page in the database
useEffect(() => { // useEffect hook for tracking the visit
  const time_of_day = new Date(); // capture the visit time
  const page = 'playPlaces'
  axios.post('http://localhost:8082/create', { time_of_day, page })
    .then(response => {
      console.log('Visit time recorded:', response.data); // success :P
    })
    .catch(error => {
      console.error('Error recording visit time:', error); // error :<
    });
}, []); // empty dependency array ensures this runs once on mount
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