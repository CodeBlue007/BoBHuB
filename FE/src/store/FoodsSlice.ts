import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    groupId: '', //
    shopId: '', //
    userId: '', // 참여한 유저들 목록이 필요할듯?
    groupLimit: 0, //
    timeLimit: 15, //
    createTime: 0, //
    likedNum: 0, //
    isCompleted: false, //
  },
];

export const groupSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    initialSet: (state, action) => (state = [action.payload]),
  },
});

export default groupSlice.reducer;
export const groupAction = groupSlice.actions;
