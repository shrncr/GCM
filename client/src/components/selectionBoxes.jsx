import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import useSkillsLoader from '../Admin/classes/skillsLoader';

const apiUrl = process.env.REACT_APP_API_URL;
const SelectionBoxes = ({ skills, title, side, sel}) => {
    
    const [selectedItem, setSelectedItem] = useState(sel === null ? null : skills.find(skill => skill.title == sel));
    const [selPrompt, setSelPrompt] = useState((title === "Exhibits" ? "Select Activities" : "Select Skills"));
    
    useEffect(()=>{
        setSelectedItem(sel === null ? null : skills.find(skill => skill.title == sel));
        
        console.log(selectedItem)
    },[sel,skills])
     

    const navigate = useNavigate();
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        const item = skills.find(skill => skill.title === selectedValue);
        setSelectedItem(item);
    };
    console.log("HERE")
    console.log(title)
    let ext = [];
    let desc = [];
    let to;
    let h={};
    let type = "";
    function filterSkills(data) {
        return data.filter(item => 
            item.isAge == false ? 
            item : 
            false
        );
    }
    switch (title) {
        case "Exhibits":
            type = "n activity"
            to = "playstyles"
            console.log("RIGHT")
            console.log(skills)
            skills.forEach((item) => {
                side = "playstyles"
                ext.push(item.skills)
                desc.push(DOMPurify.sanitize(item.desc))
                //h = [];
                console.log(item.skills)
                item.skills.forEach((act) => {
                    axios({
                        url: `${apiUrl}/playstylesBySkill/${act}`,
                        method: 'GET',
                        headers: {
                          authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
                        },
                        catch(error) {
                          console.error('error:', error);
                          alert('An error occured.')
                        }
                      }).then((res) => {
                        console.log(res.data)
                        h[act] = res.data;
                        //h.push(res.data);
                        //setHomeText(res.data.desc)
                      });

                });
                console.log(h);
            });
            break;
        case "Playstyles":
            to = "exhibits"
            type = " skill"
            console.log(skills)
            
            skills.forEach((item) => {
                side = "playPlaces"
                //ext.push(item.Activities)
                desc.push(DOMPurify.sanitize(item.desc))
                let k = [];
                console.log(item)
                
            });
            break;

        // Add other cases as needed
        case "locations":
            to = "exhibits"
            type = " skill"
            console.log(skills)
            skills.forEach((item) => {
                side = "playPlaces"
                //ext.push(item.Activities)
                desc.push(DOMPurify.sanitize(item.desc))
                let k = [];
                console.log(item)
                
            });
            break;
        default:
            // Default case
            break;
    }

    console.log(ext)

    return (
        <div className='forDisplay'>
            <div className='roundedges holdbox' >
                <div className='dropdownOptions'>
                <select
                        className="minimal"
                        name="skills"
                        id="skills"
                        onChange={handleChange}
                        value={selectedItem ? selectedItem.title : ''}
                    >
                        <option value="">{selPrompt}</option>
                        {filterSkills(skills).map((item, index) => (
                            <option key={index} value={item.title}>{item.title}</option>
                        ))}
                    </select>
                </div>
                <div className='dropdownDetails'>
                    <p dangerouslySetInnerHTML={selectedItem ? {__html: selectedItem.desc} : {__html: `Please select a${type} for more information.`}}></p>
                    {selectedItem &&title==="Exhibits"? 
                    <div className='skills'>
                    {selectedItem.skills.map((skill, index) => (
                        <button className='skill' key={index} onClick={(e) => {(h[skill].length) > 0 ? navigate(`/playstyles/${h[skill][0]._id}`, {state: skill}) : navigate('/playstyles')}}>{skill}</button>
                    ))}
                </div>: <></>}    
                </div>
                
            </div>
        </div>
    );
};

export default SelectionBoxes;



