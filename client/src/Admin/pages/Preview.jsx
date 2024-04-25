import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExhibitContext } from "../SetData.jsx";
import image from "../images/playExample.webp";
import { useLocation } from 'react-router-dom';
import ExhibitFeedback from "../components/Feedback.jsx";
import DOMPurify from 'dompurify';

export default function Preview(props) {
  const { exhibits, setExhibit, playstyles, setPlaystyles, locations, setLocations } = useContext(ExhibitContext);
  const navigate = useNavigate();
  const location = useLocation();
  const activity = ["Run", "Jump", "Sprint", "Eat"];

  let data;
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
  const sanitizedDescription = DOMPurify.sanitize(data.desc);


  // Corrected method name

  return (
    <div>
      <div className="banner">
        <img src={image} alt={data.image}></img>
      </div>
      <div>
        <h1 className="admin-header">{data.title}</h1>
      </div>
      <hr />

      <div className="description" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />

      <ExhibitFeedback exhibitId={data.title} />
      <div className="edit_button">
        <Link to="edit">
          <button className="normal" type="button">
            Edit {location.pathname.includes("exhibit") ? "Exhibit" : "Playstyle"}
          </button>
        </Link>
        <button className="normal" type="button" onClick={(e) => navigate('/admin/exhibits')}>
          Back
        </button>
      </div>
    </div>
  );
};


