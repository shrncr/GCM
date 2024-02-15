import React, { useState } from 'react';
import axios from 'axios'; 

function ExhibitAdd() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000', { name, description });
      // Clear form after successful submission
      setName('');
      console.log("gibrd");
      setDescription('');
      alert('exhibit added');
    } catch (error) {
      console.error('error:', error);
      alert('An error occured.');
    }
  };

  return (
    <div>
      <h2>Add Exhibit</h2>
      <form onSubmit={handleSubmit}>
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
