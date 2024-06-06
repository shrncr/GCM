import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Font = ReactQuill.Quill.import('formats/font');
 // Set the whitelist for the fonts you want to include
ReactQuill.Quill.register(Font, true);

const TextEditor = ({ value, onChange }) => {
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', { 'header': 1 }, { 'header': 2 }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'align': [] }],
        ],
    };

    const formats = [
        'bold', 'italic', 'underline', 'header',
        'font', // Ensure 'font' is included here
        'size',
        'color', 'background',
        'list', 'bullet', 'indent',
        'align'
    ];

    const handleChange = (content, delta, source, editor) => {
        onChange(editor.getHTML()); // Use the onChange prop to update the parent's state
    };

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={value} // Use the value prop
                onChange={handleChange}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default TextEditor;
