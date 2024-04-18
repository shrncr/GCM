import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const TextEditor = () => {
    const [text, setText] = useState(''); // State to hold the editor's content
    const [savedContent, setSavedContent] = useState(''); // State to store the saved content

    // Configuration for the Quill editor's toolbar
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'], // Toggle buttons for bold, italic, and underline
            [{ 'color': [] }, { 'background': [] }], // Dropdowns for text color and background color
            [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Buttons for bullet points and numbered lists
            [{ 'indent': '-1'}, { 'indent': '+1' }], // Buttons for indenting options
            [{ 'size': ['small', false, 'large', 'huge'] }], // Dropdown for font size, need to see how difficult it will be to implement numbered size
        ],
    };

    const formats = [
        'bold', 'italic', 'underline',
        'color', 'background',
        'list', 'bullet', 'indent',
        'size'
    ];

    // Handles content changes in the editor
    const handleChange = (content, delta, source, editor) => {
        setText(editor.getHTML()); 
    };
    // Saves text as an HTML element into a variable for exporting
    const handleSave = () => {
        setSavedContent(text);
        };

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={text}
                onChange={handleChange}
                modules={modules}
                formats={formats}
            />
             <button onClick={handleSave} style={{ marginTop: '10px' }}>Save</button>
        </div>
    );
};

export default TextEditor;
