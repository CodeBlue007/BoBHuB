import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../api/API';
import type { Party } from '../pages/MainPage/Type';

const initialState: { myPartyList: Party[]; activePartyList: Party[] } = {
  myPartyList: [],
  activePartyList: [],
};

export const getMyPartyList = createAsyncThunk('party/host', async (_, { rejectWithValue }) => {
  try {
    const res = await get('/api/parties/liked-party');
    console.log(res);
    if (!res) {
      throw new Error('에러!');
    }
    return res;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getActivePartyList = createAsyncThunk(
  'party/active',
  async (_, { rejectWithValue }) => {
    try {
      const parties = await get('/api/parties');
      if (!parties) {
        throw new Error('에러!');
      }
      return parties;
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyPartyList.fulfilled, (state, action) => {
      const lists = [...action.payload];
      const newList = lists.map((list: Party) => {
        if (list.likedNum !== list.partyLimit) return list;
        list.isComplete = 1;
        return list;
      });
      console.log(newList);
      state.myPartyList = [...action.payload];
    });
    builder.addCase(getMyPartyList.rejected, (state, action) => {
      state.myPartyList = [];
    });
    builder.addCase(getActivePartyList.fulfilled, (state, action) => {
      state.activePartyList = [...action.payload];
    });
    builder.addCase(getActivePartyList.rejected, (state, action) => {
      state.activePartyList = [];
    });
  },
});

export default partySlice;
