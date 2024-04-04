import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackViewer = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  useEffect(() => {
    // Fetch feedback data from the server
    axios.get('http://localhost:5000/feedback')
      .then(response => {
        setFeedbackData(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedback data:', error);
      });
  }, []);

  // Function to handle exhibit selection
  const handleExhibitSelect = (exhibitId) => {
    setSelectedExhibit(exhibitId);
  };

  // Filter feedback data based on selected exhibit
  const filteredFeedbackData = selectedExhibit ? feedbackData.filter(feedback => feedback.exhibitId === selectedExhibit) : [];

  return (
    <div>
      <h2>Feedback Viewer</h2>
      <div>
        <h3>Select Exhibit:</h3>
        <select value={selectedExhibit} onChange={(e) => handleExhibitSelect(e.target.value)}>
          <option value="">Select Exhibit</option>
          
          <option value="Big John">Big John</option>
          <option value="Farm">Farm</option>
          <option value="Central Bank">Central Bank</option>
          <option value="Engineer's Workshop">Engineer's Workshop</option>
          <option value="Firehouse">Firehouse</option>
          <option value="Global Cafe">Global Cafe</option>
          <option value="Twinkle Stars Theather">Twinkle Stars Theather</option>
          <option value="Forts">Forts</option>
          <option value="Tugboat Tots">Tugboat Tots</option>
          <option value="Art Smart">Art Smart</option>
          <option value="KidsPort">KidsPort</option>
          <option value="Ice Cream Parlor">Ice Cream Parlor</option>
          <option value="Light Cloud">Light Cloud</option>
          <option value="Water's Journey">Water's Journey</option>
          <option value="Vet Clinic">Vet Clinic</option>
          <option value="St. Joseph's Children's Hospital">St. Joseph's Children's Hospital</option>
          <option value="Pizza Place">Pizza Place</option>
          <option value="Publix">Publix</option>
        </select>
      </div>
      <div>
        <h3>Feedback for Selected Exhibit:</h3>
        <ul>
          {filteredFeedbackData.map((feedback, index) => (
            <li key={index}>{feedback.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedbackViewer;
