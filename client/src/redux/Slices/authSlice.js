import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      state.token = accessToken;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logOut: (state, action) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("user");
      if (localStorage.getItem("mystore")) {
        localStorage.removeItem("mystore");
      }
    },
    updateUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    }
  },
});

export const { setCredentials, logOut, updateUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
