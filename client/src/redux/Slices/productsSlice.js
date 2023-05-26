import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  filteredItems: [],
  status: "idle",
  error: null,
  sortingCriteria: "", // New field for sorting criteria
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3001/productss");
      return res.data;
    } catch (error) {
      return rejectWithValue("There was an error during data fetching");
    }
  }
);

//or use RTK Query

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsFetch: (state) => {
      state.status = "loading";
    },
    productsFetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
      state.filteredItems = action.payload; // Initialize filteredItems with all items
    },
    productsFetchError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    updateFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
      state.sortingCriteria = ""; // Clear the sorting criteria when filtered
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.error = null;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.items = [];
        state.filteredItems = [];
      })
      .addCase(setSortingCriteria, (state, action) => {
        state.sortingCriteria = action.payload;
      });
  },
});

export const { productsFetchSuccess, productsFetchError, updateFilteredItems } =
  productsSlice.actions;
export const setSortingCriteria = createAction("products/setSortingCriteria");

export default productsSlice.reducer;

// extraReducers: {
//   //decrepated, use builder callback later
//   [productsFetch.pending]: (state) => {
//     state.status = "loading";
//   },
//   [productsFetch.fulfilled]: (state, action) => {
//     state.status = "success";
//     state.items = action.payload;
//   },
//   [productsFetch.rejected]: (state, action) => {
//     state.status = "failure";
//     state.error = action.payload;
//   },
// },
