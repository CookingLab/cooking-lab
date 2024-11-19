import {
  RESTART
} from '../i18n/constants';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restartSteps } from '../utils/index';

const RestartButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleRestart = () => {
    restartSteps(dispatch, navigate);
  }

  return (
    <button data-testid="cypress-restart-btn" className="btn btn-danger mb-3" onClick={handleRestart}>
      {RESTART}
    </button>
  )
}

export default RestartButton;
