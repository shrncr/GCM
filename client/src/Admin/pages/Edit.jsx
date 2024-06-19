//Edit page
/* This page is used to construct the editor. It adapts based
on whether the user is editing or adding a playstyle or an exhibit.
Within this page there are functions that connect to the database
in order to upload/change the desired item.*/

// Required imports
import React, { useContext, useState, useEffect } from "react";
import SetData, { ExhibitContext } from "../SetData.jsx";
import Exhibit from "../classes/exhibit";
import PlaceSearch from "../components/PlaceSearch.jsx";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import PlaystyleCheckbox from "../components/Checkbox.js";
import axios from "axios";
import NameLoader from "../components/NameLoader.js";
import Delete_Button from "../components/Delete_Button.jsx";
import TextEditor from "../components/TextEditor.js";
import DropdownForm from "../components/DropdownForm.js";
import ContentWrapper from "../components/ContentWrapper.jsx";

/* Main edit function, this will be exported and used as needed
throughout the admin page.*/
export default function Edit(props) {
  // Required constants
  const [updateData, setUpdateData] = useState(false);
  const navigate = useNavigate();
  const { exhibits, setExhibits, playstyles, setPlaystyles, locations, setLocations, act, setAct, skills } = useContext(ExhibitContext);
  const location = useLocation();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  let selectedFile;

  //awk endpoint to obtain presigned url to upload images
  const endpt = "https://x57c4wsb6c.execute-api.us-east-2.amazonaws.com/howdoesthiswork/generatePresigned"

  //function to GET the url from AWS API to AWS lambda function
  const getPresignedUrl = async () => {
    // GET request: presigned URL
    const response = await axios({
      method: "GET",
      url: endpt,
    });
    const presignedUrl = response.data.presignedUrl;
    //console.log(presignedUrl);
    return presignedUrl;
  };

  //actually uploads file to your presigned url
  const uploadToPresignedUrl = async (presignedUrl) => {
    // Upload file to pre-signed URL
    const uploadResponse = await axios.put(presignedUrl, selectedFile, {
      headers: {
        "Content-Type": "application/jpg",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
        //console.log(`Upload Progress: ${percentCompleted}%`);
      },
    });

    //grab url's name to upload to db
    let url = uploadResponse.config.url;
    let cutUrl = url.substring(0, url.indexOf(".jpg?") + 4);
    setImage(cutUrl);
  };
  const isMapPage = location.pathname.includes("map");
  // Variables for extracting and customizing what the buttons say
  let done = `Add ${props.title}`;
  let data = [];
  let exh = {
    'title': " ",
    'desc': " "
  };

  const handleImageChange = async (event) => { //calls whenever the file to upload changes
    event.preventDefault();
    const files = event.target.files;
    //console.log(files);
    //console.log(event.target)
    if (files && files.length > 0) {
      //console.log("mepw")
      // Since we're allowing only one file, let's take the first one
      selectedFile = files[0];

      const presignedUrl = await getPresignedUrl();
      uploadToPresignedUrl(presignedUrl);

    } else {
      // Reset the image state if no file is selected
      //setImage(null);
    }
  }
  if (location.pathname.includes("edit")) {
    done = "Done"
    if (props.title === "Playstyles") {
      exh = playstyles[props.index];

    } else if (props.title === "Exhibits") {
      exh = exhibits[props.index]; //the current exhibit
    } else if (props.title === "Map") {
      exh = locations[props.index]
    } else if (props.title === "Skills") {
      exh = skills[props.index]
    } else {
      exh = act[props.index]
      //console.log(exh)
    }

  } else {
    if (location.pathname.includes("playstyles")) {
      done = "Add Playstyle"
    }
    if (props.title === "Playstyles") {
      data = playstyles;
    } else if (props.title === "Exhibits") {
      data = exhibits;
    } else if (props.title === "Map") {
      data = locations;
    } else {
      data = act;
    }
  }

  /*name, description, latitude, longitude, and image variables used to track what
  the user is entering*/
  const [name, setName] = useState(exh.title);
  let d = exh.desc;
  if (props.title == "Activities") {
    //console.log("under")
    //console.log(exh.description)
    d = exh.desc

  }
  //exhibit map playstyle

  
  const [description, setDescription] = useState(d);
  //console.log(description)

  useEffect(()=>{
    if (props.title == "Exhibits" || props.title == "Playstyles" || props.title == "Map"){
      setImage(exh.image)
    }
  },[])

  let v;
  //console.log(exh)
  if (exh.status !== undefined) {
    v = exh.status;
  }else if (exh.atHome !== undefined){
    v = exh.atHome;
  }else if (exh.isAge !== undefined){
    //console.log("is age")
    v = exh.isAge;
  } else {
    v = true;
  } ;

  /* Visibility variable and function used to track if the 
  exhibit/playstyle will populate on the client side */
  const [visible, setVisible] = useState(v);

  /* This section of declared useState constants is for the map component
  and each one tracks a separate piece of the address */
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
    setSelectedOptions((prevSelected=[]) => {
      if (prevSelected && (prevSelected.includes(playstyle))) {
        return prevSelected.filter(ps => ps !== playstyle);
      } else {
        return [...prevSelected, playstyle];
      }
    });
  };


  useEffect(() => {
    //console.log(selectedOptions);
  }, [selectedOptions]);
  let [availableStyles, setAvailableStyles] = useState([]);
