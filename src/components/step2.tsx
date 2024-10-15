import {
  STEP2_TITLE,
  STEP2_DESCRIPTION,
  STEP2_RANDOM,
  STEP2_CUISINES,
} from '../i18n/constants';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { setCuisine, clearCuisine } from '../redux/cuisineSlice';

const Step2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCuisine = useSelector((state: RootState) => state.cuisine.selectedCuisine);
    
  const addCuisine = (cuisine: string) => {
    dispatch(setCuisine(cuisine));
  };
    
  const removeCuisine = () => {
    dispatch(clearCuisine());
  };
    
  const handleCuisineClick = (cuisine: string) => {
    if (selectedCuisine === cuisine) {
      removeCuisine();
    } else {
      addCuisine(cuisine);
    }
  };
    
  const chooseRandomCuisine = () => {
    const shuffled = [...STEP2_CUISINES].sort(() => 0.5 - Math.random());
    dispatch(setCuisine(shuffled[0]));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col text-center">
              <h2 className="card-title">{STEP2_TITLE}</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <p className="lead mb-4">
                {STEP2_DESCRIPTION}
              </p>
              <div className="mb-4">
                {STEP2_CUISINES.map(cuisine => (
                  <button
                    key={cuisine}
                    className={`btn btn-dark cooking-lab-btn-option m-2 ${selectedCuisine === cuisine ? 'active' : ''}`}
                    onClick={() => handleCuisineClick(cuisine)}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
              <i
                className="bi bi-arrow-left-circle-fill me-3"
                style={{ fontSize: '2rem', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              />
              <button className="btn btn-dark cooking-lab-btn mb-3" onClick={chooseRandomCuisine}>{STEP2_RANDOM}</button>
              {selectedCuisine && <i
                className="bi bi-arrow-right-circle-fill ms-3"
                style={{ fontSize: '2rem', cursor: 'pointer' }}
                onClick={() => navigate('/step3')}
              />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2;
