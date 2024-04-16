import React, { useContext, useEffect } from "react";
import { ExhibitContext } from "../SetData.jsx";
import Map from "../../../src/components/mapx.jsx"
import Exhibits from "./Exhibits.jsx";

/*
Component admin will use to edit locations on map
*/

export default function MapEdit(props) {
    const { locations, setLocations } = useContext(ExhibitContext);


    return (
        < div >
            <Map editing={true} />
            <Exhibits title={"Map"} />
        </div >
    )
};


