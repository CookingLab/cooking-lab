import {
  RECIPE_INGREDIENT,
  RECIPE_COOK_TIME,
  RECIPE_DIRECTION,
  RECIPE_RANDOM
} from '../i18n/constants';
import React from 'react';
import logo from '../img/cookingLabLogo2.png'; // This is a placeholder image
import { useNavigate } from 'react-router-dom';

const RecipePage = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-8">
              <h1 className="card-title">Place holder Title</h1>
              <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className="col-md-4 text-center">
              <img src={logo} alt="Cooking Lab Logo" className="img-fluid shadow" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h3>{RECIPE_INGREDIENT}</h3>
              <ul className="list-group">
                <li className="list-group-item">Ingredient 1</li>
                <li className="list-group-item">Ingredient 2</li>
                <li className="list-group-item">Ingredient 3</li>
              </ul>
              <h3 className="mt-4">{RECIPE_COOK_TIME}</h3>
              <p>45 minutes</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row mt-4">
            <div className="col-12">
              <h3>{RECIPE_DIRECTION}</h3>
              <ol className="list-group list-group-numbered">
                <li className="list-group-item">Step 1</li>
                <li className="list-group-item">Step 2</li>
                <li className="list-group-item">Step 3</li>
                <li className="list-group-item">Step 4</li>
                <li className="list-group-item">Step 5</li>
                <li className="list-group-item">Step 6</li>
                <li className="list-group-item">Step 7</li>
                <li className="list-group-item">Step 8</li>
                <li className="list-group-item">Step 9</li>
                <li className="list-group-item">Step 10</li>
              </ol>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <i
                className="bi bi-arrow-left-circle-fill me-3"
                style={{ fontSize: '2rem', cursor: 'pointer' }}
                onClick={() => navigate('/step4')}
              />
              <button className="btn btn-dark cooking-lab-btn">{RECIPE_RANDOM}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RecipePage;
