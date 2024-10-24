import {
  COOKING_LAB_TITLE,
  COOKING_LAB_MOTTO,
  COOKING_LAB_WELCOME,
  COOKING_LAB_OBJECTIVE
} from '../i18n/constants';
import React from 'react';

const IntroductionMsg = () => {
  return (
    <div className="App">
      <div className="container my-5">
        <div className="card shadow p-5">
          <div className="card-body card-body-bg"></div>
          <h1>
            <strong>{COOKING_LAB_TITLE}</strong>
          </h1>
          <h2><i>{COOKING_LAB_MOTTO}</i></h2>
          <p>{COOKING_LAB_WELCOME}</p>
          <p>{COOKING_LAB_OBJECTIVE}</p>
        </div>
      </div>
    </div>
  )
}

export default IntroductionMsg;
