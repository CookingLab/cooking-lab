import {
  STEP3_TITLE,
  STEP3_DESCRIPTION,
  STEP3_BREAKFAST,
  STEP3_BRUNCH,
  STEP3_LUNCH,
  STEP3_SNACK,
  STEP3_TEATIME
} from '../i18n/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setMealType, clearMealType } from '../redux/cookingLabSlice';
import breakfast from '../img/breakfast.png';
import brunch from '../img/brunch.png';
import dinner from '../img/dinner.png';
import snack from '../img/snack.png';
import kitchen from '../img/kitchen.png';
import teatime from '../img/teatime.png';

const Step3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedType = useSelector((state: RootState) => state.cookingLab.selectedMealType);

  const handleButtonClick = (mealType: string) => {
    if (selectedType === mealType) {
      dispatch(clearMealType());
    } else {
      dispatch(setMealType(mealType));
    }
  };

  const getImage = (): string => {
    switch (selectedType) {
    case 'breakfast':
      return breakfast;
    case 'brunch':
      return brunch;
    case 'lunch/dinner':
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
      <div className="card shadow">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col text-center">
              <h2 className="card-title">{STEP3_TITLE}</h2>
              <p>{STEP3_DESCRIPTION}</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <div className="btn-group-vertical meal-type-btn-group">
                <button
                  className={`btn btn-dark cooking-lab-btn meal-type-btn ${selectedType === 'breakfast' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('breakfast')}
                >
                  {STEP3_BREAKFAST}
                </button>
                <button
                  className={`btn btn-dark cooking-lab-btn meal-type-btn ${selectedType === 'brunch' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('brunch')}
                >
                  {STEP3_BRUNCH}
                </button>
                <button
                  className={`btn btn-dark cooking-lab-btn meal-type-btn ${selectedType === 'lunch/dinner' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('lunch/dinner')}
                >
                  {STEP3_LUNCH}
                </button>
                <button
                  className={`btn btn-dark cooking-lab-btn meal-type-btn ${selectedType === 'snack' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('snack')}
                >
                  {STEP3_SNACK}
                </button>
                <button
                  className={`btn btn-dark cooking-lab-btn meal-type-btn ${selectedType === 'teatime' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('teatime')}
                >
                  {STEP3_TEATIME}
                </button>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <img src={getImage()} alt={selectedType || 'kitchen'} className="mt-3 img-fluid shadow meal-type-img" />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <i
            className="bi bi-arrow-left-circle-fill me-3 ms-3"
            style={{ fontSize: '2rem', cursor: 'pointer' }}
            onClick={() => navigate('/step2')}
          />
          {selectedType &&
            <i
              className="bi bi-arrow-right-circle-fill me-3 ms-3"
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={() => navigate('/step4')}
            />}
        </div>
      </div>
    </div>
  );
};

export default Step3;
