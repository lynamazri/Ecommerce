import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  stores: [],
  status: "idle",
  error: null,
};

export const fetchStoresData = createAsyncThunk(
  "stores/fetchStoresData",
  async () => {
    try {
      const response = await axios.get("http://localhost:3001/store");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch stores data");
    }
  }
);

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoresData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoresData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stores = action.payload;
      })
      .addCase(fetchStoresData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default storesSlice.reducer;
