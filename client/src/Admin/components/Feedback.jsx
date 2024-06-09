import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';

// ExhibitFeedback component for collecting feedback on exhibits
const ExhibitFeedback = ({ exhibitId }) => {
    // State for storing child's age and feedback submission status
    const [childAge, setChildAge] = useState('prefer-not-to-say');
    const [rating, setRating] = useState(2);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
          color: '#ff3d47',
        },
    });


    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    // Function to submit feedback
    const submitFeedback = (isPositive) => {
        console.log(rating)
        console.log(value)
        axios.post(`${apiUrl}/feedback`, {
            exhibitId: exhibitId,
            rating: rating,
            childAge: childAge,
        })
            .then((response) => {
                console.log(response); // Log response from server
                setFeedbackSubmitted(true); // Set feedbackSubmitted to true after successful submission
            })
            .catch((error) => {
                console.error(error); // Log error if submission fails
            });
    };

    const options = [
        'Prefer Not To Say',
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
      ];
      
      function ConfirmationDialogRaw(props) {
        const { onClose, value: valueProp, open, ...other } = props;
        const [value, setValue] = React.useState(valueProp);
        const radioGroupRef = React.useRef(null);
      
        useEffect(() => {
          if (!open) {
            setValue(valueProp);
          }
        }, [valueProp, open]);
      
        const handleEntering = () => {
          if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
          }
        };
      
        const handleCancel = () => {
          onClose();
        };
      
        const handleOk = () => {
          onClose(value);
        };
      
        const handleChange = (event) => {
          setValue(event.target.value);
        };
      
        return (
          <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
          >
            <DialogTitle>Child's Age</DialogTitle>
            <DialogContent dividers>
              <RadioGroup
                ref={radioGroupRef}
                aria-label="ringtone"
                name="ringtone"
                value={value}
                onChange={handleChange}
              >
                {options.map((option) => (
                  <FormControlLabel
                    value={option}
                    key={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
          </Dialog>
        );
      }
      
      ConfirmationDialogRaw.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        value: PropTypes.string.isRequired,
      };
      

        const [open, setOpen] = React.useState(false);
        const [value, setValue] = React.useState('Prefer Not To Say');
      
        const handleClickListItem = () => {
          setOpen(true);
        };
      
        const handleClose = (newValue) => {
          setOpen(false);
      
          if (newValue) {
            setValue(newValue);
          }
        };
      
    return (
        <>
        <div className='feedbackBox'>
        { !feedbackSubmitted && <List component="div" role="group">
                    {/* Exhibit Feedback UI */}
            

            
          <ListItemButton divider disabled>

        </ListItemButton>
        <ListItemButton
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="Child's Age"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Child's Age" secondary={value} />
        </ListItemButton>

        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />


    <div className="rateBox">
            <Typography component="legend">Activity Rating</Typography>
            <StyledRating
                name="customized-color"
                value={rating}
                onChange={handleRatingChange}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
            </div>
      </List> }

      {feedbackSubmitted ? <p>Thank you for your feedback!</p> : <Button  color="primary" onClick={() => submitFeedback()}>
                Submit Feedback
            </Button>}
            </div> 
            
            {/* Message displayed after feedback submission */}
        </>
    );
};


export default ExhibitFeedback;
