//creaetes resources page
import React, { useState, useEffect } from 'react';
import Banner from './banner';
import Footer from './footer';
import axios from 'axios';


function Resources() {
  


useEffect(() => { // useEffect hook for tracking the visit
  const time_of_day = new Date(); // capture the visit time
  axios.post('/api/impressions/create', { time_of_day }) // make sure the endpoint matches your server's
    .then(response => {
      console.log('Visit time recorded:', response.data); // success :P
    })
    .catch(error => {
      console.error('Error recording visit time:', error); // error :<
    });
}, []); // empty dependency array ensures this runs once on mount
  return (
    
    <div>
      <Banner className="home-background" text="Resources" />
      <h2>More Info</h2>
      <hr></hr>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sit rem nisi maiores molestiae, ad asperiores illum earum facere recusandae explicabo praesentium minima eos sed, voluptates porro, dicta nihil eveniet.</p>
      <h3>Things to Checkout</h3>
      <ul>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>
      <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>

        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quod aliquid delectus esse, minima id nam dolorum voluptatem provident repellendus et iusto dolorem consectetur reiciendis nulla voluptatibus. Reiciendis, itaque magnam.</li>
      </ul>
      <h3>Aditional Info</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aspernatur vero distinctio unde, minima, doloremque et, sunt iusto quia obcaecati quidem ut aperiam. Est nostrum dolorum eaque praesentium nihil dicta!</p>
      <Footer/>
    </div>
  );
}

export default Resources;