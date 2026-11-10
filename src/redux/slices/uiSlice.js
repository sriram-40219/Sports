import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentModule: 'user', // 'user' | 'admin'
  currentView: 'dashboard',
  selectedLeagueId: '',
  authModalOpen: false,
  authMode: 'login', // 'login' | 'signup'
  toast: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentModule: (state, action) => {
      state.currentModule = action.payload;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setSelectedLeagueId: (state, action) => {
      state.selectedLeagueId = action.payload;
    },
    setAuthModalOpen: (state, action) => {
      state.authModalOpen = action.payload;
    },
    setAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
    showToast: (state, action) => {
      state.toast = {
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info'
      };
    },
    clearToast: (state) => {
      state.toast = null;
    }
  }
});

export const {
  setCurrentModule,
  setCurrentView,
  setSelectedLeagueId,
  setAuthModalOpen,
  setAuthMode,
  showToast,
  clearToast
} = uiSlice.actions;

export default uiSlice.reducer;
