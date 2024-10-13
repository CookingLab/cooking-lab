import { COOKING_LAB_TITLE, COOKING_LAB_MOTTO, COOKING_LAB_WELCOME } from '../i18n/constants';
import React from 'react';

const IntroductionMsg = () => {
  return (
    <div className="App">
      <h1>
        <strong>{COOKING_LAB_TITLE}</strong>
      </h1>
      <h2><i>{COOKING_LAB_MOTTO}</i></h2>
      <p>{COOKING_LAB_WELCOME}</p>
    </div>
  )
}

export default IntroductionMsg;
