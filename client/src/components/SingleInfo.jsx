import React, { useEffect, useState } from 'react';
import Banner from './banner';
import axios from 'axios';
import Accordion from './accordion';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Footer from "./footer.jsx"
function SingleInfo() {
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [skills, setSkills] = useState([]);

    const { id, dest } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8082/${dest}/${id}`)
            .then((res) => {
                const { baseData, dropdown } = res.data;
                setDesc(DOMPurify.sanitize(baseData.desc));
                setTitle(baseData.title);
                setSkills(dropdown);
            })
            .catch((err) => {
                console.log('Error:', err);
            });
    }, [id, dest]);




    return (
        <div>
            <Banner className="home-background" text={title} />
            <h2>{title}</h2>
            <hr />
            <p dangerouslySetInnerHTML={{ __html: desc }}></p>
            <div className="container">
                <Accordion items={skills} keepOthersOpen={true} />
            </div>
            <Footer />
        </div>
    );
}

export default SingleInfo;

