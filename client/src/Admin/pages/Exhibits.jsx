import React, { useContext } from "react";
import Zillow_Box from "../components/Zillow_Box";
import { ExhibitContext } from "../SetData.jsx";

// the add box has different styling 


export default function Exhibits(props) {
    const { exhibits, setExhibit, playstyles, setPlaystyles, locations, setLocations, act, setHomeAct, skills } = useContext(ExhibitContext);

    let data;

    switch (props.title) {
        case "Playstyles":
            data = playstyles;
            break;
        case "Exhibits":
            data = exhibits;
            console.log("under")
            console.log(data);
            break;
        case "Map":
            console.log("mao")
            data = locations;

            break;
        case "Activities":
            data = act;

            break;
        case "Skills":
            data = skills;
            break;

        default:
            data = [];
            break;
    }


    return (
        <div>
            <h1 className="admin-header">{props.title}</h1>
            <hr />
            <div className="zillow-container">
                {data.map((e, index) => (
                    <Zillow_Box className="zillow-box" key={e.id} name={e.title} id={e.title} image={e.image} status={e.status} />
                ))}
                <Zillow_Box className="add_box" key={"add"} name={"+"} id={"add"} image={null} />
            </div>
        </div>
    );
}


