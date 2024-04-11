import React, { useContext, useState } from "react"
import { ExhibitContext } from "../SetData"
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv"

export default function Data(props) {
    const { data } = useContext(ExhibitContext);
    const [spread, setSpread] = useState(data[0]);
    let index = props.index
    const handleSpreadChange = (newindex) => {
        index = newindex
        setSpread(data[newindex]);
    };

    const download = () => {
        //Download the JSON using API?
    };

    return (
        <>
            <h1 className='header'>Data</h1>

            <div className="dropdown">

                <div className='dropdown-button'>
                    Select Data
                </div>
                <div className="dropdown-menu">
                    <button onClick={() => handleSpreadChange(0)}>Type2</button>
                    <button onClick={() => handleSpreadChange(1)}>Type2</button>
                    <button onClick={() => handleSpreadChange(2)}>Type3</button>
                </div>
            </div>


            <div className='data-container'>
                <table>
                    <thead>
                        <tr>
                            {spread[props.index] && spread[props.index].map((e, index) => (
                                <th key={index}>{e}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {spread.slice(1, -1).map((item, index) => (
                            <tr key={index}>
                                {item.map((bruh, innerIndex) => (
                                    <td key={innerIndex}>{bruh}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div className="download">
                <button onClick={download}>Download</button>
            </div>
        </>
    )
};

