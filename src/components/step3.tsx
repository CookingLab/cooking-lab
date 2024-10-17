import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'redux/store';

const Step3 = () => {
  const navigate = useNavigate();
  const isEditingState = useSelector((state: RootState) => state.cookingLab.isEditing);

  function handleNextButton() {
    if(isEditingState){
      navigate('/summary');
    }else{
      navigate('/step4');
    }
  }

  return (
    <div>
      Step3
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
  )
}

export default Step3;
