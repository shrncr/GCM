import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExhibitContext } from "../SetData.jsx";
import useSkillsLoader from "../classes/skillsLoader.js";
import { useLocation } from 'react-router-dom';
import ExhibitFeedback from "../components/Feedback.jsx";
import DOMPurify from 'dompurify';
import Accordion from "../components/Accordion.jsx";
import pic from "../images/play_example.jpg"

export default function Preview(props) {
  const { exhibits, playstyles, locations, act, skills } = useContext(ExhibitContext);
  const navigate = useNavigate();
  const location = useLocation();
  let name;
  let data;
  let image;
  let ext1;
  let desc;
  switch (props.title) {
    case "Playstyles":
      data = playstyles[props.index];
      desc = data.desc
      image = playstyles[props.index].image;
      ext1 = data.skills;
      name = "Playstyle"
      break;
    case "Exhibits":
      data = exhibits[props.index];
      desc = data.desc
      image = data.image;
      ext1 = data.activities;
      name = "Exhibit"
      break;
    case "Activities":
      data = act[props.index];
      desc = data.description
      image = pic;
      name = "Activity"
      ext1 = [];
      break;
    case "Map":
      data = locations[props.index];
      desc = data.desc
      image = data.image;
      name = "Location"
      ext1 = [];
      break;
    case "Skills":
      data = skills[props.index];
      desc = data.desc
      image = pic;
      ext1 = [];
      name = "Skill"
      break;
    default:
      data = [];
      ext1 = [];
      desc = "None"
      break;
  }

  const sanitizedDescription = DOMPurify.sanitize(desc);
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
          <Accordion skills={s} title={props.title} side={"/admin"} />
        </div>
      )}

      <div className="button-container">
        <div className="edit_button">
          <Link to="edit">
            <button className="normal" type="button">
              Edit {name}
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


