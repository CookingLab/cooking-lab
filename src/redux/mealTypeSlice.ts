import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MealTypeState {
  selectedType: string;
}

const initialState: MealTypeState = {
  selectedType: '',
};

const mealTypeSlice = createSlice({
  name: 'mealType',
  initialState,
  reducers: {
    setMealType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
    },
    clearMealType: (state) => {
      state.selectedType = '';
    },
  },
});

export const { setMealType, clearMealType } = mealTypeSlice.actions;
export default mealTypeSlice.reducer;
