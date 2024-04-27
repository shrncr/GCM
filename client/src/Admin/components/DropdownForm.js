import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PlaystyleCheckbox from './Checkbox';
import axios from 'axios';
import NameLoader from './NameLoader';
function DropdownForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        connections: [],
        atHome: false
    });

    const location = useLocation()
  let type = ''
  let submitType = ''
  if (location.pathname.includes("playstyles") || location.pathname.includes("activities")) {
    type = "Skill"
    submitType = "skill"
  } else if (location.pathname.includes("exhibits") || location.pathname.includes("skills")) {
    type = "Activity"
    submitType = "activity"
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
        console.log(formData)
        const completeFormData = {
          ...formData,
          connections: nestedSelectedOptions  // Add the selected options to the formData
        };
        const apiUrl = process.env.VERCEL_URL;
        axios({ //make request
            url: '${apiUrl}/admin/add' + submitType,
            method: 'POST',
            data: completeFormData,
            headers: {
              authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
            catch(error) {
              console.error('error:', error);
              alert('An error occured.')
            }
          }).then((res) => {
            setFormData({
              title: '',
              desc: '',
              connections: []
            });
            setNestedSelectedOptions([]);
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
      },
    );
    };
    
    
    let nestedHandler = (res) => {
      const availableStyles = res.data.map(style => style.title);
      const checkboxes = res.data.map((style, index) => (
        <PlaystyleCheckbox key={style} label={style.title} color={colors[index % colors.length]} onSelect={toggleNestedOption} start={nestedStartVal} item={style} />
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
              {isOpen ? `Cancel New ${type}` : `Add ${type}`}
          </button>
          {isOpen && (
              <div className="newform">
                  <label>
                      Name:
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                  </label>
                  <label>
                      Description:
                      <textarea name="desc" value={formData.desc} onChange={handleInputChange} />
                  </label>
                  <label>{nestedCheckboxesTitle}</label>
                  {nestedCheckboxArr}
                  <button type="button" onClick={handleFormSubmit}>Submit</button>
              </div>
          )}
      </div>
  );
}  

export default DropdownForm;
