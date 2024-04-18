import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useNavigate, useRoutes } from 'react-router-dom';
import TextEditor from "../components/TextEditor"
export default function Home(props) {
    
    //THIS PAGE WILL BE A WELCOME SCREEN FOR THE USER 
    return (
        <form>
        <div className="welcome">
            <h1>Welcome User</h1>
            
        </div>
        <div className = "homepage-editor">
            <TextEditor/>
        </div>
        </form>
    )
};

