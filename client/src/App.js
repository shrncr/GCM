import logo from './logo.svg';
import React, {Component} from "react";
import './App.css';
import reactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExhibitAdd from './components/adminUpd'

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ExhibitAdd/>} />
      <Route path="/map" element={<ExhibitAdd/>} />
      <Route path="/playstyles" element={<ExhibitAdd/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
