import React, { useState, useEffect } from 'react';
import GridBoxes from './gridBoxes';
import axios from 'axios'

function Exhibits() {
    const [exdata, setExhibitData] = useState([]);
    useEffect(()=>{
        axios({
            url:'http://localhost:5000',
            method: 'GET',
            headers: {
              authorization:'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
            catch(error) {console.error('error:', error);
            alert('An error occured.')}
          }).then((res) => {
            setExhibitData(res.data)});
    });
    
    return (
        <GridBoxes  data = {exdata}/>
      
    );
  }
  
  export default Exhibits;