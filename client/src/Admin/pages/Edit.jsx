//Edit page
/* This page is used to construct the editor. It adapts based
on whether the user is editing or adding a playstyle or an exhibit.
Within this page there are functions that connect to the database
in order to upload/change the desired item.*/

// Required imports
import React, { useContext, useState, useEffect } from "react";
import { ExhibitContext } from "../SetData.jsx";
import Exhibit from "../classes/exhibit";
import PlaceSearch from "../components/PlaceSearch.jsx";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import PlaystyleCheckbox from "../components/Checkbox.js";
import axios from "axios";
import NameLoader from "../components/NameLoader.js";

/* Main edit function, this will be exported and used as needed
throughout the admin page.*/
export default function Edit(props) {
  // Required constants
  const navigate = useNavigate();
  const { exhibits, setExhibits, playstyles, setPlaystyles, locations, setLocations } = useContext(ExhibitContext);
  const location = useLocation();

  // Variables for extracting and customizing what the buttons say
  let done = "Add Exhibit";
  let data = [];
  let exh = {};
  if (location.pathname.includes("edit")) {
    done = "Done"
    if (props.title === "Playstyles") {
      exh = playstyles[props.index];
    } else if (props.title === "Exhibits") {
      exh = exhibits[props.index]; //the current exhibit
    } else {
      exh = locations[props.index]
    }

  } else {
    if (location.pathname.includes("playstyles")) {
      done = "Add Playstyle"
    }
    if (props.title === "Playstyles") {
      data = playstyles;
    } else if (props.title === "Exhibits") {
      data = exhibits;
    } else {
      data = locations;
    }
  }

  /*name, description, latitude, longitude, and image variables used to track what
  the user is entering*/
  const [name, setName] = useState(exh.title);
  const [description, setDescription] = useState(exh.desc);
  const [image, setImage] = useState(exh.image);
  let v;
  if (exh.status !== undefined) {
    v = exh.status;
  } else {
    v = true;
  };


  

  /* Visibility variable and function used to track if the 
  exhibit/playstyle will populate on the client side */
  const [visible, setVisible] = useState(v);

  const [long, setLong] = useState(props.title === "Map" ? exh.longitude : "");
  const [lat, setLat] = useState(props.title === "Map" ? exh.latitude : "");
  const [addy, setAdd] = useState("");
  
  const toggleVisibility = (event) => {
    setVisible(!visible);
  };

  /* This section of code is for the buttons on the editing page.
  It gives each button a color to look nice and tracks which
  items have been selected. */
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

  /* This chunk of code is used for importing the names of the playstyles
  and exhibits in the database in order to title each button
  and track what is being added to each new object. */
  let checkboxesTitle = ""
  /* handler function is used to add all the buttons needed to an
  array that is later used in the return section to put the buttons
  on the page. */
  let handler = (res) => {
    const availableStyles = res.data.map(style => style.title);
    const checkboxes = availableStyles.map((style, index) => (
      <PlaystyleCheckbox key={style} label={style} color={colors[index % colors.length]} onSelect={toggleOption} />
    ));
    setCheckboxArr(checkboxes);
  }
  if (location.pathname.includes("exhibits") || location.pathname.includes("map")) {
    checkboxesTitle = "Playstyles:"
    NameLoader('playstyles', handler)
  } else if (location.pathname.includes("playstyles")) {
    checkboxesTitle = "Exhibits:"
    NameLoader('exhibits', handler)
  } else if (location.pathname.includes("activities")) {
    checkboxesTitle = "Skills:"
    NameLoader('skills', handler)
  } else if (location.pathname.includes("skills")) {
    checkboxesTitle = "Activities:"
    NameLoader('activities', handler)
  };

  /* Here is where we actually add an exhibit. This function takes
  the information entered and sends it to the database, which then
  creates the object of whatever is being sent. It is also used to 
  make edits to any existing playstyles/exhibits. */
  const addExhibit = () => {
    if (location.pathname.includes("edit")) { //if youre editing
      console.log("editing...");
      if (props.title === "Playstyles") { //if editing a playstyle
        console.log("specifically, a playstyle");
        axios({ //make request
          url: 'http://localhost:8082/admin/editlearningstyle', //edit exhibit
          method: 'PUT',
          data: { id: exh._id, title: name, desc: description, image: image },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
        })
      } else if (props.title === "Exhibits") {

        console.log("specifically, an exhibit");
        console.log(exh);
        axios({ //make request
          url: 'http://localhost:8082/admin/editexhibit', //edit exhibit
          method: 'PUT',
          data: { id: exh._id, title: name, desc: description, image: image, status: visible },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
        });
      } else if (props.title === "Map"){ // if editing a map location
        axios({ //make request
          url: 'http://localhost:8082/admin/editmap', //edit exhibit
          method: 'POST',
          data: { id: exh._id, title: name, desc: description, latitude: lat, longitude: long, address: addy, playstyle: selectedOptions[0] },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
        });

      } else{

      };
    } else {//if adding newc
      if (props.title === "Exhibits") {
        console.log("specifically, an exhibit");
        axios({ //make request
          url: 'http://localhost:8082/admin/addexhibit', //edit exhibit
          method: 'POST',
          data: { title: name, desc: description, image: image, status: visible },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
        });


      } else {
        console.log("specifically, a playstyle");
        axios({ //make request
          url: 'http://localhost:8082/admin/addlearningstyle', //edit exhibit
          method: 'POST',
          data: { title: name, desc: description, image: image },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
        });
      };
    }

    if (props.title === "Playstyles") {
      navigate(`/admin/playstyles`);
    } else if (props.title === "Exhibits") {
      navigate(`/admin/exhibits`);
    }
    else {
      navigate(`/admin/map`)
    };
  };
  //DELETE EXHIBIT
  const deleteExhibit = () => {
    //THIS WILL DELETE AN EXHIBIT
    return
  };

  /* Here is our return section. This is the HTML portion that actually
  builds the webpage utilizing the functions created above. */
  return (

    <form>
      {/*Form for Creating Exhibit*/}
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

      {props.title === "Map" ?
      <PlaceSearch addy={"401 E Kennedy"} longSet={setLong} latSet={setLat} addSet = {setAdd}/>
      : ""}

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
      <div className="checkbox-row">
        {checkboxArr}
      </div>
      <div>
        <label></label>
        <label>Visibility:</label>
      </div>
      <div>
        <PlaystyleCheckbox label="Make visible?" color="green" onSelect={toggleVisibility} />
      </div>
      <div className="button"  >

        <button type="button" onClick={addExhibit}>
          {done}
        </button>

        <button type="delete-button" onClick={deleteExhibit}>
          Delete
        </button>

        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

{/*() => props.title === "Playstyles" ? navigate('/admin/playstyles') : navigate('/admin/exhibits')*/ }