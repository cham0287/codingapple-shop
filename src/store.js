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
    removeItem(state, action) {
      state.splice([action.payload], 1);
    },
    addCount(state, action) {
      state[action.payload].count += 1;
    },
    minusCount(state, action) {
      if (state[action.payload].count > 0) {
        state[action.payload].count -= 1;
      }
    },
  },
});

export let { addCount, minusCount, addItem, removeItem } = cartData.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cartData: cartData.reducer,
  },
});
