import React from 'react';
import './css/App.css';
import IntroductionMsg from './components/introductionMsg';
import Step1 from 'components/step1';

const Home = () => {
  return (
    <div>
      <IntroductionMsg/>    
      <Step1/> 
    </div>
  );
}

export default Home;
