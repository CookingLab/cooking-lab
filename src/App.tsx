import React from 'react';
import './css/App.css';
import NavBar from './components/navBar';
import Footer from './components/footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home'; // Correct import path

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
