import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SAVED_RECIPES_TITLE, SAVED_RECIPES_MSG, NO_SAVED_RECIPES } from '../i18n/constants';
import { removeSavedRecipe } from '../redux/cookingLabSlice';

const SavedRecipes = () => {
  const savedRecipes = useSelector((state: RootState) => state.cookingLab.savedRecipes || {});
  const isSavedRecipesEmpty = Object.entries(savedRecipes).length === 0;
  const dispatch = useDispatch();

  const handleRemoveSavedRecipe = (name: string) => {
    dispatch(removeSavedRecipe(name));
  };

  return (
    <div className="App">
      <div className="container mt-5" data-aos="fade-right">
        <div className="card shadow mb-5">
          <div className="card-body card-body-bg">
            <h1 className="text-center">
              <strong>{SAVED_RECIPES_TITLE}</strong>
            </h1>
            {!isSavedRecipesEmpty && (
              <p className="text-center">{SAVED_RECIPES_MSG}</p>
            )}
            <div className="container">
              {isSavedRecipesEmpty ? (
                <p className="text-center">{NO_SAVED_RECIPES}</p>
              ) : (
                <ul className="list-group">
                  {Object.entries(savedRecipes).map(([name, url]) => (
                    <li key={name} className="list-group-item">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {name}
                      </a>
                      <i
                        className="bi bi-trash-fill float-end"
                        style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                        onClick={() => handleRemoveSavedRecipe(name)}
                      ></i>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
