import React from 'react';
import './css/App.css';
import IntroductionMsg from './components/introductionMsg';
import NavBar from 'components/navBar';

function App() {
  return (
    <div>
      <NavBar/>
      <IntroductionMsg/>      
    </div>
  );
}

export default App;
