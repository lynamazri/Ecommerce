import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./Slices/productsSlice";
import { apiSlice } from "./Slices/apiSlice";
import authReducer from "./Slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

import cartReducer from "./Slices/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
store.dispatch(productsFetch());
