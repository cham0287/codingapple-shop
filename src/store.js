import { configureStore, createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: 'kim',
});

let cartData = createSlice({
  name: 'cartData',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
    addCount(state, action) {
      state[action.payload].count += 1;
    },
  },
});

export let { addCount, addItem } = cartData.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cartData: cartData.reducer,
  },
});
