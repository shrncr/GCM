//Function to create an accordian component to display an collapse info

import React, { useState } from 'react';

const Accordion = ({ items, keepOthersOpen }) => {
    //run thrrough and creates all the skills
    console.log(items)
    console.log("RIGHT ABOVE")
    const [data, setData] = useState(items.map(skill => ({
        id: skill.id,
        label: skill.title,
        renderContent: () => (
            <div>
                <p>{skill.desc}</p>
                <div className="link-container-accordion">
                    {skill.Activities.map((act, index) => (
                        <button>{act}</button>
                    ))}
                </div>
            </div>
        )
    })));
    //then you make each into an accordian item 
    const [accordionItems, setAccordionItems] = useState(data.map(item => ({ ...item, toggled: false })));
    // expands and contracts when clicked
    function handleAccordionToggle(clickedItem) {
        setAccordionItems(accordionItems.map(item => ({
            ...item,
            toggled: item.id === clickedItem.id ? !item.toggled : (keepOthersOpen ? item.toggled : false)
        })));
    }
    //returns accordian
    return (
        <div className='accordion-parent'>
            {accordionItems.map((listItem, key) => (
                <div className={`accordion ${listItem.toggled ? 'toggled' : ''}`} key={key}>
                    <button className='toggle' onClick={() => handleAccordionToggle(listItem)}>
                        <p className={listItem.special ? 'special-paragraph' : ''}>{listItem.label}</p> {/* Adding conditional class */}
                        <div className='direction-indicator'>{listItem.toggled ? '-' : '+'}</div>
                    </button>
                    <div className={`content-parent ${listItem.toggled ? 'toggled' : ''}`}>
                        <div className='content'>{listItem.renderContent()}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
