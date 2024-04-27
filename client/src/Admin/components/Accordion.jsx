import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import useSkillsLoader from "../classes/skillsLoader"
const Accordion = ({ skills, title, side }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    console.log("HERE")
    console.log(title)
    let ext = [];
    let desc = [];
    let to;
    switch (title) {
        case "Exhibits":
            console.log("RIGHT")
            console.log(skills)
            skills.forEach((item) => {
                to = "playstyles"
                ext.push(item.skills)
                desc.push(DOMPurify.sanitize(item.description))
                let h = [];
                item.skills.forEach((act) => {
                    h.push(act.title)

                });
            });
            break;
        case "Playstyles":
            to = "exhibits"
            skills.forEach((item) => {
                ext.push(item.Activities)
                desc.push(DOMPurify.sanitize(item.desc))
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
        <div >
            <div className='roundedges'>
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
                                <p className="description" dangerouslySetInnerHTML={{ __html: desc[index] }} />
                                <div className='acc-butt-cont'>
                                    {ext[index].map((skill, index) => (
                                        <button key={index} onClick={(e) => navigate(`${side}/${to}`)}>{skill}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accordion;



