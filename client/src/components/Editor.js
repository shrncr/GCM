import React, { useEffect, useState } from 'react';
import './Editor.css';
import axios from 'axios'

// Editor function
function Editor() {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
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

      axios({
        url: 'http://localhost:8082/admin/addexhibit',
        method: 'POST',
        headers: {
          authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
        },
        data: { "name": title, "desc": about, "checked": isChecked, "image": image },

        catch(error) {
          console.error('error:', error);
          alert('An error occured.')
        }
      });
      /*
      IF THE ABOVE AXIOS IS NOT WORKING, TEST THIS:
      useEffect( async (e) =>{
        try {
          await axios.post('http://localhost:8082', { setTitle, setAbout, setImage, setIsChecked }); //post title, about, image, and visibility as json obj to base route of the server
        } catch(error){
          console.error('error:', error);
          alert('An error occured.');
        }
      });
      */
      // Clear the editor boxes
      setTitle('');
      setAbout('');
      setImage(null);
      setIsChecked(false);
    };
  };

  return (
    <div className="editor">
      <label className="Editor-header"
      >Welcome</label>
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
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        placeholder="Enter about section"
      />
      <input
        type="checkbox"
        className="btn-check"
        checked={isChecked}
        onChange={handleCheckboxChange}
        autoComplete="off"
      />
      <label htmlFor="myCheck">
        Make visible?
      </label>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
};

export default Editor;