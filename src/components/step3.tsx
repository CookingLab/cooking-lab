import {
  STEP3_TITLE,
  STEP_OPTIONAL,
  STEP3_SELECT_LABEL,
  STEP3_DROPDOWN,
  STEP3_DIETS,
  CLEAR
} from '../i18n/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearDiet, setDiet, clearDiets } from '../redux/cookingLabSlice';
import RestartButton from './restartButton';
import { formatInputValue } from '../utils/index';

const Step3 = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const selectedDiets = useSelector((state: RootState) => state.cookingLab.selectedDiet);
  const isEditingState = useSelector((state: RootState) => state.cookingLab.isEditing);

  function handleNextButton() {
    if(isEditingState){
      navigate('/summary');
    } else{
      navigate('/step4');
    }
  }
    
  const handleAddDiet = (diet: string) => {
    if (diet !== '' && !selectedDiets.includes(diet)) {
      dispatch(setDiet(diet));
    }
  };
  
  const handleRemoveDiet = (index: number) => {
    dispatch(clearDiet(selectedDiets[index]));
  };

  function handleClearBtn(){
    dispatch(clearDiets());
  }

  return (
    <div className="container mt-5">
      <RestartButton />
      <div className="card shadow mb-5">
        <div className="card-body card-body-bg">
          <div className="row mb-4">
            <div className="col text-center">
              <h2 className="card-title" data-testid="step3-title">{STEP3_TITLE}</h2>
              <p data-testid="step3-optional">{STEP_OPTIONAL}</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="row mb-4">
              <div className="text-center">
                <h4 data-testid="step3-description">{STEP3_SELECT_LABEL}</h4>
              </div>
              <div className="text-center">
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle cooking-lab-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {STEP3_DROPDOWN}
                  </button>
                  <ul className="dropdown-menu">
                    {STEP3_DIETS.map((diet, index) => (
                      <li key={index}><p className="dropdown-item cooking-lab-dropdown-item" onClick={() => handleAddDiet(diet)}>{formatInputValue(diet)}</p></li>))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ul className="list-group mx-5 text-center">
            {selectedDiets.map((diet, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <span className="me-2"><strong>{index + 1}.</strong></span>
                <li className="list-group-item flex-grow-1 d-flex justify-content-between align-items-center rounded">
                  <span>{formatInputValue(diet)}</span>
                </li>
                <i
                  className="bi bi-trash-fill"
                  style={{ fontSize: '2rem', cursor: 'pointer' }}
                  onClick={() => handleRemoveDiet(index)}
                ></i>
              </div>
            ))}
            {selectedDiets.length > 0 && <div className="d-flex justify-content-center align-items-center w-100">       
              <button
                data-testid="cypress-clear-btn"
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
              data-testid="prev-icon"
              className="bi bi-arrow-left-circle-fill me-3 ms-3"
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={() => navigate('/step2')}
            />}
            <i
              data-testid="next-icon"
              className={`bi bi-arrow-right-circle-fill me-3 ${!isEditingState ? 'ms-3' : 'ms-auto'}`}
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={handleNextButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;

