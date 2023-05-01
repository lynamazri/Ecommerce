import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./Slices/productsSlice";
import helpReducer, { helpFetch } from "./Slices/helpSlice";
import cartReducer from "./Slices/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    help: helpReducer,
  },
});

store.dispatch(productsFetch());
store.dispatch(helpFetch());
