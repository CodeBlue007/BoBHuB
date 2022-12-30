import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import adminUsersSlice from './adminUsersSlice';
import partySlice from './partySlice';

const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    adminUsersReducer: adminUsersSlice.reducer,
    partySliceReducer: partySlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
