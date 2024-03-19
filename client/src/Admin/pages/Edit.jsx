import React, { useContext, useState } from "react";
import { ExhibitContext } from "../SetData.jsx";
import Exhibit from "../classes/exhibit";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

export default function Edit(props) {
    const navigate = useNavigate();
    const { exhibits, setExhibits, playstyles, setPlaystyles } = useContext(ExhibitContext);
    const location = useLocation();

    let done = "Add Exhibit";
    let data = [];
    let exh = {};
    if (location.pathname.includes("edit")) {
        done = "Done"
        if (props.title === "Playstyles") {
        
            //data = playstyles;
            exh = playstyles[props.index]; //the current playstyle
        } else {
            //data = exhibits;
            exh = exhibits[props.index]; //the current exhibit
            
        }
        console.log(exh);
        console.log(exh._id)

    } else {
        exh = new Exhibit("New Exhibit", "")
        if (props.title === "Playstyles") {
            data = playstyles;
        } else {
            data = exhibits;

        }

    }

    const [name, setName] = useState(exh.title);
    const [description, setDescription] = useState(exh.desc);
    const [image, setImage] = useState(exh.image);

    const addExhibit = () => {
        //const newExhibit = new Exhibit(name, description, image);
        //let newData;
        if (location.pathname.includes("edit")) { //if youre editing
            //newData = data
            //newData[props.index] = newExhibit;

            if (props.title === "Playstyles"){ //if editing a playstyle
            axios({ //make request
                url:'http://localhost:5000/admin/editlearningstyle', //edit exhibit
                method: 'POST',
                data: {id:exh.id,title: name, desc: description, image:image},
                headers: {
                  authorization:'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
                },
                catch(error) {console.error('error:', error);
                alert('An error occured.')}
              }).then((res) => {
                //setExhibits(res.data)
                console.log("done.");
            })}else{


                axios({ //make request
                    url:'http://localhost:5000/admin/editexhibit', //edit exhibit
                    method: 'POST',
                    data: {id:exh.id,title: name, desc: description, image:image},
                    headers: {
                      authorization:'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
                    },
                    catch(error) {console.error('error:', error);
                    alert('An error occured.')}
                  }).then((res) => {
                    //setExhibits(res.data)
                    console.log("done.");
                });




            };



        } else {//if adding new
            if (props.title === "Exhibits") {
                

                axios({ //make request
                    url:'http://localhost:5000/admin/addexhibit', //edit exhibit
                    method: 'POST',
                    data: {title: name, desc: description, image:image,status:true},
                    headers: {
                      authorization:'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
                    },
                    catch(error) {console.error('error:', error);
                    alert('An error occured.')}
                  }).then((res) => {
                    //setExhibits(res.data)
                    console.log("done.");
                });

                
            } else {
                
            };
        }

        if (props.title === "Playstyles") {
            //setPlaystyles(newData);
            
            navigate(`/admin/playstyles`);
        } else {
            //setExhibits(newData);
            navigate(`/admin/exhibits`);
        };
    };

    return (
        <form>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>

            <div className="button"  >

                <button type="button" onClick={addExhibit}>
                    {done}
                </button>

                <button type="button" onClick={() => navigate('/admin/exhibits')}>
                    Cancel
                </button>
            </div>
        </form>
    );
}


