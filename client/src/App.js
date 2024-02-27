import logo from './logo.svg';
import React, {Component} from "react";
import './App.css';
import reactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExhibitAdd from './components/adminUpd'
import Map from './components/map'

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ExhibitAdd/>} />
      <Route path="/map" element={<Map/>} />
      <Route path="/playstyles" element={<ExhibitAdd/>} />
      <Route path="/admin" element={<ExhibitAdd/>} />
      <Route path="/admin/editmap" element={<ExhibitAdd/>} />
      <Route path="/admin/editlearningstyle" element={<ExhibitAdd/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
