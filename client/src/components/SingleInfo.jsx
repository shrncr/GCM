import React, { useEffect, useState } from 'react';
import Banner from './banner';
import axios from 'axios';
import Accordion from '../Admin/components/Accordion.jsx';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Footer from "./footer.jsx"
import ExhibitFeedback from '../Admin/components/Feedback.jsx';
function SingleInfo() {
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [skills, setSkills] = useState([]);
    const [img, setImg] = useState("");

    const { id, dest } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;

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
            <Banner className={img} text={title} />
            <h4 className="descriptoin" dangerouslySetInnerHTML={{ __html: desc }}></h4>
            <hr />
            <br></br>
            <br></br>
            <div className="accordion-container">

                <Accordion skills={skills} title={t} side={""} />
            </div>
            <div className="feedback-containter">
                <ExhibitFeedback exhibitId={title} />
            </div>
            <Footer />
        </div>
    );
}

export default SingleInfo;

