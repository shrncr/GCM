import React, { useState } from 'react';
import axios from 'axios';

// ExhibitFeedback component for collecting feedback on exhibits
const ExhibitFeedback = ({ exhibitId }) => {
    // State for storing child's age and feedback submission status
    const [childAge, setChildAge] = useState('prefer-not-to-say');
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    // Function to submit feedback
    const submitFeedback = (isPositive) => {
        axios.post('http://localhost:8082/feedback', {
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
            <h2>Exhibit Feedback</h2>
            <p>Did you find this exhibit helpful?</p>
            {/* Dropdown to select visitor's age */}
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
            <br /><br />
            {/* Buttons for submitting positive and negative feedback */}
            <button className="feedback-button" onClick={() => submitFeedback(true)}>👍 Helpful</button>
            <button className="feedback-button" onClick={() => submitFeedback(false)}>👎 Not Helpful</button>
            {/* Message displayed after feedback submission */}
            {feedbackSubmitted && <p>Thank you for your feedback!</p>}
        </div>
    );
};

// Exhibit component representing a single exhibit
const Exhibit = ({ exhibitId, exhibitName }) => {
    return (
        <div>
            {/* Exhibit name */}
            <h3>{exhibitName}</h3>
            {/* Render ExhibitFeedback component within Exhibit */}
            <ExhibitFeedback exhibitId={exhibitId} />
        </div>
    );
};

// App component representing the main application
const App = () => {
    return (
        <div>
            {/* Header */}
            <h1>Museum Exhibits</h1>
            {/* Render Exhibit components for various exhibits */}
            <Exhibit exhibitId={1} exhibitName="Big John" />
            <Exhibit exhibitId={2} exhibitName="Central Bank" />
            <Exhibit exhibitId={3} exhibitName="Engineer's Workshop" />
            <Exhibit exhibitId={4} exhibitName="Firehouse" />
            <Exhibit exhibitId={5} exhibitName="Global Cafe" />
            <Exhibit exhibitId={6} exhibitName="Twinkle Stars Theather" />
            <Exhibit exhibitId={7} exhibitName="Forts" />
            <Exhibit exhibitId={8} exhibitName="Tugboat Tots" />
            <Exhibit exhibitId={9} exhibitName="Art Smart" />
            <Exhibit exhibitId={10} exhibitName="Kidsport" />
            <Exhibit exhibitId={11} exhibitName="Ice Cream Parlor" />
            <Exhibit exhibitId={12} exhibitName="Light Cloud" />
            <Exhibit exhibitId={13} exhibitName="Water's Journey" />
            <Exhibit exhibitId={14} exhibitName="Vet Clinic" />
            <Exhibit exhibitId={15} exhibitName="St. Joseph's Children's Hospital " />
            <Exhibit exhibitId={16} exhibitName="Pizza Place" />
            <Exhibit exhibitId={17} exhibitName="Publix" />
            {/* Add more Exhibit components for other exhibits */}
        </div>
    );
};

export default App;
