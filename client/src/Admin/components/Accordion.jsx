import React, { useState } from 'react';

const Accordion = ({ ext1, ext2 }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Map through the ext1 prop to generate accordion items
    const items = ext1.map((info, index) => ({
        title: info, // Set title
        content: `Content for section ${index + 1}` // Set content (you can customize this)
    }));

    return (
        <div>
            {items.map((item, index) => (
                <div key={index} className="accordion">
                    <button
                        className="accordion-title"
                        onClick={() => toggleAccordion(index)}
                    >
                        {item.title}
                    </button>
                    {openIndex === index && (
                        <div className="accordion-content">
                            <p>{item.content}</p>
                            {ext2.map((info, index) => (
                                <button>{info}</button>
                            ))

                            }
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;



