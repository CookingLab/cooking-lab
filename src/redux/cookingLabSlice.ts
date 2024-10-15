import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CookingLabStates {
  selectedCuisine: string;
  selectedMealType: string;
}

const initialState: CookingLabStates = {
  selectedCuisine: '',
  selectedMealType: '',
};

// Create the combined slice
const combinedSlice = createSlice({
  name: 'combined',
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

// Export the action creators and the reducer
export const { setCuisine, clearCuisine, setMealType, clearMealType } = combinedSlice.actions;
export default combinedSlice.reducer;
