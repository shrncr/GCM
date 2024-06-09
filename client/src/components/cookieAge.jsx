import React, { useState, useEffect } from 'react';
import GridBoxes from './gridBoxes';
import axios from 'axios';
import Cookies from "js-cookie";
import PlaystyleCheckbox from '../Admin/components/Checkbox';

function AskCookie() {
  const [ageRanges, setAgeRanges] = useState([]);
  const [selAges, setSelAges] = useState([]);
  const [selOn, setSelOn] = useState('popup');
  
  const apiUrl = process.env.REACT_APP_API_URL;

  const applyFilter = (applyingAges) => {
    setSelOn("invisible");
    if (applyingAges) {
      Cookies.set('ages', selAges);
    } else {
      Cookies.set('ages', []);
    }
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/ageRanges`,
      method: 'GET',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
      catch(error) {
        console.error('error:', error);
        alert('An error occurred.');
      }
    }).then((res) => {
      setAgeRanges(res.data);
    });
  }, []);
  
  const toggleAge = (age) => {
    setSelAges((prevSelected) => {
      if (prevSelected.includes(age)) {
        return prevSelected.filter(ps => ps !== age);
      } else {
        return [...prevSelected, age];
      }
    });
  }

  return (
    <div className={selOn}>
      <div className="popup-container">
        <button className="cancel-button" onClick={() => applyFilter(false)}>X</button>
        <h4 className="popup-header">What age ranges do your children fall between?</h4>
        <p className="popup-subtext">You can select multiple age ranges.</p>
        <div className="age-selection">
          {ageRanges.map((range) => (
            <div key={range.title} className="age-checkbox">
              <PlaystyleCheckbox
                label={range.title}
                color={"#2383c6"}
                onSelect={toggleAge}
                start={false}
                item={range.title}
              />
            </div>
          ))}
        </div>
        <div className="buttons-container">
          <button className="submit-button" onClick={() => applyFilter(true)}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AskCookie;
