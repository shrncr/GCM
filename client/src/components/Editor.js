import React, { useEffect, useState } from 'react';
import './Editor.css';
//import axios from 'axios'
//const axios = require('axios')

// Editor function
function Editor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  // Image changer
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  // Submit
  const handleSubmit = () => {
    const isConfirmed = window.confirm('Are you sure you want to submit these changes? Click OK to confirm.');
    if (isConfirmed) {
      alert('Changes Submitted.');
      /*
      useEffect( async (e) =>{
        try {
          await axios.post('http://localhost:5000', { setTitle, setDescription, setImage }); //post title, description, and image as json obj to base route of the server
        } catch(error){
          console.error('error:', error);
          alert('An error occured.');
        }*/
      // Clear the editor boxes
      setTitle('');
      setDescription('');
      setImage(null);
    };
  };

  return (
    <div className="editor">
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      {image && <img src={image} alt="Preview" className="image-preview" />}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
      />
      <input
        type="checkbox"
        className="btn-check"
        id="btn-check-2-outlined"
        checked={isChecked}
        onChange={handleCheckboxChange}
        autoComplete="off"
      />
      <label className="btn btn-outline-secondary" htmlFor="btn-check-2-outlined">
        Make visible?
      </label>

      <button onClick={handleSubmit}>Submit</button>
    </div>
)};

export default Editor;