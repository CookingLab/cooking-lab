import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CuisineState {
  selectedCuisine: string;
}

const initialState: CuisineState = {
  selectedCuisine: '',
};

const cuisineSlice = createSlice({
  name: 'cuisine',
  initialState,
  reducers: {
    setCuisine: (state, action: PayloadAction<string>) => {
      state.selectedCuisine = action.payload;
    },
    clearCuisine: (state) => {
      state.selectedCuisine = '';
    },
  },
});

export const { setCuisine, clearCuisine } = cuisineSlice.actions;
export default cuisineSlice.reducer;
