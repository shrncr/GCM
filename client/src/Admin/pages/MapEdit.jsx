import React, { useContext, useEffect } from "react";
import Zillow_Box from "../components/Zillow_Box.jsx";
import { ExhibitContext } from "../SetData.jsx";
import Map from "../../../src/components/mapx.jsx"
import Exhibits from "./Exhibits.jsx";
import axios from "axios";
export default function MapEdit(props) {
    const {locations, setLocations } = useContext(ExhibitContext);

    
    return (
        < div >
        <Map editing={true}/>
        <Exhibits title={"Map"}/>
        </div >
    )
};


