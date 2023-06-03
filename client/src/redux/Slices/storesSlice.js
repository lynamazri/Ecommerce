import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  stores: [],
  filteredStores: [],
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
  reducers: {
    updateFilteredStores: (state, action) => {
      state.filteredStores = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoresData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoresData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stores = action.payload;
        state.filteredStores = action.payload; // Initialize filteredStores with all stores
      })
      .addCase(fetchStoresData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateFilteredStores } = storesSlice.actions;

export default storesSlice.reducer;
