import React from 'react';
import './css/App.css';
import NavBar from './components/navBar';
import Footer from './components/footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home'; // Correct import path
import RecipePage from './components/recipePage';
import Step1 from 'components/step1';
import Step2 from 'components/step2';
import Step3 from 'components/step3';
import IntroductionMsg from 'components/introductionMsg';

function App() {
  return (
    <div>
      <NavBar />
      <IntroductionMsg/>    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
