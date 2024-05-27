import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './banner';
import GridBoxes from './gridBoxes';
import Footer from './footer';

function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|MQQBrowser|Opera Mini|Windows Phone|webOS|Kindle|Silk-Accelerated|(hpw|web)OS/i.test(ua)) {
        return "mobile";
    }
    return "desktop";
}



function filterExhibitData(data) {
    return data.filter(item => item.atHome === true);
}

function AtHome() {
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
    useEffect(() => {
        const deviceType = getDeviceType();
        const page = 'athome';
        const time_of_day = new Date();
        const apiUrl = process.env.REACT_APP_API_URL;
        axios.post(`${apiUrl}/create`, { time_of_day, page, deviceType })
            .then(response => {
                console.log('Visit and session start recorded:', response.data);
            })
            .catch(error => {
                console.error('Error recording visit and session start:', error);
            });

        function handleUnload() {
            const sessionEnd = new Date();
            const sessionDuration = sessionEnd - time_of_day; // Duration in milliseconds

            axios.post(`${apiUrl}/sessions/end`, {
                deviceType,
                sessionDuration,
                page,
                bounce: interactions === 0 // Consider it a bounce if no interactions
            }).then(response => console.log('Session end data saved:', response.data))
                .catch(error => console.error('Error saving session end data:', error));
        }

        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [interactions]);

    return (
        <>
            <Banner className="playstyles-background" text="Home Play" />
            <p className='user' dangerouslySetInnerHTML={{ __html: HomeText }}></p>
            <GridBoxes data={filterExhibitData(exdata)} />
            <Footer />
        </>
    );
}

export default AtHome;