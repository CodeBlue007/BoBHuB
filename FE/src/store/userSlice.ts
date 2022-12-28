import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { get } from '../api/API';

export const loginUserData = createAsyncThunk(
  'user/loginUserData',
  async (_, { rejectWithValue }) => {
    try {
      const res = await get('/api/users');
      if (!res) {
        throw new Error('유저 정보를 불러오는데 실패했습니다.');
      }
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const res = await get('/api/auth/logout');
    if (!res) {
      throw new Error('로그아웃에 실패 했습니다.');
    }
  } catch (error) {
    return rejectWithValue(error);
  }
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserData.fulfilled, (state, action) => {
      state.isLogin = true;
      state.currentUser = { ...action.payload };
    });
    builder.addCase(loginUserData.rejected, (state, action) => {
      state.isLogin = false;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.currentUser = { ...initialState.currentUser };
      state.isLogin = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state = state;
    });
  },
});

export default userSlice;
// export const userAction = userSlice.actions;
