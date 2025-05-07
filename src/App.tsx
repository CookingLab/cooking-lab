import React from 'react';
import './css/App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavBar from './components/navBar';
import Footer from './components/footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import GetRecipe from './components/getRecipe';
import SummaryPage from './components/summaryPage';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';
import Step4 from './components/step4';
import PersonalRecipes from './components/personalRecipes';
import GetPersonalRecipe from './components/getPersonalRecipe';
import { useEffect } from 'react';
import SavedRecipes from 'components/savedRecipesPage';

const App = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,  // Animation duration in ms
      once: true,      // Ensures the animation runs only once
    });
  }, []);

  return (
    <div className="app-container">
      <NavBar />
      <div className="content main-container">
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
          <Route path="/personalRecipe" element={<PersonalRecipes />} />
          <Route path="/personalRecipe/recipe/:id" element={<GetPersonalRecipe />} />
          <Route path="/savedRecipes" element={<SavedRecipes/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
