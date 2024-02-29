import React, { useState } from 'react';
import Banner from './banner';
import GridBoxes from './gridBoxes';
import Footer from './footer';
import playExample from '../components/images/playExample.webp'; // Corrected import path


function PlayPlaces() {
    // Define state for boxesData
    const [boxesData, setBoxesData] = useState([
        { id: 1, text: 'Play Place 1', link: '/playInfo', imageUrl: playExample},
        { id: 2, text: 'Play Place 2' },
        { id: 3, text: 'Play Place 3' },
        { id: 4, text: 'Play Place 4' },
        { id: 5, text: 'Play Place 5' },
        { id: 6, text: 'Play Place 6' },
        { id: 7, text: 'Play Place 7' },
        { id: 8, text: 'Play Place 8' },
        { id: 9, text: 'Play Place 9' },
    ]);

    // Function to update boxesData if needed
    const updateBoxesData = (newData) => {
        setBoxesData(newData);
    };

    return (
        <div>
            <Banner className="playstyles-background" text="Places to Play" />
            <h1>I want to play at...</h1>
            <hr />
            {/* Pass boxesData and updateBoxesData as props */}
            <GridBoxes data={boxesData} updateData={updateBoxesData} />
            <Footer />
        </div>
    );
}

export default PlayPlaces;