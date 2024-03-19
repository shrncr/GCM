import React, { createContext, useState, useEffect } from "react";
import Exhibit from './classes/exhibit.js';
import axios from 'axios';

// Create context
const ExhibitContext = createContext();

// Context provider component
const SetData = ({ children }) => {
    const [exhibits, setExhibits] = useState([]);
    const [playstyles, setPlaystyles] = useState([]);

    // Use useEffect to set exhibits after the initial render
    useEffect( () => {
        const exh = [];
        const play = [];
        // for (let i = 0; i < 5; i++) {
        //     const n = new Exhibit(`Exhibit${i}`, `This is going to be the greatest exhibit ${i}`);
        //     const p = new Exhibit(`Playstyles${i}`, `This is going to be the greatest playstyle ${i}`);
        //     exh.push(n);
        //     play.push(p)
        // }
        axios({ //get exhibits
            url:'http://localhost:5000/exhibits',
            method: 'GET',
            headers: {
              authorization:'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
            catch(error) {console.error('error:', error);
            alert('An error occured.')}
          }).then((res) => {
            setExhibits(res.data)});

        axios({ //and playstyles
            url:'http://localhost:5000/playstyles',
            method: 'GET',
            headers: {
                authorization:'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
            catch(error) {console.error('error:', error);
            alert('An error occured.')}
            }).then((res) => {
            setPlaystyles(res.data)});

        // Set the exhibits with any array of exhibits class
        //setExhibits(exh);
        //setPlaystyles(play);
    }, []);

    return (
        <ExhibitContext.Provider value={{ exhibits, setExhibits, playstyles, setPlaystyles }}>
            {children}
        </ExhibitContext.Provider>
    )
};
export { ExhibitContext };
export default SetData;


