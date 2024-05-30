import React, { useState, useEffect } from 'react';
import GridBoxes from './gridBoxes';
import axios from 'axios'
import Cookies from "js-cookie";
import PlaystyleCheckbox from '../Admin/components/Checkbox';
/*
Uses gridboxes component to display exhibits 
*/

function AskCookie() {
  const [ageRanges, setAgeRanges] = useState([]);
  const [selAges, setSelAges] = useState([]);
  const [selOn, setSelOn] = useState('popup');
  
  const apiUrl = process.env.REACT_APP_API_URL;

  //sets cookie for selected ages if necessary
  const applyFilter = (applyingAges) => {
    setSelOn("invisible")
    if (applyingAges){
        Cookies.set('ages',selAges);
    }else{
        Cookies.set('ages',"all")
    }
  }
  //gets all currently available age ranges
  useEffect(() => {
    axios({
      url: `${apiUrl}/ageRanges`,
      method: 'GET',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
      catch(error) {
        console.error('error:', error);
        alert('An error occured.')
      }
    }).then((res) => {
        console.log(res.data)
      setAgeRanges(res.data)
    });
  }, []);
  
  //func to toggle age upon click
  const toggleAge = (age) =>{
    setSelAges((prevSelected) => {
        if (prevSelected.includes(age)) {
          return prevSelected.filter(ps => ps !== age);
        } else {
          return [...prevSelected, age];
        }
      });
  }
  
  return (
    <div className={selOn} >
        <div className= "popupText">
        <h4 id="ageHead">What age ranges do your children fall between?</h4>
        <div id="ageSel">
        {ageRanges.map((range) => (
                            <div className="meep">
                            <PlaystyleCheckbox key={range.title} label={range.title} color={"pink"} onSelect={toggleAge} start={false} item={range.title} />
                            </div>
                        ))}
                        <div className='meep'>
                        <PlaystyleCheckbox key={"no"} label={"Prefer not to say"} color={"pink"} onSelect={toggleAge} start={false} item={"no"}/>
                        </div>
        </div>
        <div className='buttons-container' >
            <button className='innerButton' style={{"border-bottom-left-radius": "20px"}} onClick={() => applyFilter(true)}>Submit</button>
            <button className='innerButton'style={{"border-bottom-right-radius": "20px"}} onClick={() => applyFilter(false)}>Cancel</button>
        </div>
        </div> 
    </div>
  );
}

export default AskCookie;