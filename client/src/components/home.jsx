import React, { useState, useEffect } from 'react';
import Banner from './banner';
import Footer from './footer';
import GridBoxes from './gridBoxes';
import axios from 'axios';


function Home() {
  const [boxesData, setBoxesData] = useState([
    { id: 1, title: 'Learn to Play', link: '/playstyles'},
    { id: 2, title: 'Places to Play', link: '/playPlaces' },
    
]);

// Function to update boxesData if needed
const updateBoxesData = (newData) => {
  setBoxesData(newData);
};
// time_of_day impression
useEffect(() => { // useEffect hook for tracking the visit
  const time_of_day = new Date(); // capture the visit time
  axios.post('http://localhost:8082/api/impressions/create', { time_of_day })
    .then(response => {
      console.log('Visit time recorded:', response.data); // success :P
    })
    .catch(error => {
      console.error('Error recording visit time:', error); // error :<
    });
}, []); // empty dependency array ensures this runs once on mount
  return (
    
    <div>
      <Banner className="home-background" text="Welcome" />
      <h2>Welcome to My Website</h2>
      <hr></hr>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sit rem nisi maiores molestiae, ad asperiores illum earum facere recusandae explicabo praesentium minima eos sed, voluptates porro, dicta nihil eveniet.</p>
      <h3>What are Play Styles?</h3>
      <ul>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>

        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>
      </ul>
      <h3>How to Learn</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aspernatur vero distinctio unde, minima, doloremque et, sunt iusto quia obcaecati quidem ut aperiam. Est nostrum dolorum eaque praesentium nihil dicta!</p>
      <GridBoxes data={boxesData} updateData={updateBoxesData} />      
      <Footer/>
    </div>
  );
}

export default Home;