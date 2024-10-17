import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CookingLabStates {
  isEditing: boolean;
  selectedCuisine: string;
  selectedMealType: string;
  selectedDiet: string[];
  selectedHealth: string[];
}

const initialState: CookingLabStates = {
  isEditing: false,
  selectedCuisine: '',
  selectedMealType: '',
  selectedDiet: [],
  selectedHealth: [],
};

const cookingLabSlice = createSlice({
  name: 'CookingLab',
  initialState,
  reducers: {
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
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

export const { setEditing, setCuisine, clearCuisine, setMealType, clearMealType } = cookingLabSlice.actions;
export default cookingLabSlice.reducer;
