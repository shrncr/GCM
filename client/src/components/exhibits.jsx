import React, { useState, useEffect } from 'react';
import GridBoxes from './gridBoxes';
import axios from 'axios'
/*
Uses gridboxes component to display exhibits 
*/

function Exhibits() {
  const [exdata, setExhibitData] = useState([]);
  const apiUrl = process.env.VERCEL_URL;
  useEffect(() => {
    axios({
      url: '${apiUrl}/exhibits',
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

  return (
    <GridBoxes data={exdata} />

  );
}

export default Exhibits;