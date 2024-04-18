/* Nested editor component */


import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom'


function NestedEditor() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const location = useLocation()
  let type = ''
  if (location.pathname.includes("playstyles") || location.pathname.includes("activities")) {
    type = "Skill:"
  } else if (location.pathname.includes("exhibits") || location.pathname.includes("skills")) {
    type = "Activity:"
  } else if (location.pathname.includes("map")) {
    type = "Playstyle:"
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Here you might want to send the data to a server or process it further
    setShowForm(false); // Optionally hide form after submit
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Add {type}</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default NestedEditor;
