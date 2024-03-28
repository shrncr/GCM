import React, {useEffect } from "react";
import axios from "axios";


const PlaystyleNameLoader = (thenFunction) =>{
    useEffect(() => {
        axios({
        url: 'http://localhost:5000/playstyles',
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

export default PlaystyleNameLoader