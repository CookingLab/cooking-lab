import { EXPERIEMENT, WELCOME_COOKING_LAB } from '../i18n/constants';
import React from 'react';

const IntroductionMsg = () => {
  return (
    <div className="App">
      <h1>
        <strong>{WELCOME_COOKING_LAB}</strong>
      </h1>
      <h2>{EXPERIEMENT}</h2>
    </div>
  )
}

export default IntroductionMsg;