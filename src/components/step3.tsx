import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearDiet, setDiet } from '../redux/cookingLabSlice';
import RestartButton from './restartButton';

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

  return (
    <div className="container mt-5">
      <RestartButton />
      <div className="card shadow">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col text-center">
              <h2 className="card-title">Step 3: Select Diet(s)</h2>
              <p>Do you have any diet?</p>
            </div>
          </div>
          
          <div className="row align-items-center mx-5">
            <div className="col-12 col-md-4 mb-2 mb-md-0 text-md-end text-center">
              <h4>Choose one or many diets</h4>
            </div>
            <div className="col-12 col-md-8 mb-2 mb-md-0 d-flex align-items-center text-md-end">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Diets
                </button>
                <ul className="dropdown-menu">
                  <li><p className="dropdown-item cooking-lab-dropdown-item" onClick={() => handleAddDiet('balanced')}>balanced</p></li>
                  <li><p className="dropdown-item cooking-lab-dropdown-item" onClick={() => handleAddDiet('high-fiber')}>high-fiber</p></li>
                  <li><p className="dropdown-item cooking-lab-dropdown-item" onClick={() => handleAddDiet('high-protein')}>high-protein</p></li>
                  <li><p className="dropdown-item cooking-lab-dropdown-item" onClick={() => handleAddDiet('low-carb')}>low-carb</p></li>
                  <li><p className="dropdown-item cooking-lab-dropdown-item" onClick={() => handleAddDiet('low-fat')}>low-fat</p></li>
                  <li><p className="dropdown-item cooking-lab-dropdown-item" onClick={() => handleAddDiet('low-sodium')}>low-sodium</p></li>
                </ul>
              </div>
            </div>
          </div>

          <ul className="list-group mx-5 text-center">
            {selectedDiets.map((diet, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <span className="me-2"><strong>{index + 1}.</strong></span>
                <li className="list-group-item flex-grow-1 d-flex justify-content-between align-items-center rounded">
                  <span>{diet}</span>
                </li>
                <i
                  className="bi bi-trash-fill"
                  style={{ fontSize: '2rem', cursor: 'pointer' }}
                  onClick={() => handleRemoveDiet(index)}
                ></i>
              </div>
            ))}
          </ul>
          
          <div>
            {!isEditingState && <i
              className="bi bi-arrow-left-circle-fill me-3 ms-3"
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={() => navigate('/step2')}
            />}
            <i
              className="bi bi-arrow-right-circle-fill me-3 ms-3"
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

