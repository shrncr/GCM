import React, { useContext, useState } from "react";
import { ExhibitContext } from "../SetData";
import { CSVLink } from "react-csv";
import axios from 'axios';


export default function Data(props) {
    const { data } = useContext(ExhibitContext);
    const [spread, setSpread] = useState(data[0]);
    const [loc, setLoc] = useState("Feedback");

    const handleSpreadChange = (newindex, l) => {
        setLoc(l);
        setSpread(data[newindex]);
    };

    const handleDownload = async () => {
        console.log(loc);
        switch (loc) {
            case "Feedback":
                break;
            case "Impressions":
                try {
                    const response = await axios.get('http://localhost:8082/download-impressions-csv', {
                        responseType: 'blob',
                    });
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'impressions.csv');
                    document.body.appendChild(link);
                    link.click();
                } catch (error) {
                    console.error('Error downloading the CSV:', error);
                }
                break;
            case "Session":
                try {
                    const response = await axios.get('http://localhost:8082/download-sessions-csv', {
                        responseType: 'blob',
                    });
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'sessions.csv');
                    document.body.appendChild(link);
                    link.click();
                } catch (error) {
                    console.error('Error downloading the CSV:', error);
                }
                break;
        }
    };

    return (
        <>
            <div>
                <h1 className='header'>Data</h1>
            </div>
            <div className="dropdown">
                <div className='dropdown-button'>
                    Select Data
                </div>
                <div className="dropdown-menu">
                    <button onClick={() => handleSpreadChange(0, "Feedback")}>Feedback</button>
                    <button onClick={() => handleSpreadChange(1, "Impressions")}>Impressions</button>
                    <button onClick={() => handleSpreadChange(2, "Session")}>Session</button>
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
                <button onClick={handleDownload}>Download</button>
            </div>
        </>
    );
}

