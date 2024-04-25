import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ value, onChange }) => {
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
        ],
    };

    const formats = [
        'bold', 'italic', 'underline',
        'color', 'background',
        'list', 'bullet', 'indent',
        'size'
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
