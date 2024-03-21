import React, { useState } from 'react';

function PlaystyleCheckbox({ label, color, onSelect }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onSelect(label)
  };

  const checkboxStyle = {
    backgroundColor: isChecked ? color : 'transparent',
    borderColor: isChecked ? color : '#ccc',
    color: isChecked ? 'white' : 'inherit',
  };

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
