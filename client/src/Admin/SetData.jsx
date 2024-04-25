import React, { createContext, useState, useEffect } from "react";
import Exhibit from './classes/exhibit.js';
import axios from 'axios';
//Creates all the data for the admin side
// Create context
const ExhibitContext = createContext();

// Context provider component
const SetData = ({ children }) => {
  const [exhibits, setExhibits] = useState([]);
  const [homeAct, setHomeAct] = useState([]);
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

    axios({ //and playstyles
      url: 'http://localhost:8082/activities',
      method: 'GET',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
      catch(error) {
        console.error('error:', error);
        alert('An error occured.')
      }
    }).then((res) => {
      setHomeAct(res.data)
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
    const getCSV = async () => {
      try {
        const c = [];
        const feedback = await axios.get('http://localhost:8082/download-feedback-csv');
        const impressions = await axios.get('http://localhost:8082/download-impressions-csv');
        const session = await axios.get('http://localhost:8082/download-sessions-csv');
        const arr = [feedback, impressions, session];
        console.log("FEEDBACK")
        console.log(feedback)

        arr.forEach(csv => {
          const rows = csv.data.split("\n");
          const d = [];

          rows.forEach(row => {

            const cols = row.replace(/["']/g, "").split(",");

            d.push(cols);
          });
          c.push(d);
        });

        setData(c);
      } catch (error) {
        console.error('Error fetching or processing CSV data:', error);
      }
    };

    getCSV();

  }, []);


  return (
    <ExhibitContext.Provider value={{ exhibits, setExhibits, playstyles, setPlaystyles, homeAct, setHomeAct, locations, setLocations, data, setData, }}>
      {children}
    </ExhibitContext.Provider>
  )
};
export { ExhibitContext };
export default SetData;


