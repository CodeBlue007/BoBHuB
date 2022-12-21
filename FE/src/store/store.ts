import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
