import React, { useState } from 'react';

const cuisines = [
    'Japanese', 'American', 'Canadian', 'Italian', 
    'Chinese', 'Korean', 'Mexican', 'Indian', 
    'French', 'Vietnamese', 'Greek', 'Thai'
];

const Step2 = () => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');


  const addCuisine = (cuisine: string) => {
    setSelectedCuisines([...selectedCuisines, cuisine]);
    setErrorMessage('');
  };
  
  const removeCuisine = (cuisine: string) => {
    setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    setErrorMessage('');
  };

  const handleCuisineClick = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      removeCuisine(cuisine);
    } else if (selectedCuisines.length < 2) {
      addCuisine(cuisine);
    } else {
      setErrorMessage('You can only select up to 2 cuisines.');
    }
  };

  const chooseRandomCuisines = () => {
    const shuffled = [...cuisines].sort(() => 0.5 - Math.random());
    setSelectedCuisines(shuffled.slice(0, 2));
    setErrorMessage('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="mb-4">Step 2: Choose the Cooking Cuisine</h2>
          <p className="lead mb-4">
            Select up to 2 cuisines you would like to cook.
          </p>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="mb-4">
            {cuisines.map(cuisine => (
              <button
                key={cuisine}
                className={`btn btn-primary cooking-lab-btn-option m-2 ${selectedCuisines.includes(cuisine) ? 'active' : ''}`}
                onClick={() => handleCuisineClick(cuisine)}
              >
                {cuisine}
              </button>
            ))}
          </div>
          <button className="btn btn-primary cooking-lab-btn mb-3" onClick={chooseRandomCuisines}>Choose for me!</button>
        </div>
      </div>
    </div>
  );
}

export default Step2;