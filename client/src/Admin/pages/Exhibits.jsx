import React, { useContext } from "react";
import Zillow_Box from "../components/Zillow_Box";
import { ExhibitContext } from "../SetData.jsx";

export default function Exhibits(props) {
    const { exhibits, setExhibit, playstyles, setPlaystyles } = useContext(ExhibitContext);

    let data;

    switch (props.title) {
        case "Playstyles":
            data = playstyles;
            break;
        case "Exhibits":
            data = exhibits;
            break;
        default:
            data = [];
            break;
    }



    return (
        <div>
            <h1 className="header">{props.title}</h1>
            <div className="zillow-container">
                {data.map((e, index) => (
                    <Zillow_Box key={e.title} name={e.title} id={e.title} image={e.image} status={e.status} />
                ))}
                <Zillow_Box key={"add"} name={`Add ${props.title}`} id={"add"} image={null} />
            </div>
        </div>
    );
}


