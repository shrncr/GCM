import React, { createContext, useState, useEffect } from "react";
import Exhibit from './classes/exhibit.js';
import axios from 'axios';

// Create context
const ExhibitContext = createContext();

// Context provider component
const SetData = ({ children }) => {
  const [exhibits, setExhibits] = useState([]);
  const [playstyles, setPlaystyles] = useState([]);
  const [locations, setLocations] = useState([]);

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

  return (
    <ExhibitContext.Provider value={{ exhibits, setExhibits, playstyles, setPlaystyles, locations, setLocations }}>
      {children}
    </ExhibitContext.Provider>
  )
};
export { ExhibitContext };
export default SetData;


