import {
  STEP2_TITLE,
  STEP2_DESCRIPTION,
  STEP2_ERROR,
  STEP2_RANDOM,
  STEP2_CUISINES,
} from '../i18n/constants';
import React, { useState } from 'react';

const Step2 = () => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');


  const addCuisine = (cuisine: string) => {
    setSelectedCuisines([...selectedCuisines, cuisine]);
    setErrorMessage('');
  };
  
  const removeCuisine = (cuisine: string) => {
    setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    setErrorMessage('');
  };

  const handleCuisineClick = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      removeCuisine(cuisine);
    } else if (selectedCuisines.length < 2) {
      addCuisine(cuisine);
    } else {
      setErrorMessage(STEP2_ERROR);
    }
  };

  const chooseRandomCuisines = () => {
    const shuffled = [...STEP2_CUISINES].sort(() => 0.5 - Math.random());
    setSelectedCuisines(shuffled.slice(0, 2));
    setErrorMessage('');
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
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <div className="mb-4">
                {STEP2_CUISINES.map(cuisine => (
                  <button
                    key={cuisine}
                    className={`btn btn-dark cooking-lab-btn-option m-2 ${selectedCuisines.includes(cuisine) ? 'active' : ''}`}
                    onClick={() => handleCuisineClick(cuisine)}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
              <button className="btn btn-dark cooking-lab-btn mb-3" onClick={chooseRandomCuisines}>{STEP2_RANDOM}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2;
