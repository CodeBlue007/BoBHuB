import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from '../api/API';

export const loginUserData = createAsyncThunk('user/loginUserData', async () => {
  const data = await get('api/users');
  return data;
});
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
      state = state;
    });
  },
});

export default userSlice;
export const userAction = userSlice.actions;
