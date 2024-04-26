import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import useSkillsLoader from "../classes/skillsLoader"
const Accordion = ({ exhibit, location }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const skills = useSkillsLoader({ exhibit, location });

    return (
        <div>
            {skills.map((item, index) => (
                <div key={index} className="accordion">
                    <button
                        className="accordion-title"
                        onClick={() => toggleAccordion(index)}
                    >
                        {item.title}
                    </button>
                    {openIndex === index && (
                        <div className="accordion-content">
                            <p>{item.description}</p>
                            {item.skills.map((skill, index) => (
                                <button key={index}>{skill}</button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;



