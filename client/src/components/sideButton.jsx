import React, { useState, useEffect } from 'react';
import GridBoxes from './gridBoxes';
import axios from 'axios'
import Cookies from "js-cookie";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import PlaystyleCheckbox from '../Admin/components/Checkbox';
/*
Uses gridboxes component to display exhibits 
*/

function SideButton() {
  let [ageRanges, setAgeRanges] = useState(null)
  let [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    console.log(event)
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  useEffect(() => {
      if (Cookies.get("ages")) {
          console.log(Cookies.get("ages"));
          setOpen(true)
          setAgeRanges(Cookies.get("ages").split(',')); // Assuming the ages are stored as a comma-separated string
      } else {
          setAgeRanges([]);
      }
      setOpen(true)
  }, []);



  return (
    <>
    {ageRanges && <Snackbar action={action}open={open} autoHideDuration={5000}  onClose={handleClose}message={`Showing ages: ${ageRanges}`}/>}
    </>
  );
}

export default SideButton;