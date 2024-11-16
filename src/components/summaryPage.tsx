import {
  SUMMARY_TITLE,
  SUMMARY_DESCRIPTION,
  SUMMARY_STEP1,
  SUMMARY_STEP2,
  SUMMARY_STEP3,
  SUMMARY_STEP4,
  SUMMARY_GET_RECIPE,
  SUMMARY_STEP1_LABEL,
  SUMMARY_STEP2_LABEL,
  SUMMARY_STEP2_LABEL_MEAT,
  SUMMARY_STEP3_LABEL,
  SUMMARY_STEP4_LABEL,
  SUMMARY_EDIT,
  SUMMARY_NONE
} from '../i18n/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RestartButton from './restartButton';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { setEditing } from '../redux/cookingLabSlice';
import { useDispatch } from 'react-redux';
import { formatInputValue } from '../utils/index';

const SummaryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCuisine = useSelector((state: RootState) => formatInputValue(state.cookingLab.selectedCuisine));
  const selectedType = useSelector((state: RootState) => formatInputValue(state.cookingLab.selectedMealType));
  const selectedMeatValue = useSelector((state: RootState) => state.cookingLab.selectedMeat);
  const selectedDiets = useSelector((state: RootState) => state.cookingLab.selectedDiet);
  const selectedDietsString = formatInputValue(selectedDiets.join(', '));
  const selectedHealth = useSelector((state: RootState) => state.cookingLab.selectedHealth);
  const selectedHealthString = formatInputValue(selectedHealth.join(', '));

  function handleBackButton() {
    dispatch(setEditing(false));
    navigate('/step4');
  }

  return (
    <div className="container mt-5">
      <RestartButton />
      <div className="card shadow mb-5">
        <div className="card-body card-body-bg">
          <div className="row mb-4">
            <div className="col text-center">
              <h2 className="card-title" data-testid="smr-title">{SUMMARY_TITLE}</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <p className="lead mb-4" data-testid="smr-description">
                {SUMMARY_DESCRIPTION}
              </p>
              <div className="card shadow mb-3">
                <div className="card-body">
                  <h3 data-testid="smr-step1">{SUMMARY_STEP1}</h3>
                  <p data-testid="smr-step1-label"><b>{SUMMARY_STEP1_LABEL}</b>{selectedCuisine}</p>
                  <button data-testid="cypress-editStep1" className="btn btn-dark cooking-lab-btn mb-3"  onClick={() => navigate('/step1')}>{SUMMARY_EDIT}</button>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card-body">
                  <h3 data-testid="smr-step2">{SUMMARY_STEP2}</h3>
                  <p data-testid="smr-step2-label"><b>{SUMMARY_STEP2_LABEL}</b>{selectedType}</p>
                  {selectedMeatValue && <p data-testid="smr-step2-label-meat"><b>{SUMMARY_STEP2_LABEL_MEAT}</b>{selectedMeatValue}</p>}
                  <button data-testid="cypress-editStep2" className="btn btn-dark cooking-lab-btn mb-3"  onClick={() => navigate('/step2')}>{SUMMARY_EDIT}</button>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card-body">
                  <h3 data-testid="smr-step3">{SUMMARY_STEP3}</h3>
                  <p data-testid="smr-step3-label"><b>{SUMMARY_STEP3_LABEL}</b>{selectedDietsString ? selectedDietsString : SUMMARY_NONE}</p>
                  <button data-testid="cypress-editStep3" className="btn btn-dark cooking-lab-btn mb-3"  onClick={() => navigate('/step3')}>{SUMMARY_EDIT}</button>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card-body">
                  <h3 data-testid="smr-step4">{SUMMARY_STEP4}</h3>
                  <p data-testid="smr-step4-label"><b>{SUMMARY_STEP4_LABEL}</b>{selectedHealthString ? selectedHealthString : SUMMARY_NONE}</p>
                  <button data-testid="cypress-editStep4" className="btn btn-dark cooking-lab-btn mb-3"  onClick={() => navigate('/step4')}>{SUMMARY_EDIT}</button>
                </div>
              </div>
              <button data-testid="cypress-getRecipe" className="btn btn-dark cooking-lab-btn mb-2 mt-5"  onClick={() => navigate('/recipe')}>{SUMMARY_GET_RECIPE}</button>
            </div>
          </div>
        </div>
        <div className="card-body-bg">
          <i
            data-testid="prev-icon"
            className="bi bi-arrow-left-circle-fill me-3 ms-3"
            style={{ fontSize: '2rem', cursor: 'pointer' }}
            onClick={handleBackButton}
          />
        </div>
      </div>
    </div>
  )
}

export default SummaryPage;
