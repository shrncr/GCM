/**
 * DISPLAYS INFORMATION REGARDING A PLAYSTYLE, EXHIBIT, OR PLAYPLACE WHICH WAS JUST CLICKED
 */

import React from 'react';
import Banner from './banner';
import axios from 'axios'
import Accordion from './accordion';
import { useEffect, useState } from 'react';
import playExample from '../components/images/playExample.webp'; // Corrected import path
import Footer from './footer';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

function SingleInfo() {
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [skills, setSkills] = useState('');
    const [img, setImg] = useState("");
    const { id } = useParams();
    const { dest } = useParams();
    console.log({ id });
    console.log({ dest });
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:8082/${dest}/${id}`)
            .then((res) => {
                console.log(res.data)
                setDesc(DOMPurify.sanitize(res.data.baseData.desc));
                setTitle(res.data.baseData.title);
                setImg(res.data.baseData.image);
                setSkills(res.data.dropdown);
                //setImg(res.data.img)
                console.log(img);
                
                //console.log(res.data)
            })
            .catch((err) => {
                console.log('Error ');
            });



            
    }, [id, dest]);

    const data = []

    const length = 5; // Specify the desired length
    for (let i = 0; i < length; i++) {
        data.push({
            id: i,
            label: `Skill ${i + 1}`,
            renderContent: () => (
                <div>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam consectetur alias voluptatibus magni praesentium, expedita rerum consequuntur ut possimus cumque blanditiis corporis fugiat ipsam iste voluptatem quis aut! Dolore, harum.
                    </p>
                    <div className="link-container-accordion">
                        {/* Small boxes as links */}
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            )
        });
    }



    return (
        <div>
            <Banner className="home-background" text={title}   />

            <h2>About {title}</h2>
            <p dangerouslySetInnerHTML={{ __html: desc }}></p>
            <hr />
            <div className="container">
                <img src={img} alt="Logo" className='PlayInfo-img' />
                <Accordion items={data} keepOthersOpen={true} />

            </div>
            <Footer />
        </div>
    );
}

export default SingleInfo;
