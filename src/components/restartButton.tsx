import {
  RESTART
} from '../i18n/constants';
import React from 'react';
import { setEditing, clearCuisine, clearMealType, clearDiets, clearHealths } from '../redux/cookingLabSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RestartButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restartSteps = () => {
    dispatch(setEditing(false));
    dispatch(clearCuisine());
    dispatch(clearMealType());
    dispatch(clearDiets());
    dispatch(clearHealths());
    navigate('/');
  };

  return (
    <button className="btn btn-danger mb-3" onClick={restartSteps}>
      {RESTART}
    </button>
  )
}

export default RestartButton;
