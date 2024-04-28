import React from 'react';
import { Link } from 'react-router-dom';

export default function Zillow_Box(props) {
    const { id, name, image, className } = props;
    let dest = id.replace(/\s+/g, '_');

    return (
        <Link to={`${dest}`} className={className}>
            <div>

                <h5>{name}</h5>

            </div>
        </Link >
    );
}





