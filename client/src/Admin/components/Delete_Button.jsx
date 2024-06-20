import React from "react"
import axios from 'axios'

export default function Delete_Button(props) {
    function del(){
        let what = props.title;//console.log(props.title)
        console.log(props.id)
        const apiUrl = process.env.REACT_APP_API_URL;
        axios({ //make request
            url: `${apiUrl}/` +props.title + '/delete', //deleting x item
            method: 'DELETE',
            data: { id: props.id },
            headers: {
              "Content-Type": "application/json",
            }
          }).then(() => {
            //console.log('Response:', res);
            alert('success')
          }).catch((error) => {
            console.error('Error:', error);
            alert('An error occurred.');
          });
    }
    if (props.done == "Done") {
        return <button className="delete_button" onClick={del}>Delete</button>
    } else {
        return
    }

};

