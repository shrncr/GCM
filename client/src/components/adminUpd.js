import React, { useState } from 'react';
import axios from 'axios'; 
//change the ui
function ExhibitAdd() {
  //name and descriptions are variables which start as emty strings. upone calling setname/setdesc, they will change to whatever is defined
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000', { name, description }); //post name and description as json obj to base route of the server
      // Clear form after successful submission
      setName('');
      console.log("gibrd");
      setDescription('');
      alert('exhibit added'); 
    } catch (error) { //error handling
      console.error('error:', error);
      alert('An error occured.');
    }
    const handleImageChange = (e) =>{
      setImage(e.target.files[0]);
    }
  };
  //the html returned
  return (
    <div> 
      <h2>Add Exhibit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ExhibitAdd;
