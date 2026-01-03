import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    const result = await authService?.login(credentials);
    if (result?.success) {
      return result?.data;
    }
    return rejectWithValue(result?.error);
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    const result = await authService?.register(userData);
    if (result?.success) {
      return result?.data;
    }
    return rejectWithValue(result?.error);
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService?.logout();
      return true;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('authToken'),
  role: localStorage.getItem('userRole'),
  isAuthenticated: authService?.isAuthenticated(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action?.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder?.addCase(loginUser?.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })?.addCase(loginUser?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action?.payload?.user;
        state.token = action?.payload?.token;
        state.role = action?.payload?.user?.role;
        state.error = null;
      })?.addCase(loginUser?.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action?.payload;
      })?.addCase(registerUser?.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })?.addCase(registerUser?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })?.addCase(registerUser?.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })?.addCase(logoutUser?.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { clearError, setUser } = authSlice?.actions;
export default authSlice?.reducer;
