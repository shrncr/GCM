import React, { createContext, useState, useEffect } from "react";
import Exhibit from './classes/exhibit.js';
import axios from 'axios';
//Creates all the data for the admin side
// Create context
const ExhibitContext = createContext();

// Context provider component
const SetData = ({ children }) => {
  const [exhibits, setExhibits] = useState([]);
  const [playstyles, setPlaystyles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [data, setData] = useState([]);

  // Use useEffect to set exhibits after the initial render
  useEffect(() => {
    const exh = [];
    const play = [];
    axios({ //get exhibits
      url: 'http://localhost:8082/allexhibits',
      method: 'GET',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
      catch(error) {
        console.error('error:', error);
        alert('An error occured.')
      }
    }).then((res) => {
      setExhibits(res.data)
    });

    axios({ //and playstyles
      url: 'http://localhost:8082/playstyles',
      method: 'GET',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
      catch(error) {
        console.error('error:', error);
        alert('An error occured.')
      }
    }).then((res) => {
      setPlaystyles(res.data)
    });

    axios({
      url: 'http://localhost:8082/map',
      method: 'GET',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
      catch(error) {
        console.error('error:', error);
        alert('An error occured.')
      }
    }).then((res) => {
      setLocations(res.data)
    });
  }, []);

  //THIS USE EFFECT IS TO SET DATA PAGE
  useEffect(() => {
    const d = [];
    const d1 = [];
    const d2 = [];
    const d3 = [];

    d1.push(["Name", "County", "Region"])
    d2.push(["Color", "Paint", "Canvas", "Orange"])
    d3.push(["Apples", "Bananas"])
    for (let i = 0; i < 100; i++) {
      d1.push([`this ${i}`, `is ${i}`, `data ${i}`])
      d2.push([`bruh ${i}`, `what ${i}`, `the ${i}`, `fuck ${i}`])
      d3.push([`is ${i}`, `this ${i}`])
    }
    d.push(d1);
    d.push(d2);
    d.push(d3);

    // Set the exhibits with any array of exhibits class
    setData(d)
  }, []);

  return (
    <ExhibitContext.Provider value={{ exhibits, setExhibits, playstyles, setPlaystyles, locations, setLocations, data, setData }}>
      {children}
    </ExhibitContext.Provider>
  )
};
export { ExhibitContext };
export default SetData;


