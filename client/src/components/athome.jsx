import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './banner';
import GridBoxes from './gridBoxes';
import Footer from './footer';
import SideButton from './sideButton';
import Cookies from "js-cookie";



function AtHome() {
    let [ageRanges, setAgeRanges] = useState([]);
    
    useEffect(() => {
        if (Cookies.get("ages")) {
            console.log(Cookies.get("ages"));
            setAgeRanges(Cookies.get("ages").split(',')); // Assuming the ages are stored as a comma-separated string
        } else {
            setAgeRanges(null);
        }
    }, []);

    useEffect(() => {
        console.log(ageRanges);
    }, [ageRanges]);

    function filterExhibitData(data) {
        return data.filter(item => 
            item.atHome === true && ageRanges != null ? 
            ageRanges.some(age => item.skills.includes(age)) : 
            true
        );
    }

    const apiUrl = process.env.REACT_APP_API_URL;
    const [exdata, setExhibitData] = useState([]);
    let [HomeText, setHomeText] = useState('');
    const [interactions, setInteractions] = useState(0);
    useEffect(() => {
        axios({
            url: `${apiUrl}/homeactivities`,
            method: 'GET',
            headers: {
                authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
            catch(error) {
                console.error('error:', error);
                alert('An error occured.')
            }
        }).then((res) => {
            setExhibitData(res.data)
        });

        axios({
            url: `${apiUrl}/Activitiespage`,
            method: 'GET',
            headers: {
              authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
            catch(error) {
              console.error('error:', error);
              alert('An error occured.')
            }
          }).then((res) => {
            setHomeText(res.data.desc)
          });
      
    }, []);

    return (
        <>
            <Banner className="playstyles-background" text="Home Play" />
            <SideButton/>
            <p className='user' dangerouslySetInnerHTML={{ __html: HomeText }}></p>
            <GridBoxes data={filterExhibitData(exdata)} />
            <Footer />
        </>
    );
}

export default AtHome;