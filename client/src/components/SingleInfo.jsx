import React, { useEffect, useState } from 'react';
import Banner from './banner';
import axios from 'axios';
import SelectionBoxes from './selectionBoxes.jsx';
import Accordion from '../Admin/components/Accordion.jsx';
import { useParams, useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Footer from "./footer.jsx"
import SideButton from './sideButton.jsx';
import Cookies from "js-cookie";
import ExhibitFeedback from '../Admin/components/Feedback.jsx';
function SingleInfo() {

    const { state } = useLocation();
    console.log(state)
    const [desc, setDesc] = useState('');
    const [sel,setSel] = useState(null);
    const [title, setTitle] = useState('');
    const [skills, setSkills] = useState([]);
    const [img, setImg] = useState("");
    //const [selSkill, setSelSkill] = useState(props.sel? props.sel : "")
    const { id, dest } = useParams();
    let [ageRanges, setAgeRanges] = useState([]);
    
    useEffect(() => {
        if (Cookies.get("ages")) {
            console.log(Cookies.get("ages"));
            setAgeRanges(Cookies.get("ages").split(',')); // Assuming the ages are stored as a comma-separated string
        } else {
            setAgeRanges(null);
        }
    }, []);

    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(()=>{ 
        setSel(state)
    },[state])
    useEffect(() => {
        axios.get(`${apiUrl}/${dest}/${id}`)
            .then((res) => {
                const { baseData, dropdown } = res.data;

                setDesc(DOMPurify.sanitize(baseData.desc));
                setImg(baseData.image);
                setTitle(baseData.title);
                setSkills(dropdown);

            })
            .catch((err) => {
                console.log('Error:', err);
            });
    }, [id, dest]);

    let t;
    if (dest == "playPlaces") {
        t = "Exhibits"
    } else {
        t = "Playstyles"
    }




    return (
        <div>
            <Banner className={img ===undefined? " noImgBanner" :img} text={title} />
            {dest == "playPlaces" ? <SideButton/> : <></>}
            <h4 className="descriptoin" dangerouslySetInnerHTML={{ __html: desc }}></h4>
            <hr />
            <br></br>
            <br></br>
            <div className="accordion-container">
                <SelectionBoxes skills={skills } title={t} side={""} sel = {sel}/>
                {/* <Accordion skills={skills} title={t} side={""} /> */}
            </div>
            <div className="feedback-containter">
                {dest == "athome" ? <ExhibitFeedback exhibitId={title} />: <p></p>}
            </div>
            <Footer />
        </div>
    );
}

export default SingleInfo;

