import { configureStore } from '@reduxjs/toolkit';
import cuisineReducer from './cuisineSlice';
import mealTypeReducer from './mealTypeSlice';

const store = configureStore({
  reducer: {
    cuisine: cuisineReducer,
    mealType: mealTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
