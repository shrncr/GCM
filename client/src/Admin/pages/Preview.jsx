import { React, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ExhibitContext } from "../SetData.jsx";
import image from "../images/playExample.webp"
import { useLocation } from 'react-router-dom';
import ExhibitFeedback from "../components/Feedback.jsx";
import DOMPurify from 'dompurify';

/*
npm install dompurify

import DOMPurify from 'dompurify';
const sanitizedDescription = DOMPurify.sanitize(data.desc);


in return section: 
 <p className="description" dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></p>
      
*/

export default function Preview(props) {
  const { exhibits, setExhibit, playstyles, setPlaystyles, locations, setLocations } = useContext(ExhibitContext)
  const navigate = useNavigate()
  const location = useLocation()
  const activity = ["Run", "Jump", "Sprint", "Eat"];


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
  let editType = location.pathname.includes("exhibit") ? "Exhibit" : "Playstyle";

  const sanitizedDescription = DOMPurify.sanitize(data.desc);

  //LOAD IN A SPECIFIC EXHIBIT/PLAYSTYLE/AT HOME ACTIVITY
  return (
    <div>
      <div className="banner">
        <img src={image} alt={data.image}></img>
      </div>
      <div>
        <h1 className="admin-header">{data.title} </h1>
      </div>
      <hr />
      <ul>{sanitizedDescription}</ul>
      <ul className="description" dangerouslySetInnerHTML={{ __html: data.desc }} />



      <ExhibitFeedback exhibitId={data.title} />
      <div className="edit_button">
        <Link to="edit">
          <button className="normal" type="button">
            Edit {editType}
          </button>
        </Link>
        <button className="normal" type="button" onClick={(e) => navigate('/admin/exhibits')}>
          Back
        </button>
      </div>
    </div>
  )
};


