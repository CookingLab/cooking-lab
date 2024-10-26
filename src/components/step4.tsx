import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import RestartButton from './restartButton';
import { clearHealth, clearHealths, setEditing, setHealth } from '../redux/cookingLabSlice';
import {
  CLEAR,
  STEP4_ALLERGIES,
  STEP4_DROPDOWN,
  STEP4_DROPDOWN_ALLERGIES,
  STEP4_DROPDOWN_RESTRICTIONS,
  STEP4_RESTRICTIONS,
  STEP4_TITLE,
  STEP_OPTIONAL
} from '../i18n/constants';

const Step4 = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const selectedHealth = useSelector((state: RootState) => state.cookingLab.selectedHealth);
  const isEditingState = useSelector((state: RootState) => state.cookingLab.isEditing);

  function handleNextButton() {
    dispatch(setEditing(true));
    navigate('/summary');
  }
    
  const handleAddHealth = (health: string) => {
    if (health !== '' && !selectedHealth.includes(health)) {
      dispatch(setHealth(health));
    }
  };
  
  const handleRemoveHealth = (index: number) => {
    dispatch(clearHealth(selectedHealth[index]));
  };

  const handleClearBtn = () => dispatch(clearHealths());

  return (
    <div className="container mt-5">
      <RestartButton />
      <div className="card shadow mb-5">
        <div className="card-body card-body-bg">
          <div className="row mb-4">
            <div className="col text-center">
              <h2 className="card-title">{STEP4_TITLE}</h2>
              <p>{STEP_OPTIONAL}</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="row mb-4">
              <div className="text-center">
                <h4>{STEP4_DROPDOWN}</h4>
              </div>
              <div className="d-flex justify-content-center">
                <div className="dropdown me-2">
                  <button className="btn btn-secondary dropdown-toggle cooking-lab-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {STEP4_DROPDOWN_ALLERGIES}
                  </button>
                  <ul className="dropdown-menu">
                    {STEP4_ALLERGIES.map((allergy, index) => (
                      <li key={index}><p className="dropdown-item cooking-lab-dropdown-item" onClick={() => handleAddHealth(allergy)}>{allergy}</p></li>))}
                  </ul>
                </div>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle cooking-lab-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {STEP4_DROPDOWN_RESTRICTIONS}
                  </button>
                  <ul className="dropdown-menu">
                    {STEP4_RESTRICTIONS.map((restriction, index) => (
                      <li key={index}><p className="dropdown-item cooking-lab-dropdown-item" onClick={() => handleAddHealth(restriction)}>{restriction}</p></li>))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ul className="list-group mx-5 text-center">
            {selectedHealth.map((health, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <span className="me-2"><strong>{index + 1}.</strong></span>
                <li className="list-group-item flex-grow-1 d-flex justify-content-between align-items-center rounded">
                  <span>{health}</span>
                </li>
                <i
                  className="bi bi-trash-fill"
                  style={{ fontSize: '2rem', cursor: 'pointer' }}
                  onClick={() => handleRemoveHealth(index)}
                ></i>
              </div>
            ))}
            {selectedHealth.length > 0 && <div className="d-flex justify-content-center align-items-center w-100">       
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClearBtn}
              >
                {CLEAR}
              </button>
            </div>}
          </ul>
          <div className="d-flex justify-content-between card-body-bg">
            {!isEditingState && <i
              className="bi bi-arrow-left-circle-fill me-3 ms-3"
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={() => navigate('/step3')}
            />}
            <i
              className={`bi bi-arrow-right-circle-fill me-3 ${!isEditingState ? 'ms-3' : 'ms-auto'}`}
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={handleNextButton}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step4;
