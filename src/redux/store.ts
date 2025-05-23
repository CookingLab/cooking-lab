import { configureStore } from '@reduxjs/toolkit';
import cookingLabSlice from './cookingLabSlice';

const store = configureStore({
  reducer: {
    cookingLab: cookingLabSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
