import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CookingLabStates {
  selectedCuisine: string;
  selectedMealType: string;
}

const initialState: CookingLabStates = {
  selectedCuisine: '',
  selectedMealType: '',
};

const cookingLabStates = createSlice({
  name: 'CookingLab',
  initialState,
  reducers: {
    setCuisine: (state, action: PayloadAction<string>) => {
      state.selectedCuisine = action.payload;
    },
    clearCuisine: (state) => {
      state.selectedCuisine = '';
    },
    setMealType: (state, action: PayloadAction<string>) => {
      state.selectedMealType = action.payload;
    },
    clearMealType: (state) => {
      state.selectedMealType = '';
    },
  },
});

export const { setCuisine, clearCuisine, setMealType, clearMealType } = cookingLabStates.actions;
export default cookingLabStates.reducer;
