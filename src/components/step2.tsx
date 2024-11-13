import {
  STEP2_TITLE,
  STEP2_DESCRIPTION,
  MEAL_TYPES,
} from '../i18n/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setMealType, clearMealType } from '../redux/cookingLabSlice';
import RestartButton from './restartButton';
import breakfast from '../img/breakfast.png';
import brunch from '../img/brunch.png';
import lunch from '../img/lunch.png';
import dinner from '../img/dinner.png';
import snack from '../img/snack.png';
import kitchen from '../img/kitchen.png';
import teatime from '../img/teatime.png';

const Step2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedType = useSelector((state: RootState) => state.cookingLab.selectedMealType);
  const isEditingState = useSelector((state: RootState) => state.cookingLab.isEditing);

  const handleButtonClick = (mealType: string) => {
    if (selectedType === mealType) {
      dispatch(clearMealType());
    } else {
      dispatch(setMealType(mealType));
    }
  };

  function handleNextButton() {
    if(isEditingState){
      navigate('/summary');
    }
    else{
      navigate('/step3');
    }
  }

  const getImage = (): string => {
    switch (selectedType) {
    case 'breakfast':
      return breakfast;
    case 'brunch':
      return brunch;
    case 'lunch':
      return lunch;
    case 'dinner':
      return dinner;
    case 'snack':
      return snack;
    case 'teatime':
      return teatime;
    default:
      return kitchen;
    }
  };

  return (
    <div className="container mt-5">
      <RestartButton />
      <div className="card shadow mb-5">
        <div className="card-body card-body-bg">
          <div className="row mb-4">
            <div className="col text-center">
              <h2 className="card-title" data-testid="step2-title">{STEP2_TITLE}</h2>
              <p data-testid="step2-description">{STEP2_DESCRIPTION}</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <div className="btn-group-vertical meal-type-btn-group">
                {MEAL_TYPES.map(({ type, label }) => (
                  <button
                    key={type}
                    className={`btn btn-dark cooking-lab-btn meal-type-btn ${selectedType === type ? 'active' : ''}`}
                    onClick={() => handleButtonClick(type)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-4 text-center">
              <img src={getImage()} alt={selectedType || 'kitchen'} className="mt-3 img-fluid shadow meal-type-img" />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between card-body-bg">
          {!isEditingState && <i
            data-testid="prev-icon"
            className="bi bi-arrow-left-circle-fill me-3 ms-3"
            style={{ fontSize: '2rem', cursor: 'pointer' }}
            onClick={() => navigate('/step1')}
          />}
          {selectedType &&
            <i
              data-testid="next-icon"
              className={`bi bi-arrow-right-circle-fill me-3 ${!isEditingState ? 'ms-3' : 'ms-auto'}`}
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={handleNextButton}
            />}
        </div>
      </div>
    </div>
  );
};

export default Step2;
