import {
  STEP1_TITLE,
  STEP1_QUESTION,
  STEP1_NO_INGREDIENT,
  STEP1_CLICK_HERE,
  STEP1_RANDOM_RECIPE,
  STEP1_CLEAR
} from '../i18n/constants';
import React, { useState } from 'react';
import { formatInputValue } from '../utils/index';
import { useNavigate } from 'react-router-dom';

const Step1 = () => {
  const navigate = useNavigate();
  
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  
  const handleAddIngredient = () => {
    const formattedValue = formatInputValue(inputValue.trim());
    if (formattedValue !== '' && !ingredients.includes(formattedValue)) {
      setIngredients([...ingredients, formattedValue]);
      setInputValue('');
    }
    setInputValue('');
  };
  
  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col text-center">
              <h1 className="card-title">{STEP1_TITLE}</h1>
            </div>
          </div>
          
          <div className="row align-items-center mx-5">
            <div className="col-12 col-md-4 mb-2 mb-md-0 text-md-end text-center">
              <h4>{STEP1_QUESTION}</h4>
            </div>
            <div className="col-12 col-md-8 mb-2 mb-md-0 d-flex align-items-center text-md-end">
              <input
                type="text"
                className="form-control me-2"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <i
                className="bi bi-plus-square-fill"
                style={{ fontSize: '2rem', cursor: 'pointer' }}
                onClick={handleAddIngredient}
              />
            </div>
          </div>
          
          <p className="text-center">
            {STEP1_NO_INGREDIENT}
            <span><a href="#" className="cooking-lab-link"> {STEP1_CLICK_HERE} </a></span>
            {STEP1_RANDOM_RECIPE}
          </p>

          <ul className="list-group mx-5 text-center">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <span className="me-2"><strong>{index + 1}.</strong></span>
                <li className="list-group-item flex-grow-1 d-flex justify-content-between align-items-center rounded">
                  <span>{ingredient}</span>
                </li>
                <i
                  className="bi bi-trash-fill"
                  style={{ fontSize: '2rem', cursor: 'pointer' }}
                  onClick={() => handleRemoveIngredient(index)}
                ></i>
              </div>
            ))}
          </ul>
          
          {ingredients.length > 0 && <div className="d-flex justify-content-center align-items-center w-100">       
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setIngredients([])}
            >
              {STEP1_CLEAR}
            </button>
            <i
              className="bi bi-arrow-right-circle-fill ms-3"
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={() => navigate('/step2')}
            />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Step1;
