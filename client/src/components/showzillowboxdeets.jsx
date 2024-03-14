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

function SingleInfo() {
    const [desc, setdesc] = useState('');

    const {id} = useParams();
    const {dest} = useParams();
    console.log({id});
    console.log({dest});
    const navigate = useNavigate();
    useEffect(() => {
        axios
          .get(`http://localhost:5000/${dest}/${id}`)
          .then((res) => {
            setdesc(res.data.desc);
          })
          .catch((err) => {
            console.log('Error ');
          });
      }, [id,dest]);

    const data = [
        { 
            id: 0,
            label: "About ",
            renderContent: () => (
                
            <p>
                {desc}
            </p>
            ),
        },
        {
            id: 1,
            label: "Skills Taught",
            renderContent: () => (
            <p>
                wjnosrv
            </p>
            ),
        },
        {
            id: 2,
            label: "Ways to Play",
            renderContent: () => (
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, harum natus! Voluptatibus libero ratione vitae repellat, quasi vero tempora recusandae beatae deserunt sint voluptate doloremque maxime eveniet soluta similique dignissimos.
            </p>
            ),
        },
        {
            id: 3,
            label: "More Resources",
            renderContent: () => (
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, harum natus! Voluptatibus libero ratione vitae repellat, quasi vero tempora recusandae beatae deserunt sint voluptate doloremque maxime eveniet soluta similique dignissimos.
            </p>
            ),
        }
    ];
    

    return (
        <div>
            <Banner className="home-background" text="Welcome" />
            <h2>About Play Style {desc}</h2>
            <hr />
            <div className="container">
                <img src={playExample} alt="Logo" className='PlayInfo-img' />
                <Accordion items={data} keepOthersOpen={true}/>
            
            </div>
        <Footer />
        </div>
    );
}

export default SingleInfo;
