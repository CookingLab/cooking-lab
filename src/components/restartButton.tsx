import {
  RESTART
} from '../i18n/constants';
import React from 'react';
import { setQuickRecipe, setEditing, clearCuisine, clearMealType, clearDiets, clearHealths } from '../redux/cookingLabSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RestartButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restartSteps = () => {
    dispatch(setQuickRecipe(false));
    dispatch(setEditing(false));
    dispatch(clearCuisine());
    dispatch(clearMealType());
    dispatch(clearDiets());
    dispatch(clearHealths());
    navigate('/');
  };

  return (
    <button data-testid="cypress-restart-btn" className="btn btn-danger mb-3" onClick={restartSteps}>
      {RESTART}
    </button>
  )
}

export default RestartButton;
