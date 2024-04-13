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
            console.log(data)
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
                    <Zillow_Box key={e.title} name={e.title} id={e.title} image={e.image} status={e.status} />
                ))}
                <ADDZillowBox key={"add"} name={`Add ${props.title.slice(0, -1)}`} id={"add"} image={null} />
            </div>
        </div>
    );
}


