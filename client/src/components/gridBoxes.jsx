import React from 'react';
import { Link } from 'react-router-dom';

function GridBoxes({ data, updateData }) {
    // Function to handle updating data
    const handleUpdateData = () => {
        const newData = [
            { id: 1, text: 'New Box 1', link: '/newPlayInfo' },
            { id: 2, text: 'New Box 2' },
            // Add or modify data as needed
        ];
        // Call the updateData function passed from the parent component
        updateData(newData);
    };

    return (
        <div className="grid-container">
            {/* Map over the data array to render each box */}
            {data.map(box => (
                <Link key={box.id} to={box.link}>
                    <div className="box">
                      {box.text}
                    
                        
                        
                    </div>
                </Link>
            ))}
            {/* Button to update data */}
            
        </div>
    );
}

export default GridBoxes;