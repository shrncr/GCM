/* NameLoader

This is our NameLoader component. It simply is a way to make our
code more compact and lessen the file size. Since we use this same
axios request a lot of times but with slightly different parts to it,
we made a component that can be easily called with two parameters
to specify where you are getting the information from and what
you want to do with it. */


/*
*   Loading an exhibit/playstyle: baseData/dropdown KEYS
*                               BaseData contains data associated with exhibit itself  
*                               dropdown contains the associated skills/activites/whatever intended to go in the dropdown
*/
import React, { useEffect } from "react";
import axios from "axios";


const NameLoader = (typeLoading, thenFunction) => {
    const apiUrl = process.env.VERCEL_URL;
    let reqLink = '${apiUrl}/' + typeLoading
    useEffect(() => {
        axios({
        url: reqLink,
        method: 'GET',
        headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
        }
        }).then(thenFunction)
            .catch(error => {
                console.error('error:', error);
                alert('An error occurred.');
            });
    }, []);
};

export default NameLoader