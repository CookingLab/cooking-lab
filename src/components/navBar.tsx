import React from 'react';
import logo from '../img/cookingLabLogo2.png';

const NavBar = () => {

  // Reference: https://www.npmjs.com/package/@google/generative-ai
  async function testGoogleGemini(){
    console.log('Test Google Gemini');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { GoogleGenerativeAI } = require('@google/generative-ai');

    const genAI = new GoogleGenerativeAI(process.env.API_KEY); // API KEY HERE

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


    const prompt = 'Give me one randon dish name.';

    const result = await model.generateContent([prompt]);
    console.log(result.response.text());

  }

  return (
    <nav className="navbar navbar-light">
      <a className="navbar-brand" href="#">
        <img className="mx-3 logo" src={logo} alt="Cooking Lab Logo" onClick={testGoogleGemini}/>
      </a>
    </nav>
  )
}

export default NavBar;
