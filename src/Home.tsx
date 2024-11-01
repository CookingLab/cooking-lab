import {
  HOME_GET_STARTED_BTN
} from './i18n/constants';
import React from 'react';
import './css/App.css';
import { useNavigate } from 'react-router-dom';
import IntroductionMsg from './components/introductionMsg';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-4">
      <div className="d-flex flex-column align-items-center">
        <IntroductionMsg/>   
        <button
          data-testid="get-started-btn"
          className="btn btn-dark cooking-lab-btn cooking-lab-start-btn mb-3" 
          onClick={() => navigate('/step1')}
        >
          {HOME_GET_STARTED_BTN}
        </button>
      </div>
    </div>
  );
}

export default Home;
