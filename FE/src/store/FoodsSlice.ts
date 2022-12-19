import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    groupId: '',
    shopId: '',
    userId: '',
    groupLimit: 0,
    timeLimit: 15,
    createTime: 0,
    likedNum: 0,
    isCompleted: false,
  },
];

createSlice({
  name: 'foods',
  initialState,
  reducers: {
    initialSet: (state, action) => (state = [action.payload]),
    // addPerson: (state, action) => state.find((group)=> {group.groupId === action.payload.groupId})?.likedNum += 1,
  },
});
