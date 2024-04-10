import React from 'react';
import { Link } from 'react-router-dom';

export default function Zillow_Box(props) {
    const { id, name, image } = props;
    const nospace = name.replace(/\s+/g, '_');
    return (
        <Link to={`${nospace}`} className="zillow-box">
            <div>
                <h1>{name}</h1>
            </div>
        </Link>
    );
}





