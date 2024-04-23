import { React, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ExhibitContext } from "../SetData.jsx";
import image from "../images/playExample.webp"
import { useLocation } from 'react-router-dom';
import ExhibitFeedback from "../components/Feedback.jsx";
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
      <div>
        <h1 className="admin-header">{data.title} </h1>
      </div>
      <hr />

      <p className="description">{data.desc}</p>

      <div className="preview-accordian">
        {activity.map((name, index) => {

          return (
            <div className="accordian-item">
              <h1 className="accordian-header">
                <button className="accordian-button">
                  {name}
                </button>

              </h1>
              <div className="accordian-body">
                This is where the description and buttons to link further learning will go
              </div>
            </div>
          )
        })}
      </div>
      <ExhibitFeedback exhibitId={data.title}/>
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


