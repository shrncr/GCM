import React, { useContext, useState, useEffect } from "react";
import { ExhibitContext } from "../SetData.jsx";
import Exhibit from "../classes/exhibit";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import PlaystyleCheckbox from "../components/Checkbox.js";
import axios from "axios";

export default function EditZillow(props) {
    const navigate = useNavigate();
    const { exhibits, setExhibits, playstyles, setPlaystyles } = useContext(ExhibitContext);
    const location = useLocation();

    let done = "Add Exhibit";
    let data = [];
    let exh;
    if (location.pathname.includes("edit")) {
        done = "Done"
        if (props.title === "Playstyles") {
            data = playstyles;
            exh = playstyles[props.index];
        } else {
            data = exhibits;
            exh = exhibits[props.index];
        }

    } else {
        exh = new Exhibit("New Exhibit", "")
        if (props.title === "Playstyles") {
            data = playstyles;
        } else {
            data = exhibits;

        }

    }


    
    const [name, setName] = useState(exh.name);
    const [description, setDescription] = useState(exh.description);
    const [image, setImage] = useState(exh.image);
    const [visible, setVisible] = useState(false)

    const handleCheckboxChange = (event) => {
        setVisible(event.target.checked);
    };
    


    const [checkboxArr, setCheckboxArr] = useState([]);
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    const [selectedPlaystyles, setSelectedPlaystyles] = useState([]);
    const togglePlaystyle = (playstyle) => {
        setSelectedPlaystyles((prevSelected) => {
          if (prevSelected.includes(playstyle)) {
            return prevSelected.filter(ps => ps !== playstyle);
          } else {
            return [...prevSelected, playstyle];
          }
        });
      };
      
    
  useEffect(() => {
    axios({
      url: 'http://localhost:5000/playstyles',
      method: 'GET',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      }
    }).then((res) => {
      const availableStyles = res.data.map(style => style.title);
      const checkboxes = availableStyles.map((style, index) => (
        <PlaystyleCheckbox key={style} label={style} color={colors[index % colors.length]} onSelect={togglePlaystyle} />
      ));
      setCheckboxArr(checkboxes);
    }).catch(error => {
      console.error('error:', error);
      alert('An error occurred.');
    });
  }, []);
    useEffect(() => {
    console.log("Selected Playstyles:", selectedPlaystyles);
  }, [selectedPlaystyles]);
  
    const addExhibit = () => {
        const newExhibit = new Exhibit(name, description, image);
        let newData;
        if (location.pathname.includes("edit")) {
            newData = data
            newData[props.index] = newExhibit;

        } else {
            newData = [...data, newExhibit]
        }

        if (props.title === "Playstyles") {
            setPlaystyles(newData);
        } else {
            setExhibits(newData);
        }
        navigate(`/admin/exhibits/${name}`)
    };

    return (
        <form>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <div className = "checkbox-row">
            {checkboxArr}
            </div>
            <div>
            <PlaystyleCheckbox label="Make visible?" color = "green" onChange = {handleCheckboxChange}/>
            </div>
            <div className="button"  >

                <button type="button" onClick={addExhibit}>
                    {done}
                </button>

                <button type="button" onClick={() => navigate('/admin/exhibits')}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
