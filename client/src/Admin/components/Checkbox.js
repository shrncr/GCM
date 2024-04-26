/* Checkbox 

This component is the setup for how we create the buttons on the
admin edit/add page. The buttons have multiple parameters that
can customize the label, color, function, and starting value of each
button.
*/

// Required import
import React, { useState } from 'react';

/* Main function. Takes 4 parameters to ensure every button can be
fully customized.*/
function PlaystyleCheckbox({ label, color, onSelect, start, item }) {
  const [isChecked, setIsChecked] = useState(start);

  /* This function gives us the ability to combine what we want
  the button to control as well as make it fill in when it is selected */
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onSelect(item)
  };
  /* Small bit of css that controls what the button looks like
  before selection */
  const checkboxStyle = {
    backgroundColor: isChecked ? color : 'transparent',
    borderColor: isChecked ? color : '#ccc',
    color: isChecked ? 'white' : 'inherit',
  };

  // Returns the button with the style and function given.
  return (
    <div
      className="checkbox-container"
      onClick={toggleCheckbox}
      style={checkboxStyle}
    >
      {label}
    </div>
  );
}

export default PlaystyleCheckbox;
