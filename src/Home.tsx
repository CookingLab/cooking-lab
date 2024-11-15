import {
  HOME_GET_STARTED_BTN,
  STEP1_CUISINES,
  MEAL_TYPES
} from './i18n/constants';
import React from 'react';
import './css/App.css';
import { useNavigate } from 'react-router-dom';
import IntroductionMsg from './components/introductionMsg';
import * as CookingLabSlice from './redux/cookingLabSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function generateQuickRecipe(){
    const randomCuisine = STEP1_CUISINES[Math.floor(Math.random() * STEP1_CUISINES.length)];
    const randomMealType = MEAL_TYPES[Math.floor(Math.random() * MEAL_TYPES.length)];
    dispatch(CookingLabSlice.setCuisine(randomCuisine));
    dispatch(CookingLabSlice.setMealType(randomMealType.type));
    dispatch(CookingLabSlice.setEditing(true));
    dispatch(CookingLabSlice.setQuickRecipe(true));
    navigate('/recipe');
  }
  return (
    <div className="container mt-4">
      <div className="d-flex flex-column align-items-center">
        <IntroductionMsg/>
        <button className="btn btn-dark cooking-lab-btn mb-3" onClick={generateQuickRecipe}>Quick Recipe</button>
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
