import { configureStore } from '@reduxjs/toolkit';
import addressBookReducer from './features/addressBookSlice';

const store = configureStore({
  reducer: {
    addressBook: addressBookReducer,
  },
});

export default store;
