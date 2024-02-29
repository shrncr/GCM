import React from 'react';
import Banner from './banner';
import Accordion from './accordion';
import playExample from '../components/images/playExample.webp'; // Corrected import path
import Footer from './footer';

function PlayInfo() {
    const data = [
        { 
            id: 0,
            label: "About Play style 1",
            renderContent: () => (
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, harum natus! Voluptatibus libero ratione vitae repellat, quasi vero tempora recusandae beatae deserunt sint voluptate doloremque maxime eveniet soluta similique dignissimos.
            </p>
            ),
        },
        {
            id: 1,
            label: "Skills Taught",
            renderContent: () => (
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, harum natus! Voluptatibus libero ratione vitae repellat, quasi vero tempora recusandae beatae deserunt sint voluptate doloremque maxime eveniet soluta similique dignissimos.
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
            <h2>About Play Style 1</h2>
            <hr />
            <div className="container">
                <img src={playExample} alt="Logo" className='PlayInfo-img' />
                <Accordion items={data} keepOthersOpen={true}/>
            
            </div>
        <Footer />
        </div>
    );
}

export default PlayInfo;
