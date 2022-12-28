import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../api/API';
import type { Party } from '../pages/MainPage/Type';

const initialState: { myPartyList: Party[] } = {
  myPartyList: [],
};

export const getMyPartyList = createAsyncThunk('party/host', async (_, { rejectWithValue }) => {
  try {
    const res = await get('/api/parties/liked-party');
    if (!res) {
      throw new Error('에러!');
    }
    return res;
  } catch (err) {
    rejectWithValue(err);
  }
});

const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyPartyList.fulfilled, (state, action) => {
      state.myPartyList = [...action.payload];
    });
    builder.addCase(getMyPartyList.rejected, (state, action) => {
      state.myPartyList = [];
    });
  },
});

export default partySlice;
