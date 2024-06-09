import React, { useContext, useEffect, useState } from "react";
import { ExhibitContext } from "../SetData.jsx";
import axios from 'axios'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import TextEditor from "../components/TextEditor.js";

const apiUrl = process.env.REACT_APP_API_URL;

/*
Component admin will use to edit locations on map
*/

export default function HomeEdit(props) {
    const navigate = useNavigate();
    let [HomeText, setHomeText] = useState("");
    const title = props.title

    useEffect(()=>{
        axios({
            url: `${apiUrl}/${title}`,
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

    },[title])

    const handleHomeTextChange = (content) => {
        setHomeText(content);
      };

    const editHome = () => {
      console.log(title)
        console.log("inhere")
        axios({
            url: `${apiUrl}/${title}`,
            method: 'POST',
            data: {homeText: HomeText},
            headers: {
              authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
            },
          }).then((res) => {
            console.log("done")
            setHomeText("")
            navigate(-1)
          });
    }
    
    return (
        < div >
            <TextEditor value = {HomeText} onChange={handleHomeTextChange}/>
            
            <div className="edit_button"  >
            <button className="normal" type="button" onClick={editHome}>
              {`Submit New ${title} Text`}
            </button>

            <button className="normal" type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div >
    )
};

