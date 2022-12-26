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
      console.log(error);
      return rejectWithValue('not login');
    }
  },
);

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const data = await axios.get('/api/auth/logout');
    console.log(data);
  } catch (error) {
    console.log(error);
    return rejectWithValue('fali!');
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
