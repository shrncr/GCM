import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PlaystyleCheckbox from './Checkbox';
import axios from 'axios';
import NameLoader from './NameLoader';
function DropdownForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        connections: []
    });

    const location = useLocation()
  let type = ''
  let submitType = ''
  if (location.pathname.includes("playstyles") || location.pathname.includes("activities")) {
    type = "Skill"
    submitType = "skills"
  } else if (location.pathname.includes("exhibits") || location.pathname.includes("skills")) {
    type = "Activity"
    submitType = "activities"
  } else if (location.pathname.includes("map")) {
    type = "Playstyle"
    submitType = "playstyles"
}
    const toggleDropdown = (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios({ //make request
            url: 'http://localhost:8082/admin/addactivity',
            method: 'POST',
            data: formData,
            headers: {
              authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
            catch(error) {
              console.error('error:', error);
              alert('An error occured.')
            }
          }).then((res) => {
          });
        setIsOpen(false);
    };

  let nestedCheckboxesTitle = ""
  let nestedStartVal = false
    const [nestedCheckboxArr, setNestedCheckboxArr] = useState([]);
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    const [nestedSelectedOptions, setNestedSelectedOptions] = useState([]);
    const toggleNestedOption = (playstyle) => {
      setNestedSelectedOptions((prevSelected) => {
        if (prevSelected.includes(playstyle)) {
          return prevSelected.filter(ps => ps !== playstyle);
        } else {
          return [...prevSelected, playstyle];
        }
      });
    };
    let nestedHandler = (res) => {
        const availableStyles = res.data.map(style => style.title);
        const checkboxes = availableStyles.map((style, index) => (
          <PlaystyleCheckbox key={style} label={style} color={colors[index % colors.length]} onSelect={toggleNestedOption} start = {nestedStartVal} />
        ));
        setNestedCheckboxArr(checkboxes);
    }
    if (location.pathname.includes("playstyles") || location.pathname.includes("activities")) {
        nestedCheckboxesTitle = "Activities:"
        NameLoader("activities", nestedHandler)
      } else if (location.pathname.includes("exhibits") || location.pathname.includes("skills")) {
        nestedCheckboxesTitle = "Skills:"
        NameLoader("skills", nestedHandler)
      } else if (location.pathname.includes("map")) {
        nestedCheckboxesTitle = "Playstyles:"
        NameLoader("playstyles", nestedHandler)
      }
    
    const portalNode = document.getElementById('portal-root');


    return (
        <div className="dropdown-form">
            <button type="button" onClick={toggleDropdown} className="toggle-button">
                {isOpen ? 'Cancel New '+type : 'Add '+type}
            </button>
            {isOpen && (
                <div className="newform">
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleInputChange} />
                    </label>
                    <label>Skills:</label>
                    <button type="button" onClick={handleFormSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
    }

export default DropdownForm;
