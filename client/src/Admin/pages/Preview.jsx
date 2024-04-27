import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExhibitContext } from "../SetData.jsx";
import useSkillsLoader from "../classes/skillsLoader.js";
import { useLocation } from 'react-router-dom';
import ExhibitFeedback from "../components/Feedback.jsx";
import DOMPurify from 'dompurify';
import Accordion from "../components/Accordion.jsx";

export default function Preview(props) {
  const { exhibits, setExhibit, playstyles, setPlaystyles, locations, setLocations, homeAct, skills } = useContext(ExhibitContext);
  const navigate = useNavigate();
  const location = useLocation();

  let data;
  let image;
  let ext1;

  switch (props.title) {
    case "Playstyles":
      data = playstyles[props.index];
      image = playstyles[props.index].image;
      ext1 = data.skills;
      break;
    case "Exhibits":
      data = exhibits[props.index];
      image = data.image;
      ext1 = data.activities;
      break;
    case "Activities":
      data = homeAct[props.index];
      image = data.image;
      ext1 = [];
      break;
    case "Map":
      data = locations[props.index];
      ext1 = [];
      break;
    case "Skills":
      data = skills[props.index];
      ext1 = [];
      break;
    default:
      data = [];
      ext1 = [];
      break;
  }

  const sanitizedDescription = DOMPurify.sanitize(data.desc);
  const s = useSkillsLoader({ exhibit: data, location: props.title });

  return (
    <div>
      <div className="banner">
        <img src={image} alt={data.image} />
      </div>
      <div>
        <h1 className="admin-header">{data.title}</h1>
      </div>
      <hr />
      <div className="content-wrapper">
        <p className="description" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </div>
      {/* Conditionally render the Accordion component */}
      {ext1.length !== 0 && (
        <div className="accordion-container">
          <Accordion skills={s} title={props.title} />
        </div>
      )}

      <div className="button-container">
        <div className="edit_button">
          <Link to="edit">
            <button className="normal" type="button">
              Edit {location.pathname.includes("exhibit") ? "Exhibit" : "Playstyle"}
            </button>
          </Link>
          <button className="edit-button" type="button" onClick={(e) => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}


