import React from "react"
import axios from 'axios'

export default function Delete_Button(props) {
    function del(){
        let what = props.title;//console.log(props.title)
        const apiUrl = process.env.REACT_APP_API_URL;
        axios({ //make request
            url: `${apiUrl}/` +props.title + '/delete', //deleting x item
            method: 'DELETE',
            data: { id: props.id },
            headers: {
             "Authorization": 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
            catch(error) {
              console.error('error:', error);
              alert('An error occured.')
            }
          }).then((res) => {console.log("success")
          })
    }
    if (props.done == "Done") {
        return <button className="delete_button" onClick={del}>Delete</button>
    } else {
        return
    }

};

