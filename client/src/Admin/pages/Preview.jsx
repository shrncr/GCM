import { React, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ExhibitContext } from "../SetData.jsx";
import image from "../images/playExample.webp"
import { useLocation } from 'react-router-dom';
export default function Preview(props) {
  const { exhibits, setExhibit, playstyles, setPlaystyles, locations, setLocations } = useContext(ExhibitContext)
  const navigate = useNavigate()
  const location = useLocation()

  let data;
  //find if playstyle or exhibit
  switch (props.title) {
    case "Playstyles":
      data = playstyles[props.index];
      break;
    case "Exhibits":
      data = exhibits[props.index];
      break;
    case "Map":
      data = locations[props.index];
      break;
    default:
      data = [];
      break;
  }
  let editType = ""
  if (location.pathname.includes("exhibit")) {
    editType = "Exhibit"

  } else {
    editType = "Playstyle"
  }
  //LOAD IN A SPECIFIC EXHIBIT/PLAYSTYLE/AT HOME ACTIVITY
  return (
    <div>
      <div className="banner">
        <img src={image} alt={data.image}></img>
      </div>
      <div className="preview-header">
        <h1 >{data.title} </h1>
      </div>
      <p className="description">{data.desc}</p>
      <p className="description"></p>
      <div className="button">
        <Link to="edit">
          <button type="button">
            Edit {editType}
          </button>
        </Link>
        <button type="button" onClick={(e) => navigate('/admin/exhibits')}>
          Back
        </button>
      </div>
    </div>
  )
};


