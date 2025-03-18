import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CookingLabStates {
  isQuickRecipe: boolean;
  isEditing: boolean;
  selectedCuisine: string;
  selectedMealType: string;
  selectedMeat: string;
  selectedDiet: string[];
  selectedHealth: string[];
  backEndEndpoint: string;
  recipeGenerate: number;
  isTienRecipesExpanded: boolean;
  isTmRecipesExpanded: boolean;
}

const initialState: CookingLabStates = {
  isQuickRecipe: false,
  isEditing: false,
  selectedCuisine: '',
  selectedMealType: '',
  selectedMeat: '',
  selectedDiet: [],
  selectedHealth: [],
  backEndEndpoint: 'prod',
  recipeGenerate: 0,
  isTienRecipesExpanded: false,
  isTmRecipesExpanded: false,
};

const cookingLabSlice = createSlice({
  name: 'CookingLab',
  initialState,
  reducers: {
    setQuickRecipe: (state, action: PayloadAction<boolean>) => {
      state.isQuickRecipe = action.payload;
    },
    setRecipeGenerate: (state) => {
      state.recipeGenerate = state.recipeGenerate + 1;
    },
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
    setMeat: (state, action: PayloadAction<string>) => {
      state.selectedMeat = action.payload;
    },
    clearMeat: (state) => {
      state.selectedMeat = '';
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
    },
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.backEndEndpoint = action.payload;
    },
    setTienRecipesExtended: (state, action: PayloadAction<boolean>) => {
      state.isTienRecipesExpanded = action.payload;
    },
    setTmRecipesExtended: (state, action: PayloadAction<boolean>) => {
      state.isTmRecipesExpanded = action.payload;
    },
  },
});

export const {
  setQuickRecipe,
  setRecipeGenerate,
  setEditing,
  setCuisine, clearCuisine,
  setMealType, clearMealType,
  setMeat, clearMeat,
  setDiet, clearDiet, clearDiets,
  setHealth, clearHealth, clearHealths,
  setEndpoint,
  setTienRecipesExtended,
  setTmRecipesExtended
} = cookingLabSlice.actions;
export default cookingLabSlice.reducer;
