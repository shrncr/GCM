import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './banner';
import GridBoxes from './gridBoxes';
import Footer from './footer';
import SideButton from './sideButton';
import Cookies from "js-cookie";
import CarouselAct from './carousel';



function AtHome() {
    let [ageRanges, setAgeRanges] = useState([]);
    
    useEffect(() => { //get age ranges which you may need to filter by
        if (Cookies.get("ages")) {
            console.log(Cookies.get("ages"));
            setAgeRanges(Cookies.get("ages").split(',')); // Assuming the ages are stored as a comma-separated string
        } else {
            setAgeRanges(null);
        }
    }, []);

    useEffect(() => { //just printing the age ranges selected
        console.log(ageRanges);
    }, [ageRanges]);



    const apiUrl = process.env.REACT_APP_API_URL;
    const [exdata, setExhibitData] = useState([]);
    const [playstyles,setPlaystyles] = useState([]);
    let [HomeText, setHomeText] = useState('');
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
            url: `${apiUrl}/playstyles`,
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

    function filterExhibitData(data) { //filters activities to only show ones associated with selected ages
        let filteredActivities= data.filter(item => 
            item.atHome === true && ageRanges != null ? 
            ageRanges.some(age => item.skills.includes(age)) : 
            true
        );
        console.log(playstyles)
        let playstyleActivities = Object.fromEntries(
            playstyles.map(style => [
                style.title,
                filteredActivities.filter(activity => 
                    activity.skills.some(skill => style.skills.includes(skill))
                )
            ])
        );
        return(playstyleActivities)
        
    }

    return (
        <>
            <Banner className="https://gcmchildrensmuseum.s3.amazonaws.com/toys+all+over+f+22a082bd-a64a-4b9c-b786-1b62b0adf596.png" text="Home Play" />
            <SideButton/>
            <p className='user' dangerouslySetInnerHTML={{ __html: HomeText }}></p>
            {playstyles && playstyles.map((style)=>
            <>
            <div className='styletitlecontainer'>
            <p className='styletitle'>{style.title}</p>
            </div>
            
            <CarouselAct data={filterExhibitData(exdata)[style.title]}/>
            {/* <GridBoxes data={filterExhibitData(exdata)[style.title]} /> */}
            </>
            )}
            
            <Footer />
        </>
    );
}

export default AtHome;