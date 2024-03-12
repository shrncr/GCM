//import logo from './logo.svg';
import React, {Component} from "react";
import './App.css';
import reactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import ExhibitAdd from './components/adminUpd'
import Map from './components/map'

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Map/>} />
      <Route path="/map" element={<Map/>} />
      <Route path="/playstyles" element={<Map/>} />
      <Route path="/admin" element={<Map/>} />
      <Route path="/admin/editmap" element={<Map/>} />
      <Route path="/admin/editlearningstyle" element={<Map/>} />
    </Routes>
  </BrowserRouter>
  );
}


export default App;
