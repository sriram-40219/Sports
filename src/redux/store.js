import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import { sportsApi } from './api/sportsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [sportsApi.reducerPath]: sportsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sportsApi.middleware)
});

export default store;
