import React, { useState } from 'react';
import axios from 'axios';

// ExhibitFeedback component for collecting feedback on exhibits
const ExhibitFeedback = ({ exhibitId }) => {
    // State for storing child's age and feedback submission status
    const [childAge, setChildAge] = useState('prefer-not-to-say');
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const apiUrl = process.env.VERCEL_URL;

    // Function to submit feedback
    const submitFeedback = (isPositive) => {
        axios.post(`${apiUrl}/feedback`, {
            exhibitId: exhibitId,
            isPositive: isPositive,
            childAge: childAge
        })
            .then((response) => {
                console.log(response); // Log response from server
                setFeedbackSubmitted(true); // Set feedbackSubmitted to true after successful submission
            })
            .catch((error) => {
                console.error(error); // Log error if submission fails
            });
    };

    return (
        <div>
            {/* Exhibit Feedback UI */}

            <h5>Did you find this exhibit helpful?</h5>
            {/* Dropdown to select visitor's age */}
            <div className='age-select'>
                <label htmlFor="child-age">Visitor's Age:</label>
                <select
                    id="child-age"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)} // Update childAge state based on selection
                >
                    {/* Option for prefer not to say */}
                    <option value="prefer-not-to-say">Prefer Not to Say</option>
                    {/* Options for ages 0 to 10 */}
                    {[...Array(11).keys()].map((age) => (
                        <option key={age} value={age}>{age}</option>
                    ))}
                </select>
            </div>

            <div className='fbut'>
                {/* Buttons for submitting positive and negative feedback */}
                <button className="feedback-button" onClick={() => submitFeedback(true)}>👍 Helpful</button>
                <button className="feedback-button" onClick={() => submitFeedback(false)}>👎 Not Helpful</button>
            </div>
            {/* Message displayed after feedback submission */}
            {feedbackSubmitted && <p>Thank you for your feedback!</p>}

        </div>
    );
};





export default ExhibitFeedback;
