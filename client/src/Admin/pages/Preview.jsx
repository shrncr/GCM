import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExhibitContext } from "../SetData.jsx";
import image from "../images/playExample.webp";
import { useLocation } from 'react-router-dom';
import ExhibitFeedback from "../components/Feedback.jsx";
import DOMPurify from 'dompurify';
import Accordion from "../components/Accordion.jsx";

export default function Preview(props) {
  const { exhibits, setExhibit, playstyles, setPlaystyles, locations, setLocations } = useContext(ExhibitContext);
  const navigate = useNavigate();
  const location = useLocation();

  let data;
  let ext1;
  let ext2;
  switch (props.title) {
    case "Playstyles":
      data = playstyles[props.index];
      ext1 = ["one", "two", "three"];
      ext2 = ["hello", "little", "bitch"];
      break;
    case "Exhibits":
      data = exhibits[props.index];
      ext1 = exhibits[props.index].activities;
      ext2 = exhibits[props.index].activities.skills;
      break;
    case "Map":
      data = locations[props.index];
      ext1 = [];
      break;
    default:
      data = [];
      ext1 = [];
      break;
  }
  const sanitizedDescription = DOMPurify.sanitize(data.desc);

  return (
    <div>
      <div className="banner">
        <img src={image} alt={data.image}></img>
      </div>
      <div>
        <h1 className="admin-header">{data.title}</h1>
      </div>
      <hr />

      <p className="description" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />

      {/* Conditionally render the Accordion component */}
      {ext1.length !== 0 && (
        <div className="accordion-container">
          <Accordion ext1={ext1} ext2={ext2} />
        </div>
      )}

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


