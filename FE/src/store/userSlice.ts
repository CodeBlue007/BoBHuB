import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUserData = createAsyncThunk(
  'user/loginUserData',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios('/api/users', { withCredentials: true });
      const data = await res.data;
      return data;
    } catch (error) {
      return rejectWithValue('not login');
    }
  },
);
const initialState = {
  currentUser: {
    userId: 0,
    generation: 1,
    track: '',
    name: '',
    nickName: '',
    email: '',
    phone: '',
    profile: null,
    role: '',
    status: '',
    createdAt: '',
    updatedAt: null,
    deletedAt: null,
  },
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.currentUser = { ...initialState.currentUser };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserData.fulfilled, (state, action) => {
      state.isLogin = true;
      state.currentUser = { ...action.payload };
    });
    builder.addCase(loginUserData.rejected, (state, action) => {
      state.isLogin = false;
    });
  },
});

export default userSlice;
export const userAction = userSlice.actions;
