import React from 'react';
import { useNavigate } from 'react-router-dom';

const Step3 = () => {
  const navigate = useNavigate();
  return (
    <div>
      Step3
      <i
        className="bi bi-arrow-left-circle-fill me-3 ms-3"
        style={{ fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => navigate('/step2')}
      />
      <i
        className="bi bi-arrow-right-circle-fill me-3 ms-3"
        style={{ fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => navigate('/step4')}
      />
    </div>
  )
}

export default Step3;
