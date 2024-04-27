import React, { useEffect, useState } from 'react';
import Banner from './banner';
import axios from 'axios';
import Accordion from './accordion';
import playExample from '../components/images/playExample.webp';
import Footer from './footer';
import ExhibitFeedback from '../Admin/components/Feedback';

function PlayInfo({ title }) {
    const [desc, setDesc] = useState([]);
    const [skills, setSkills] = useState([]);
    const apiUrl = process.env.VERCEL_URL;

    useEffect(() => {
        // Fetch data based on the title
        axios.get(`${apiUrl}/${title}`)
            .then((res) => {
                setDesc(res.data.baseData.desc);
                setSkills(res.data.dropdown);
            })
            .catch((err) => {
                console.log('Error fetching data: ', err);
            });
    }, [title]);

    const data = [
        {
            id: 0,
            label: `About ${title}`,
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
                    {skills}
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
            <h2>About {title}</h2>
            <hr />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nihil doloremque atque deserunt molestiae vel cupiditate necessitatibus velit sequi magnam, dolore consequatur suscipit ad enim nesciunt tenetur voluptate repellendus repellat.</p>

            <div className="container">
                <img src={playExample} alt="Logo" className='PlayInfo-img' />
                <Accordion items={data} keepOthersOpen={true} />
            </div>
            <ExhibitFeedback exhibitId={title}/>
            <Footer />
        </div>
    );
}

export default PlayInfo;
