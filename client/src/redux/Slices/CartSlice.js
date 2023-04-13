import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  quantity: 0,
  amount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const curItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (curItem >= 0) {
        state.cartItems[curItem].quantity += 1;
      } else {
        const product = { ...action.payload, quantity: 1 };
        state.cartItems.push(product);
      }
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
