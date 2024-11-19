import {
  setQuickRecipe,
  setEditing,
  clearCuisine,
  clearMealType,
  clearMeat,
  clearDiets,
  clearHealths,
} from '../redux/cookingLabSlice';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router-dom';

export const formatInputValue = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const restartSteps = (dispatch: Dispatch, navigate: ReturnType<typeof useNavigate>) => {
  dispatch(setQuickRecipe(false));
  dispatch(setEditing(false));
  dispatch(clearCuisine());
  dispatch(clearMealType());
  dispatch(clearMeat());
  dispatch(clearDiets());
  dispatch(clearHealths());
  navigate('/');
};
