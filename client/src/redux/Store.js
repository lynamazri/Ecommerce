import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./Slices/productsSlice";
import cartReducer from "./Slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

store.dispatch(productsFetch());
