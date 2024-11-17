import React from 'react';
import {
  PERSONAL_RECIPES_TITLE,
  TC_RECIPE,
  TM_RECIPE,
} from '../i18n/constants';

const PersonalRecipes = () => {
  return (
    <div className="App">
      <div className="container mt-5">
        <h1>{PERSONAL_RECIPES_TITLE}</h1>
        <div className="row">
          <div className="col-md-6">
            <h2>{TC_RECIPE}</h2>
          </div>
          <div className="col-md-1 text-center">
            <div className="vertical-line"></div>
          </div>
          <div className="col-md-5">
            <h2>{TM_RECIPE}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalRecipes;
