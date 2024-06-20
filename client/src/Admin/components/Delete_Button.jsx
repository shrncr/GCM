import React from "react"
import axios from 'axios'

export default function Delete_Button(props) {
    async function del(){
        let what = props.title;//console.log(props.title)
        console.log(props.id)
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
          const response = await axios({
            url: `${apiUrl}/${props.title}/delete`,
            method: 'DELETE',
            data: { id: props.id },
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          // Check the response status to confirm success
          if (response.status === 200) {
            alert('Success');
          } else {
            // Handle unexpected status codes
            console.error('Unexpected response:', response);
            alert('An unexpected error occurred.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred.');
        }
    }
    if (props.done == "Done") {
        return <button className="delete_button" onClick={del}>Delete</button>
    } else {
        return
    }

};

