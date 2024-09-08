import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [
    { id: '1', name: 'Rohith', address: 'Nalgonda' },
    { id: '2', name: 'Yashwanth', address: 'Hyderabad' },
    { id: '3', name: 'Virat ', address: 'Delhi' },
    { id: '4', name: 'Rohit ', address: 'Mumbai' },
  ],
};

const addressBookSlice = createSlice({
  name: 'addressBook',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      const { id, name, address } = action.payload;
      const existingAddress = state.addresses.find((item) => item.id === id);
      if (existingAddress) {
        existingAddress.name = name;
        existingAddress.address = address;
      }
    },
    deleteAddress: (state, action) => {
      const id = action.payload;
      state.addresses = state.addresses.filter((item) => item.id !== id);
    },
  },
});

export const { addAddress, updateAddress, deleteAddress } = addressBookSlice.actions;
export default addressBookSlice.reducer;
