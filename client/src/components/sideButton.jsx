import React, { useState, useEffect } from 'react';
import GridBoxes from './gridBoxes';
import axios from 'axios'
import Cookies from "js-cookie";
import PlaystyleCheckbox from '../Admin/components/Checkbox';
/*
Uses gridboxes component to display exhibits 
*/

function SideButton() {
  const [ageRanges, setAgeRanges] = useState([]);
  
  const apiUrl = process.env.REACT_APP_API_URL;

  const getAge = () => {
    if (Cookies.get("ages")){
        console.log(Cookies.get("ages"))
        return Cookies.get("ages")
    }else{
        return false
    }
  };
const user  = getAge();

  return (
    
    <div>
        <p>Showing results for kids ages </p>
        <p>{user}</p>

    </div>
    
  );
}

export default SideButton;