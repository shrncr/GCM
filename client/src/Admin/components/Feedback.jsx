import React, { useState } from 'react';
import axios from 'axios';

const ExhibitFeedback = ({ exhibitId }) => {
    const [childAge, setChildAge] = useState('prefer-not-to-say');
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    const submitFeedback = (isPositive) => {
        axios.post('http://localhost:8082/feedback', {
            exhibitId: exhibitId,
            isPositive: isPositive,
            childAge: childAge
        })
            .then((response) => {
                console.log(response);
                setFeedbackSubmitted(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Exhibit Feedback</h2>
            <p>Did you find this exhibit helpful?</p>
            <label htmlFor="child-age">Visitor's Age:</label>
            <select
                id="child-age"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
            >
                <option value="prefer-not-to-say">Prefer Not to Say</option>
                {[...Array(11).keys()].map((age) => (
                    <option key={age} value={age}>{age}</option>
                ))}
            </select>
            <br /><br />
            <button className="feedback-button" onClick={() => submitFeedback(true)}>👍 Helpful</button>
            <button className="feedback-button" onClick={() => submitFeedback(false)}>👎 Not Helpful</button>
            {feedbackSubmitted && <p>Thank you for your feedback!</p>}
        </div>
    );
};

const Exhibit = ({ exhibitId, exhibitName }) => {
    return (
        <div>
            <h3>{exhibitName}</h3>
            <ExhibitFeedback exhibitId={exhibitId} />
        </div>
    );
};

const App = () => {
    return (
        <div>
            <h1>Museum Exhibits</h1>
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
