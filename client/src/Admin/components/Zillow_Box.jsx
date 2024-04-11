import React from 'react';
import { Link } from 'react-router-dom';

export default function Zillow_Box(props) {
    const { id, name, image } = props;
    let dest = name.replace(/\s+/g, '_');
    if (dest.substring(0, 3) == "Add") {
        dest = "add";
    }
    return (
        <Link to={`${dest}`} className="zillow-box">
            <div>

                <h1>{name}</h1>

            </div>
        </Link>
    );
}





