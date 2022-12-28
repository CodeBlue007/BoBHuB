import { configureStore } from '@reduxjs/toolkit';
import { chatSlice } from './chatSlice';
import userSlice from './userSlice';
import adminUsersSlice from './adminUsersSlice';

const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    chatReducer: chatSlice.reducer,
    adminUsersReducer: adminUsersSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
