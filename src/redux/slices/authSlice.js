import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('jwt_token') || null;
const savedUser = localStorage.getItem('auth_user')
  ? JSON.parse(localStorage.getItem('auth_user'))
  : null;

const initialState = {
  token,
  user: savedUser,
  isAuthenticated: !!token,
  role: savedUser?.role || 'user'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.role = user.role;
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = 'user';
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('auth_user');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
