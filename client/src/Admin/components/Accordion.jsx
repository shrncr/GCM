import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const Accordion = ({ exhibit, location }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [skills, setSkills] = useState([]);
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    let dest;
    switch (location) {
        case "Playstyles":
            dest = "playstyles"
            break;
        case "Exhibits":
            dest = "playplaces"
            break;
    }
    useEffect(() => {
        axios.get(`http://localhost:8082/${dest}/${exhibit._id}`)
            .then((res) => {
                const { baseData, dropdown } = res.data;
                setSkills(dropdown);

            })
            .catch((err) => {
                console.log('Error:', err);
            });
    }, [exhibit._id, dest]);
    console.log(skills)



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



