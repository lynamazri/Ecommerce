import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./Slices/productsSlice";
import storesReducer from "./Slices/storesSlice";
import { apiSlice } from "./Slices/apiSlice";
import authReducer from "./Slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

import cartReducer from "./Slices/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    stores: storesReducer, // Add the stores reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

store.dispatch(productsFetch());
setupListeners(store.dispatch);
