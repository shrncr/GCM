import React, { useState, useEffect } from 'react';
import axios from 'axios';

// FeedbackViewer component for displaying feedback data
const FeedbackViewer = () => {
  // State variables for storing feedback data and selected exhibit
  const [feedbackData, setFeedbackData] = useState([]); // Feedback data from server
  const [selectedExhibit, setSelectedExhibit] = useState(null); // Selected exhibit ID
  const apiUrl = process.env.VERCEL_URL;
  // useEffect hook to fetch feedback data when component mounts
  useEffect(() => {
    // Fetch feedback data from the server
    axios.get(`${apiUrl}/feedback`)
      .then(response => {
        setFeedbackData(response.data); // Update feedbackData state with fetched data
      })
      .catch(error => {
        console.error('Error fetching feedback data:', error); // Log error if fetching fails
      });
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  // Function to handle exhibit selection
  const handleExhibitSelect = (exhibitId) => {
    setSelectedExhibit(exhibitId); // Update selectedExhibit state with the selected exhibit ID
  };

  // Filter feedback data based on selected exhibit
  const filteredFeedbackData = selectedExhibit ? feedbackData.filter(feedback => feedback.exhibitId === selectedExhibit) : [];

  return (
    <div>
      {/* Title */}
      <h2>Feedback Viewer</h2>
      {/* Dropdown to select exhibit */}
      <div>
        <h3>Select Exhibit:</h3>
        <select value={selectedExhibit} onChange={(e) => handleExhibitSelect(e.target.value)}>
          {/* Default option */}
          <option value="">Select Exhibit</option>
          {/* Options for each exhibit */}
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
          {/* Add more exhibit options */}
        </select>
      </div>
      {/* Display feedback for selected exhibit */}
      <div>
        <h3>Feedback for Selected Exhibit:</h3>
        <ul>
          {/* Render each feedback item */}
          {filteredFeedbackData.map((feedback, index) => (
            <li key={index}>{feedback.text}</li> // Display feedback text
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedbackViewer;
