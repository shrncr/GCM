import React, { useEffect } from "react";
import axios from "axios";


const NameLoader = (typeLoading, thenFunction) => {
    let reqLink = 'http://localhost:8082/' + typeLoading
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