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

const SummaryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCuisine = useSelector((state: RootState) => state.cookingLab.selectedCuisine);
  const selectedType = useSelector((state: RootState) => state.cookingLab.selectedMealType);
  const selectedDiets = useSelector((state: RootState) => state.cookingLab.selectedDiet);
  const selectedDietsString = selectedDiets.join(', ');

  function handleBackButton() {
    dispatch(setEditing(false));
    navigate('/step4');
  }

  return (
    <div className="container mt-5">
      <RestartButton />
      <div className="card shadow">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col text-center">
              <h2 className="card-title">{SUMMARY_TITLE}</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <p className="lead mb-4">
                {SUMMARY_DESCRIPTION}
              </p>
              <div className="card shadow">
                <div className="card-body">
                  <h3>{SUMMARY_STEP1}</h3>
                  <p><b>{SUMMARY_STEP1_LABEL}</b>{selectedCuisine}</p>
                  <button className="btn btn-dark cooking-lab-btn mb-3"  onClick={() => navigate('/step1')}>{SUMMARY_EDIT}</button>
                </div>
              </div>
              <div className="card shadow">
                <div className="card-body">
                  <h3>{SUMMARY_STEP2}</h3>
                  <p><b>{SUMMARY_STEP2_LABEL}</b>{selectedType}</p>
                  <button className="btn btn-dark cooking-lab-btn mb-3"  onClick={() => navigate('/step2')}>{SUMMARY_EDIT}</button>
                </div>
              </div>
              <div className="card shadow">
                <div className="card-body">
                  <h3>{SUMMARY_STEP3}</h3>
                  <p><b>{SUMMARY_STEP3_LABEL}</b>{selectedDietsString ? selectedDietsString : SUMMARY_NONE}</p>
                  <button className="btn btn-dark cooking-lab-btn mb-3"  onClick={() => navigate('/step3')}>{SUMMARY_EDIT}</button>
                </div>
              </div>
              <div className="card shadow">
                <div className="card-body">
                  <h3>{SUMMARY_STEP4}</h3>
                  <p><b>{SUMMARY_STEP4_LABEL}</b></p>
                  <button className="btn btn-dark cooking-lab-btn mb-3"  onClick={() => navigate('/step4')}>{SUMMARY_EDIT}</button>
                </div>
              </div>
              <button className="btn btn-dark cooking-lab-btn mb-2 mt-5"  onClick={() => navigate('/recipe')}>{SUMMARY_GET_RECIPE}</button>
            </div>
          </div>
        </div>
        <i
          className="bi bi-arrow-left-circle-fill me-3 ms-3"
          style={{ fontSize: '2rem', cursor: 'pointer' }}
          onClick={handleBackButton}
        />
      </div>
    </div>
  )
}

export default SummaryPage;
