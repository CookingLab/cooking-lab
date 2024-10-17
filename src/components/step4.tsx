import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setEditing } from '../redux/cookingLabSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const Step4 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditingState = useSelector((state: RootState) => state.cookingLab.isEditing);

  function handleNextButton(){
    dispatch(setEditing(true));
    navigate('/summary');
  }

  return (
    <div>
      Step4
      {!isEditingState && <i
        className="bi bi-arrow-left-circle-fill me-3 ms-3"
        style={{ fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => navigate('/step3')}
      />}
      <i
        className="bi bi-arrow-right-circle-fill me-3 ms-3"
        style={{ fontSize: '2rem', cursor: 'pointer' }}
        onClick={handleNextButton}
      />
    </div>
  )
}

export default Step4;