let filteredStuff;
  useEffect(() => {
    if ((location.pathname.includes("playstyles") || location.pathname.includes("activities"))&& location.pathname.includes("edit")) {
      
      filteredStuff = exh.skills.filter(skill => availableStyles.includes(skill));
      setSelectedOptions(filteredStuff)
    } else if ((location.pathname.includes("exhibits") || location.pathname.includes("skills")) && location.pathname.includes("edit")) {
      checkboxesTitle = "Activities:"
      filteredStuff = exh.activities.filter(skill => availableStyles.includes(skill));
      setSelectedOptions(filteredStuff)
    } else if (location.pathname.includes("map")) {
      checkboxesTitle = "Playstyles:"
      setSelectedOptions([exh.playstyle])
    //console.log(selectedOptions);
}}, [availableStyles]);
  const handleDescriptionChange = (content) => {
    setDescription(content);
  };



  /* This chunk of code is used for importing the names of the playstyles
  and exhibits in the database in order to title each button
  and track what is being added to each new object. */
  let checkboxesTitle = ""
  let startVal = false
  /* handler function is used to add all the buttons needed to an
  array that is later used in the return section to put the buttons
  on the page. */
  let handler = (res) => {
    //console.log(exh)
    setAvailableStyles(res.data.map(style => style.title));

    const checkboxes = res.data.map((style, index) => (
      <PlaystyleCheckbox key={style.title} label={style.title} color={colors[index % colors.length]} onSelect={toggleOption} start={location.pathname.includes("edit") ? (props.title === "Map" ? exh.playstyle == style.title:(props.title === "Playstyles" || props.title === "Activities" ? (exh.skills.includes(style.title)) : exh.activities.includes(style.title))) : false} item={style.title} />
    ));
    setCheckboxArr(checkboxes);
  }
  if (location.pathname.includes("playstyles") || location.pathname.includes("activities")) {
    checkboxesTitle = "Skills:"
    NameLoader("skills", handler)
  } else if (location.pathname.includes("exhibits") || location.pathname.includes("skills")) {
    checkboxesTitle = "Activities:"
    NameLoader("activities", handler)
  } else if (location.pathname.includes("map")) {
    checkboxesTitle = "Playstyles:"
    NameLoader("playstyles", handler)
  }

  /* Here is where we actually add an exhibit. This function takes
  the information entered and sends it to the database, which then
  creates the object of whatever is being sent. It is also used to 
  make edits to any existing playstyles/exhibits. */


  const addExhibit = () => {
    if (location.pathname.includes("edit")) { //if youre editing
      //console.log("editing...");
      if (props.title === "Playstyles") { //if editing a playstyle
        //console.log("specifically, a playstyle");
        //console.log(exh.id)
        axios({ //make request
          url: `${apiUrl}/admin/editlearningstyle`, //edit exhibit
          method: 'PUT',
          data: { id: exh._id, title: name, desc: description, image: image, skills: selectedOptions },
          headers: {

            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
          //console.log("success")

        })
      } else if (props.title === "Exhibits") {

        //console.log("specifically, an exhibit");
        //console.log(exh);
        axios({ //make request
          url: `${apiUrl}/admin/editexhibit`, //edit exhibit
          method: 'PUT',
          data: { id: exh._id, title: name, desc: description, image: image, status: visible, activities: selectedOptions },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {

        });
      } else if (props.title === "Map") { // if editing a map location
        axios({ //make request
          url: `${apiUrl}/admin/editmap`, //edit exhibit
          method: 'POST',
          data: { id: exh._id, title: name, desc: description, latitude: lat, longitude: long, address: addy, playstyle: selectedOptions[0], image: image },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {

        });

      } else if (props.title === "Skills") { // if editing a map location
        axios({ //make request
          url: `${apiUrl}/admin/editskill`, //edit exhibit
          method: 'POST',
          data: { id: exh._id, title: name, desc: description, image: image, Activities: selectedOptions, isAge: visible },
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
        axios({ //make request
          url: `${apiUrl}/admin/editactivity`, //edit exhibit
          method: 'POST',
          data: { id: exh._id, title: name, desc: description, skills: selectedOptions, atHome: visible },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
        }).then((res) => {
          //console.log('Response:', res);
          alert('success')
        }).catch((error) => {
          console.error('Error:', error);
          alert('An error occurred.');
        });

      };
    } else {//if adding newc
      if (props.title === "Exhibits") {
        //console.log("specifically, an exhibit");
        axios({ //make request
          url: `${apiUrl}/admin/addexhibit`, //edit exhibit
          method: 'POST',
          data: { title: name, desc: description, image: image, status: visible, activities: selectedOptions },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
        });


      } else if (props.title === "Map") {
        axios({ //make request
          url: `${apiUrl}/admin/addmap`, //edit exhibit
          method: 'POST',
          data: { long: long, lat: lat, address: addy, title: name, desc: description, playstyle: selectedOptions[0], image: image },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
        });
      }
      else if (props.title === "Playstyles") {
        //console.log("specifically, a playstyle added");
        axios({ //make request
          url: `${apiUrl}/admin/addlearningstyle`, //edit exhibit
          method: 'POST',
          data: { title: name, desc: description, image: image, skills: selectedOptions },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
        });
      }
      else if (props.title === "Skills") {
        //console.log("specifically, a skill is added");
        axios({ //make request
          url: `${apiUrl}/admin/addskill`, //edit exhibit
          method: 'POST',
          data: { title: name, desc: description, image: image, Activities: selectedOptions, isAge: visible },
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
        //console.log("specifically, a activity added");
        axios({ //make request
          url: `${apiUrl}/admin/addactivity`, //edit exhibit
          method: 'POST',
          data: { title: name, desc: description, image: image, skills: selectedOptions, atHome: visible },
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
        });

      }
    }

    if (props.title === "Playstyles") {
      navigate(`/admin/playstyles`);
      window.location.reload();
    } else if (props.title === "Exhibits") {
      navigate(`/admin/exhibits`);
      window.location.reload();
    }
    else if (props.title === "Map") {
      navigate(`/admin/map`)
      window.location.reload();
    } else if (props.title === "Skills") {
      navigate(`/admin/skills`)
      window.location.reload();
    } else {
      navigate(`/admin/activities`)
      window.location.reload()

    }
  };

  /* Here is our return section. This is the HTML portion that actually
  builds the webpage utilizing the functions created above. */
  return (
    <div>
      <form encType="multipart/form-data">

        {/*Form for Creating Exhibit*/}



        <label htmlFor="imageInput">
          <div className="image-edit-container">
            <span>+</span>
          </div>
        </label>
        <div className="content-wrapper">
          <div className="uncool-image-box">
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="imageInput"
              multiple={false}
              onChange={(e) => handleImageChange(e)}
            />
          </div>



          <div>
            <label></label>
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
            <TextEditor value={description} onChange={handleDescriptionChange} />
          </div>

          {props.title === "Map" ?
            <PlaceSearch addy={"401 E Kennedy"} longSet={setLong} latSet={setLat} addSet={setAdd} />
            : ""}




          <br />

          {props.title !== "Skills" && (
            <>
              <div>
                <label>{checkboxesTitle}</label>
              </div>
              <div className="checkbox-row">
                {checkboxArr}
              </div>
            </>
          )}


          {props.title !== "Skills" && !isMapPage && (
            <div>
              <DropdownForm />
            </div>
          )}
          {props.title === "Skills" ? 
          <div>
            <br />
            <label>Is an age range:</label>
            <div>
              <PlaystyleCheckbox label="Is Age" color="red" onSelect={toggleVisibility} start={visible} />
            </div>
        </div>
          : (props.title === "Activities" ? (
            <div>
              <br />
              <label>At Home:</label>
              <div>
                <PlaystyleCheckbox label="At Home" color="red" onSelect={toggleVisibility} start={visible} />
              </div>
            </div>
          ) : (
            <div>
              <br />
              <label>Visibility:</label>
              <div>
                <PlaystyleCheckbox label="Visible" color="green" onSelect={toggleVisibility} start={visible} />
              </div>
            </div>
          ))}



          <div className="edit_button"  >

            <button className="normal" type="button" onClick={addExhibit}>
              {done}
            </button>

            <Delete_Button done={done} title={props.title} id={exh._id} />

            <button className="normal" type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      </form >
    </div >
  );
}
