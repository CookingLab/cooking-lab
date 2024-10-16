import React from 'react';
import { useNavigate } from 'react-router-dom';

const Step4 = () => {
  const navigate = useNavigate();
  return (
    <div>
      Step4
      <i
        className="bi bi-arrow-left-circle-fill me-3 ms-3"
        style={{ fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => navigate('/step3')}
      />
      <i
        className="bi bi-arrow-right-circle-fill me-3 ms-3"
        style={{ fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => navigate('/summary')}
      />
    </div>
  )
}

export default Step4;
