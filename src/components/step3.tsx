import {
  STEP3_TITLE,
  STEP3_DESCRIPTION,
  STEP3_BREAKFAST,
  STEP3_LUNCH,
  STEP3_DINNER,
  STEP3_DESSERT,
  STEP3_SNACK
} from '../i18n/constants';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import breakfast from '../img/breakfast.png';
import lunch from '../img/lunch.png';
import dinner from '../img/dinner.png';
import dessert from '../img/dessert.png';
import snack from '../img/snack.png';
import kitchen from '../img/kitchen.png';

const Step3 = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (mealType: string) => {
    setActiveButton(mealType);
  };

  const getImage = (): string => {
    switch (activeButton) {
    case 'breakfast':
      return breakfast;
    case 'lunch':
      return lunch;
    case 'dinner':
      return dinner;
    case 'dessert':
      return dessert;
    case 'snack':
      return snack;
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
                  className={`btn btn-dark cooking-lab-btn meal-type-btn ${activeButton === 'breakfast' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('breakfast')}
                >
                  {STEP3_BREAKFAST}
                </button>
                <button
                  className={`btn btn-dark cooking-lab-btn meal-type-btn ${activeButton === 'lunch' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('lunch')}
                >
                  {STEP3_LUNCH}
                </button>
                <button
                  className={`btn btn-dark cooking-lab-btn meal-type-btn ${activeButton === 'dinner' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('dinner')}
                >
                  {STEP3_DINNER}
                </button>
                <button
                  className={`btn btn-dark cooking-lab-btn meal-type-btn ${activeButton === 'dessert' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('dessert')}
                >
                  {STEP3_DESSERT}
                </button>
                <button
                  className={`btn btn-dark cooking-lab-btn meal-type-btn ${activeButton === 'snack' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('snack')}
                >
                  {STEP3_SNACK}
                </button>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <img src={getImage()} alt={activeButton || 'kitchen'} className="mt-3 img-fluid shadow meal-type-img" />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <i
            className="bi bi-arrow-left-circle-fill me-3 ms-3"
            style={{ fontSize: '2rem', cursor: 'pointer' }}
            onClick={() => navigate('/step2')}
          />
          {activeButton &&
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
