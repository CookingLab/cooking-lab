import React from 'react';
import './css/App.css';
import NavBar from './components/navBar';
import Footer from './components/footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import GetRecipe from 'components/getRecipe';
import SummaryPage from 'components/summaryPage';
import Step1 from 'components/step1';
import Step2 from 'components/step2';
import Step3 from 'components/step3';
import Step4 from 'components/step4';
import ApiApp from '../learning/ApiApp';

function App() {
  return (
    <div>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe" element={<GetRecipe />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/step4" element={<Step4 />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/testing" element={<ApiApp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
