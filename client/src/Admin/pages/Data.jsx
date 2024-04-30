import React, { useContext, useState, useEffect } from "react";
import { ExhibitContext } from "../SetData";
import { CSVLink } from "react-csv";
import axios from 'axios';


export default function Data(props) {
    const [data, setData] = useState();
    const [spread, setSpread] = useState(data[0]);
    const [loc, setLoc] = useState("Feedback");
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getCSV = async () => {
            try {
                const c = [];
                const feedback = await axios.get(`${apiUrl}/download-feedback-csv`);
                const impressions = await axios.get(`${apiUrl}/download-impressions-csv`);
                const session = await axios.get(`${apiUrl}/download-sessions-csv`);
                const arr = [feedback, impressions, session];
                console.log("FEEDBACK")
                console.log(feedback)

                arr.forEach(csv => {
                    const rows = csv.data.split("\n");
                    const d = [];

                    rows.forEach(row => {

                        const cols = row.replace(/["']/g, "").split(",");

                        d.push(cols);
                    });
                    c.push(d);
                });

                setData(c);
            } catch (error) {
                console.error('Error fetching or processing CSV data:', error);
            }
        };

        getCSV();

    }, []);
    const handleSpreadChange = (newindex, l) => {
        setLoc(l);
        setSpread(data[newindex]);
    };

    const handleDownload = async () => {
        console.log(loc);
        switch (loc) {
            case "Feedback":
                try {
                    const response = await axios.get(`${apiUrl}/download-feedback-csv`, {
                        responseType: 'blob',
                    });
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'feedback.csv');
                    document.body.appendChild(link);
                    link.click();
                } catch (error) {
                    console.error('Error downloading the CSV:', error);
                }
                break;
            case "Impressions":
                try {
                    const response = await axios.get(`${apiUrl}/download-impressions-csv`, {
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
                    const response = await axios.get(`${apiUrl}/download-sessions-csv`, {
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
                <h1 className='admin-header'>Data</h1>

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

