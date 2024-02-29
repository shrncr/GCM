import React, { useState } from 'react';
import Banner from './banner';
import GridBoxes from './gridBoxes';
import Footer from './footer';
import playExample from '../components/images/playExample.webp'; // Corrected import path


function PlayStylesPage() {
    // Define state for boxesData
    const [boxesData, setBoxesData] = useState([
        { id: 1, text: 'Play Style 1', link: '/playInfo', imageUrl: playExample},
        { id: 2, text: 'Play Style 2' },
        { id: 3, text: 'Play Style 3' },
        { id: 4, text: 'Play Style 4' },
        { id: 5, text: 'Play Style 5' },
        { id: 6, text: 'Play Style 6' },
        { id: 7, text: 'Play Style 7' },
        { id: 8, text: 'Play Style 8' },
        { id: 9, text: 'Play Style 9' },
    ]);

    // Function to update boxesData if needed
    const updateBoxesData = (newData) => {
        setBoxesData(newData);
    };

    return (
        <div>
            <Banner className="playstyles-background" text="How to Play" />
            <h1>I want to learn about...</h1>
            <hr />
            {/* Pass boxesData and updateBoxesData as props */}
            <GridBoxes data={boxesData} updateData={updateBoxesData} />
            <Footer />
        </div>
    );
}

export default PlayStylesPage;