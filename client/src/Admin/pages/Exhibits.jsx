import React, { useContext } from "react";
import Zillow_Box from "../components/Zillow_Box";
import { ExhibitContext } from "../SetData.jsx";
import styled from 'styled-components';

// the add box has different styling 
const ADDZillowBox = styled(Zillow_Box)`
  && {
    background-color: rgb(152, 149, 152);
  }
`;

export default function Exhibits(props) {
    const { exhibits, setExhibit, playstyles, setPlaystyles, locations, setLocations } = useContext(ExhibitContext);

    let data;

    switch (props.title) {
        case "Playstyles":
            data = playstyles;
            break;
        case "Exhibits":
            data = exhibits;
            break;
        case "Map":
            console.log("mao")
            data = locations;
            console.log(data);
            break;
        case "Activities":
            data = exhibits;
            console.log(data);
            break;
        default:
            data = [];
            break;
    }



    return (
        <div>
            <h1 className="header">{props.title}</h1>
            <div className="underline" >
                <div />
            </div>
            <div className="zillow-container">
                {data.map((e, index) => (
                    
                    <Zillow_Box className="zillow-box" key={e.title} name={e.title} id={e._id} image={e.image} status={e.status} />
                ))}
                <Zillow_Box className="add_box" key={"add"} name={"+"} id={"add"} image={null} />
            </div>
        </div>
    );
}


