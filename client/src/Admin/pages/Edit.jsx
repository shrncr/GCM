import React, { useContext, useState, useEffect } from "react";
import { ExhibitContext } from "../SetData.jsx";
import Exhibit from "../classes/exhibit";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import PlaystyleCheckbox from "../components/Checkbox.js";
import axios from "axios";
import PlaystyleNameLoader from "../components/PlaystyleNameLoader.js"
import ExhibitNameLoader from "../components/ExhibitNameLoader.js"

export default function Edit(props) {
    const navigate = useNavigate();
    const { exhibits, setExhibits, playstyles, setPlaystyles } = useContext(ExhibitContext);
    const location = useLocation();

    let done = "Add Exhibit";
    let data = [];
    let exh = {};
    if (location.pathname.includes("edit")) {
        done = "Done"
        if (props.title === "Playstyles") {
            exh = playstyles[props.index];
        } else {
            exh = exhibits[props.index]; //the current exhibit
        }

    } else {
        if (props.title === "Playstyles") {
            data = playstyles;
        } else {
            data = exhibits;
        }
    }

    const [name, setName] = useState(exh.title);
    const [description, setDescription] = useState(exh.desc);
    const [image, setImage] = useState(exh.image);
    var v;
    if (exh.status !== undefined){
      v = exh.status;
    }else{
      v=true;
    };
    const [visible, setVisible] = useState(v);
    
    const toggleVisibility = (event) => {
        setVisible(!visible);
    };

    const [checkboxArr, setCheckboxArr] = useState([]);
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const toggleOption = (playstyle) => {
        setSelectedOptions((prevSelected) => {
          if (prevSelected.includes(playstyle)) {
            return prevSelected.filter(ps => ps !== playstyle);
          } else {
            return [...prevSelected, playstyle];
          }
        });
      };
    let checkboxesTitle = ""
    if (location.pathname.includes("exhibits")){
        checkboxesTitle = "Playstyles:"
        const playstyleHandler = (res) => {
            const availableStyles = res.data.map(style => style.title);
            const checkboxes = availableStyles.map((style, index) => (
            <PlaystyleCheckbox key={style} label={style} color={colors[index % colors.length]} onSelect={toggleOption} />
            ));
            setCheckboxArr(checkboxes);}
        PlaystyleNameLoader(playstyleHandler)
    }
    else{
        checkboxesTitle = "Exhibits:"
        const exhibitHandler = (res) => {
            const availableStyles = res.data.map(style => style.title);
            const checkboxes = availableStyles.map((style, index) => (
              <PlaystyleCheckbox key={style} label={style} color={colors[index % colors.length]} onSelect={toggleOption} />
            ));
            setCheckboxArr(checkboxes);}
        ExhibitNameLoader(exhibitHandler)
    };
      
  
    const addExhibit = () => {
        if (location.pathname.includes("edit")) { //if youre editing
            console.log("editing...");
            if (props.title === "Playstyles"){ //if editing a playstyle
              console.log("specifically, a playstyle");
            axios({ //make request
                url:'http://localhost:5000/admin/editlearningstyle', //edit exhibit
                method: 'PUT',
                data: {id:exh.style_id,title: name, desc: description, image:image},
                headers: {
                  authorization:'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
                },
                catch(error) {console.error('error:', error);
                alert('An error occured.')}
              }).then((res) => {
            })}else{

              console.log("specifically, an exhibit");
              console.log(exh);
                axios({ //make request
                    url:'http://localhost:5000/admin/editexhibit', //edit exhibit
                    method: 'PUT',
                    data: {id:exh.exhibit_id,title: name, desc: description, image:image, status:visible},
                    headers: {
                      authorization:'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
                    },
                    catch(error) {console.error('error:', error);
                    alert('An error occured.')}
                  }).then((res) => {
                });
            };
        } else {//if adding newc
            if (props.title === "Exhibits") {
              console.log("specifically, anexhibit");
                axios({ //make request
                    url:'http://localhost:5000/admin/addexhibit', //edit exhibit
                    method: 'POST',
                    data: {title: name, desc: description, image:image,status:visible},
                    headers: {
                      authorization:'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
                    },
                    catch(error) {console.error('error:', error);
                    alert('An error occured.')}
                  }).then((res) => {
                });

                
            } else {
              console.log("specifically, a playstyle");
              axios({ //make request
                url:'http://localhost:5000/admin/addlearningstyle', //edit exhibit
                method: 'POST',
                data: {title: name, desc: description, image:image},
                headers: {
                  authorization:'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
                },
                catch(error) {console.error('error:', error);
                alert('An error occured.')}
              }).then((res) => {
            });
            };
        }

        if (props.title === "Playstyles") {
            navigate(`/admin/playstyles`);
        } else if (props.title === "Exhibits") {
            navigate(`/admin/exhibits`);
        }
        else{
          navigate(`/admin/map`)
        };
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
                <label></label>
                <label>Description:</label>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label></label>
                <label>Image:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <div>
                <label></label>
            </div>
            <div>
                <label>{checkboxesTitle}</label>
            </div>
            <div className = "checkbox-row">
            {checkboxArr}
            </div>
            <div>
                <label></label>
                <label>Visibility:</label>
            </div>
            <div>
            <PlaystyleCheckbox label="Make visible?" color = "green" onSelect = {toggleVisibility}/>
            </div>
            <div className="button"  >

                <button type="button" onClick={addExhibit}>
                    {done}
                </button>

                <button type="button" onClick={() => props.title === "Playstyles" ? navigate('/admin/exhibits') : navigate('/admin/playstyles')}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
