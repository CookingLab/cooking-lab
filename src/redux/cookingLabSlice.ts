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
    setDiet: (state, action: PayloadAction<string>) => {
      if(!state.selectedDiet.includes(action.payload)) {
        state.selectedDiet.push(action.payload);
      }
    },
    clearDiet: (state, action: PayloadAction<string>) => {
      state.selectedDiet = state.selectedDiet.filter(diet => diet !== action.payload);
    },
    clearDiets: (state) => {
      state.selectedDiet = [];
    },
    setHealth: (state, action: PayloadAction<string>) => {
      if(!state.selectedHealth.includes(action.payload)) {
        state.selectedHealth.push(action.payload);
      }
    },
    clearHealth: (state, action: PayloadAction<string>) => {
      state.selectedHealth = state.selectedHealth.filter(health => health !== action.payload);
    },
    clearHealths: (state) => {
      state.selectedHealth = [];
    }
  },
});

export const {
  setEditing,
  setCuisine, clearCuisine,
  setMealType, clearMealType,
  setDiet, clearDiet, clearDiets,
  setHealth, clearHealth, clearHealths,
} = cookingLabSlice.actions;
export default cookingLabSlice.reducer;
