import React, {useState} from "react"
import TextEditor from "../components/TextEditor"
import GridBoxes from "../../components/gridBoxes"

export default function Home(props) {
    const [boxesData, setBoxesData] = useState([
        { id: 1, title: 'Edit Exhibits', link: '../exhibits'},
        { id: 2, title: 'Edit Playstyles', link: '../playstyles' },
        { id: 3, title: 'Edit Map', link: '../map' },
        { id: 4, title: 'View Data', link: '../data' },
        
    ]);
    //THIS PAGE WILL BE A WELCOME SCREEN FOR THE USER 
    return (
        <form>
        <div className="welcome">
            <h1>Welcome User</h1>        
        </div>
        <GridBoxes data={boxesData}/>
        <div className = "homepage-editor">
            <TextEditor/>
        </div>
        </form>
    )
};

