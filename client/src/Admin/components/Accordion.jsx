import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import useSkillsLoader from "../classes/skillsLoader"
const Accordion = ({ skills, title }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    let ext = [];
    let desc = []
    switch (title) {
        case "Exhibits":
            skills.forEach((item) => {
                ext.push(item.skills)
                desc.push(item.description)
                let h = [];
                item.skills.forEach((act) => {
                    h.push(act.title)

                });
            });
            break;
        case "Playstyles":
            skills.forEach((item) => {
                ext.push(item.Activities)
                desc.push(item.desc)
                let h = [];
                item.Activities.forEach((act) => {
                    h.push(act.title)

                });




            });
            break;

        // Add other cases as needed
        default:
            // Default case
            break;
    }

    console.log(ext)

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
                            <p>{desc[index]}</p>
                            {ext[index].map((skill, index) => (
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



